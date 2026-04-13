import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TreatmentFacilitiesService } from './treatment-facilities.service';

@ApiTags('Treatment facilities')
@Controller('treatment-facilities')
export class TreatmentFacilitiesController {
  constructor(private readonly service: TreatmentFacilitiesService) {}

  @Get()
  @ApiOperation({ summary: 'List active treatment facilities / supplies (clinical catalog)' })
  @ApiResponse({ status: 200, description: 'Ordered catalog for visit documentation.' })
  findAll() {
    return this.service.findAllActive();
  }
}
