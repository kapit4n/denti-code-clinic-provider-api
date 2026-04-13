import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsultoryDto } from './dto/create-consultory.dto';
import { UpdateConsultoryDto } from './dto/update-consultory.dto';

@Injectable()
export class ConsultoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeInactive = false) {
    return this.prisma.consultory.findMany({
      where: includeInactive ? {} : { IsActive: true },
      orderBy: [{ SortOrder: 'asc' }, { ConsultoryID: 'asc' }],
    });
  }

  async findOne(id: number) {
    const row = await this.prisma.consultory.findUnique({ where: { ConsultoryID: id } });
    if (!row) throw new NotFoundException(`Consultory ${id} not found`);
    return row;
  }

  create(dto: CreateConsultoryDto) {
    return this.prisma.consultory.create({
      data: {
        Name: dto.Name,
        ShortCode: dto.ShortCode ?? null,
        SortOrder: dto.SortOrder ?? 0,
      },
    });
  }

  async update(id: number, dto: UpdateConsultoryDto) {
    await this.findOne(id);
    return this.prisma.consultory.update({
      where: { ConsultoryID: id },
      data: {
        ...(dto.Name !== undefined ? { Name: dto.Name } : {}),
        ...(dto.ShortCode !== undefined ? { ShortCode: dto.ShortCode } : {}),
        ...(dto.SortOrder !== undefined ? { SortOrder: dto.SortOrder } : {}),
        ...(dto.IsActive !== undefined ? { IsActive: dto.IsActive } : {}),
      },
    });
  }
}
