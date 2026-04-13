import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InventoryMovementType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryLineDto } from './dto/create-inventory-line.dto';
import { AdjustInventoryDto } from './dto/adjust-inventory.dto';
import { ApplyCodeDeltasDto } from './dto/apply-code-deltas.dto';

const lineInclude = {
  consultory: true,
  facility: true,
} satisfies Prisma.MaterialInventoryLineInclude;

const movementInclude = {
  consultory: true,
  facility: true,
} satisfies Prisma.InventoryMovementInclude;

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureConsultory(id: number) {
    const c = await this.prisma.consultory.findFirst({
      where: { ConsultoryID: id, IsActive: true },
    });
    if (!c) throw new NotFoundException(`Active consultory ${id} not found`);
    return c;
  }

  private async ensureFacility(id: number) {
    const f = await this.prisma.treatmentFacility.findFirst({
      where: { FacilityID: id, IsActive: true },
    });
    if (!f) throw new NotFoundException(`Active treatment facility (material) ${id} not found`);
    return f;
  }

  /**
   * Apply a signed quantity change to one material line inside a transaction.
   * Positive signedDelta = receive (stock up); negative = consume (stock down).
   */
  private async applySignedDeltaInTransaction(
    tx: Prisma.TransactionClient,
    consultoryId: number,
    facilityId: number,
    signedDelta: number,
    note?: string | null,
    negativeMovementType: InventoryMovementType = InventoryMovementType.CONSUME,
  ): Promise<void> {
    if (signedDelta === 0) return;

    let line = await tx.materialInventoryLine.findUnique({
      where: {
        ConsultoryID_FacilityID: { ConsultoryID: consultoryId, FacilityID: facilityId },
      },
    });

    if (!line) {
      if (signedDelta < 0) {
        throw new BadRequestException(
          `No inventory line for this consultory and material (facilityId=${facilityId}); register stock first`,
        );
      }
      line = await tx.materialInventoryLine.create({
        data: { ConsultoryID: consultoryId, FacilityID: facilityId, Quantity: 0 },
      });
    }

    const next = line.Quantity + signedDelta;
    if (next < 0) {
      throw new BadRequestException('Insufficient quantity for this operation');
    }

    const type =
      signedDelta > 0
        ? InventoryMovementType.RECEIVE
        : negativeMovementType === InventoryMovementType.REMOVE
          ? InventoryMovementType.REMOVE
          : InventoryMovementType.CONSUME;

    await tx.materialInventoryLine.update({
      where: { LineID: line.LineID },
      data: { Quantity: next },
    });

    await tx.inventoryMovement.create({
      data: {
        ConsultoryID: consultoryId,
        FacilityID: facilityId,
        QuantityChange: signedDelta,
        Type: type,
        Note: note?.trim() ? String(note).trim() : null,
      },
    });
  }

  listLines(consultoryId?: number) {
    return this.prisma.materialInventoryLine.findMany({
      where: consultoryId != null ? { ConsultoryID: consultoryId } : {},
      include: lineInclude,
      orderBy: [{ ConsultoryID: 'asc' }, { FacilityID: 'asc' }],
    });
  }

  listMovements(consultoryId?: number, take = 80) {
    return this.prisma.inventoryMovement.findMany({
      where: consultoryId != null ? { ConsultoryID: consultoryId } : {},
      include: movementInclude,
      orderBy: { createdAt: 'desc' },
      take: Math.min(200, Math.max(1, take)),
    });
  }

  async createLine(dto: CreateInventoryLineDto) {
    await this.ensureConsultory(dto.consultoryId);
    await this.ensureFacility(dto.facilityId);
    const init = Math.max(0, Math.floor(dto.initialQuantity ?? 0));

    const existing = await this.prisma.materialInventoryLine.findUnique({
      where: {
        ConsultoryID_FacilityID: {
          ConsultoryID: dto.consultoryId,
          FacilityID: dto.facilityId,
        },
      },
    });
    if (existing) {
      throw new ConflictException(
        'An inventory line already exists for this consultory and material; use adjust to change quantity',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const line = await tx.materialInventoryLine.create({
        data: {
          ConsultoryID: dto.consultoryId,
          FacilityID: dto.facilityId,
          Quantity: init,
        },
      });
      if (init > 0) {
        await tx.inventoryMovement.create({
          data: {
            ConsultoryID: dto.consultoryId,
            FacilityID: dto.facilityId,
            QuantityChange: init,
            Type: InventoryMovementType.RECEIVE,
          },
        });
      }
      return tx.materialInventoryLine.findUniqueOrThrow({
        where: { LineID: line.LineID },
        include: lineInclude,
      });
    });
  }

  async adjust(dto: AdjustInventoryDto) {
    await this.ensureConsultory(dto.consultoryId);
    await this.ensureFacility(dto.facilityId);
    const amount = Math.floor(dto.amount);
    if (amount < 1) throw new BadRequestException('amount must be at least 1');

    const signedDelta = dto.type === InventoryMovementType.RECEIVE ? amount : -amount;

    const negativeMovementType =
      dto.type === InventoryMovementType.REMOVE
        ? InventoryMovementType.REMOVE
        : InventoryMovementType.CONSUME;

    return this.prisma.$transaction(async (tx) => {
      await this.applySignedDeltaInTransaction(
        tx,
        dto.consultoryId,
        dto.facilityId,
        signedDelta,
        dto.note ?? null,
        negativeMovementType,
      );
      const line = await tx.materialInventoryLine.findUniqueOrThrow({
        where: {
          ConsultoryID_FacilityID: {
            ConsultoryID: dto.consultoryId,
            FacilityID: dto.facilityId,
          },
        },
        include: lineInclude,
      });
      return line;
    });
  }

  /**
   * Batch stock change by catalog codes (used by appointments service for visit ↔ inventory sync).
   * Merges duplicate codes; each delta is applied in one DB transaction.
   */
  async applyCodeDeltas(dto: ApplyCodeDeltasDto) {
    await this.ensureConsultory(dto.consultoryId);

    const merged = new Map<string, number>();
    for (const row of dto.deltas ?? []) {
      const code = row.facilityCode?.trim();
      if (!code) continue;
      const d = Math.trunc(row.delta);
      if (d === 0) continue;
      merged.set(code, (merged.get(code) ?? 0) + d);
    }

    const entries = [...merged.entries()].filter(([, d]) => d !== 0);
    if (entries.length === 0) {
      return { ok: true, applied: 0 };
    }

    await this.prisma.$transaction(async (tx) => {
      for (const [facilityCode, signedDelta] of entries) {
        const facility = await tx.treatmentFacility.findFirst({
          where: { FacilityCode: facilityCode, IsActive: true },
        });
        if (!facility) {
          throw new BadRequestException(`Unknown or inactive treatment facility code: ${facilityCode}`);
        }
        await this.applySignedDeltaInTransaction(
          tx,
          dto.consultoryId,
          facility.FacilityID,
          signedDelta,
          dto.note ?? null,
        );
      }
    });

    return { ok: true, applied: entries.length };
  }

  async removeLine(lineId: number) {
    const line = await this.prisma.materialInventoryLine.findUnique({
      where: { LineID: lineId },
      include: { consultory: true, facility: true },
    });
    if (!line) throw new NotFoundException(`Inventory line ${lineId} not found`);
    if (line.Quantity !== 0) {
      throw new BadRequestException('Set quantity to zero (remove/consume stock) before deleting the line');
    }
    await this.prisma.materialInventoryLine.delete({ where: { LineID: lineId } });
    return { ok: true, lineId };
  }
}
