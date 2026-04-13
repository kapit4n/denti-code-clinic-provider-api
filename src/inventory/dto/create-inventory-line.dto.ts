import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class CreateInventoryLineDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  consultoryId!: number;

  @ApiProperty({ description: 'TreatmentFacility.FacilityID (catalog material)' })
  @IsInt()
  @Min(1)
  facilityId!: number;

  @ApiPropertyOptional({ description: 'Initial on-hand quantity (default 0)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  initialQuantity?: number;
}
