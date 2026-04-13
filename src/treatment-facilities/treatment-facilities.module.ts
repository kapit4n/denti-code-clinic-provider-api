import { Module } from '@nestjs/common';
import { TreatmentFacilitiesController } from './treatment-facilities.controller';
import { TreatmentFacilitiesService } from './treatment-facilities.service';

@Module({
  controllers: [TreatmentFacilitiesController],
  providers: [TreatmentFacilitiesService],
})
export class TreatmentFacilitiesModule {}
