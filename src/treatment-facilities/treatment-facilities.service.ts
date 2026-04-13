import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TreatmentFacilitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findAllActive() {
    return this.prisma.treatmentFacility.findMany({
      where: { IsActive: true },
      orderBy: [{ CategoryKey: 'asc' }, { SortOrder: 'asc' }, { FacilityCode: 'asc' }],
    });
  }
}
