import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { Specialization, Prisma } from '../../generated/prisma';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Injectable()
export class SpecializationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSpecializationDto): Promise<Specialization> {
    try {
      return await this.prisma.specialization.create({
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(
          `Specialization with name '${dto.SpecializationName}' already exists.`,
        );
      }
      throw new InternalServerErrorException('Could not create specialization.');
    }
  }

  async findAll(): Promise<Specialization[]> {
    return this.prisma.specialization.findMany();
  }

  async findOne(id: number): Promise<Specialization> {
    const specialization = await this.prisma.specialization.findUnique({
      where: { SpecializationID: id },
    });

    if (!specialization) {
      throw new NotFoundException(`Specialization with ID ${id} not found.`);
    }
    return specialization;
  }

  async update(
    id: number,
    dto: UpdateSpecializationDto,
  ): Promise<Specialization> {
    await this.findOne(id);

    try {
      return await this.prisma.specialization.update({
        where: { SpecializationID: id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(
          `Specialization with name '${dto.SpecializationName}' already exists.`,
        );
      }
      throw new InternalServerErrorException('Could not update specialization.');
    }
  }

  async remove(id: number): Promise<Specialization> {
    await this.findOne(id);

    try {
      return await this.prisma.specialization.delete({
        where: { SpecializationID: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new ConflictException(
          `Cannot delete specialization with ID ${id} as it is referenced by other records (e.g., Doctors).`,
        );
      }
      throw new InternalServerErrorException('Could not delete specialization.');
    }
  }
}