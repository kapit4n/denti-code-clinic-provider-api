import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Doctor, Prisma } from '../../generated/prisma';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      return await this.prisma.doctor.create({
        data: createDoctorDto,
        include: { specialization: true }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = (error.meta?.target as string[]) || [];
          throw new ConflictException(`Doctor with this ${target.join(', ')} already exists.`);
        }
      }
      throw new InternalServerErrorException('Could not create doctor.');
    }
  }

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany({ include: { specialization: true } });
  }

  async findOne(id: number): Promise<Doctor | null> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { DoctorID: id },
      include: { specialization: true }
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found.`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    try {
      return await this.prisma.doctor.update({
        where: { DoctorID: id },
        data: updateDoctorDto,
        include: { specialization: true }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Doctor with ID ${id} not found.`);
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const target = (error.meta?.target as string[]) || [];
        throw new ConflictException(`Doctor with this ${target.join(', ')} already exists.`);
      }
      throw new InternalServerErrorException('Could not update doctor.');
    }
  }

  async remove(id: number): Promise<Doctor> {
     try {
      return await this.prisma.doctor.delete({
        where: { DoctorID: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Doctor with ID ${id} not found to delete.`);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new ConflictException(`Cannot delete doctor with ID ${id} as it's referenced by other records.`);
      }
      throw new InternalServerErrorException('Could not delete doctor.');
    }
  }
}