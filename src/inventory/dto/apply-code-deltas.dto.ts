import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

export class CodeDeltaDto {
  @ApiProperty({ example: 'nitrile_gloves' })
  @IsString()
  @MaxLength(80)
  facilityCode!: string;

  /** Positive = return stock to consultory (RECEIVE); negative = consume (remove from stock). */
  @ApiProperty({ example: -2, description: 'Positive adds stock; negative consumes abs(delta).' })
  @IsInt()
  delta!: number;
}

export class ApplyCodeDeltasDto {
  @ApiProperty()
  @IsInt()
  consultoryId!: number;

  @ApiProperty({ type: [CodeDeltaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeDeltaDto)
  deltas!: CodeDeltaDto[];

  @ApiPropertyOptional({ description: 'Stored on inventory movements (e.g. visit sync ref)' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
