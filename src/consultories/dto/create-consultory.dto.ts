import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength, Min } from 'class-validator';

export class CreateConsultoryDto {
  @ApiProperty({ example: 'Consultorio 1' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  Name!: string;

  @ApiPropertyOptional({ example: 'C1' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  ShortCode?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  SortOrder?: number;
}
