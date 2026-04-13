import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InventoryMovementType } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class AdjustInventoryDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  consultoryId!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  facilityId!: number;

  @ApiProperty({ minimum: 1, description: 'Units to receive, remove, or consume' })
  @IsInt()
  @Min(1)
  amount!: number;

  @ApiProperty({ enum: InventoryMovementType })
  @IsEnum(InventoryMovementType)
  type!: InventoryMovementType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
