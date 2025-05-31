import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust path if prisma.service is elsewhere
import { ProcedureCategory, Prisma } from '../../../generated/prisma';
import { CreateProcedureCategoryDto } from '../dto/category/create-procedure-category.dto';
import { UpdateProcedureCategoryDto } from '../dto/category/update-procedure-category.dto';

@Injectable()
export class ProcedureCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProcedureCategoryDto): Promise<ProcedureCategory> {
    try {
      return await this.prisma.procedureCategory.create({
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(`Category with name '${dto.CategoryName}' already exists.`);
      }
      throw new InternalServerErrorException('Could not create procedure category.');
    }
  }

  async findAll(): Promise<ProcedureCategory[]> {
    return this.prisma.procedureCategory.findMany({ include: { procedureTypes: true }}); // Optionally include types
  }

  async findOne(id: number): Promise<ProcedureCategory> {
    const category = await this.prisma.procedureCategory.findUnique({
      where: { CategoryID: id },
      include: { procedureTypes: true } // Optionally include types
    });
    if (!category) {
      throw new NotFoundException(`Procedure Category with ID ${id} not found.`);
    }
    return category;
  }

  async update(id: number, dto: UpdateProcedureCategoryDto): Promise<ProcedureCategory> {
    try {
      return await this.prisma.procedureCategory.update({
        where: { CategoryID: id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Procedure Category with ID ${id} not found.`);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(`Category with name '${dto.CategoryName}' already exists.`);
      }
      throw new InternalServerErrorException('Could not update procedure category.');
    }
  }

  async remove(id: number): Promise<ProcedureCategory> {
    try {
      return await this.prisma.procedureCategory.delete({
        where: { CategoryID: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Procedure Category with ID ${id} not found.`);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        // Foreign key constraint failed
        throw new ConflictException(`Cannot delete category with ID ${id} as it has associated procedure types.`);
      }
      throw new InternalServerErrorException('Could not delete procedure category.');
    }
  }
}