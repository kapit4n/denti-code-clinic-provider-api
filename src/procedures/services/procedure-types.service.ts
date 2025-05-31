import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust path
import { ProcedureType, Prisma } from '../../../generated/prisma';
import { CreateProcedureTypeDto } from '../dto/type/create-procedure-type.dto';
import { UpdateProcedureTypeDto } from '../dto/type/update-procedure-type.dto';

@Injectable()
export class ProcedureTypesService {
  constructor(private prisma: PrismaService) {}

  private async validateCategoryExists(categoryId: number): Promise<void> {
    const category = await this.prisma.procedureCategory.findUnique({
      where: { CategoryID: categoryId },
    });
    if (!category) {
      throw new BadRequestException(`Procedure Category with ID ${categoryId} does not exist.`);
    }
  }

  async create(dto: CreateProcedureTypeDto): Promise<ProcedureType> {
    await this.validateCategoryExists(dto.CategoryID);
    try {
      return await this.prisma.procedureType.create({
        data: dto,
        include: { category: true }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(`Procedure Type with name '${dto.ProcedureName}' already exists.`);
      }
      // P2003 is for foreign key constraint failure, but we validateCategoryExists first.
      // However, it's good to keep as a fallback or for other constraints.
      throw new InternalServerErrorException('Could not create procedure type.');
    }
  }

  async findAll(categoryId?: number): Promise<ProcedureType[]> {
    return this.prisma.procedureType.findMany({
      where: categoryId ? { CategoryID: categoryId } : {},
      include: { category: true }
    });
  }

  async findOne(id: number): Promise<ProcedureType> {
    const type = await this.prisma.procedureType.findUnique({
      where: { ProcedureTypeID: id },
      include: { category: true }
    });
    if (!type) {
      throw new NotFoundException(`Procedure Type with ID ${id} not found.`);
    }
    return type;
  }

  async update(id: number, dto: UpdateProcedureTypeDto): Promise<ProcedureType> {
    if (dto.CategoryID) {
      await this.validateCategoryExists(dto.CategoryID);
    }
    try {
      return await this.prisma.procedureType.update({
        where: { ProcedureTypeID: id },
        data: dto,
        include: { category: true }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Procedure Type with ID ${id} not found.`);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(`Procedure Type with name '${dto.ProcedureName}' already exists.`);
      }
      throw new InternalServerErrorException('Could not update procedure type.');
    }
  }

  async remove(id: number): Promise<ProcedureType> {
    try {
      return await this.prisma.procedureType.delete({
        where: { ProcedureTypeID: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Procedure Type with ID ${id} not found.`);
      }
      throw new InternalServerErrorException('Could not delete procedure type.');
    }
  }
}