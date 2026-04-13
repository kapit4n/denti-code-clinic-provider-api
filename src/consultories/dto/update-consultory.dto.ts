import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Length, MaxLength, Min } from 'class-validator';

export class UpdateConsultoryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 120)
  Name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  ShortCode?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  SortOrder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  IsActive?: boolean;
}
