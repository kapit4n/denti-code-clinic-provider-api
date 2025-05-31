import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProcedureCategoryDto {
  @ApiProperty({ example: 'Restorative', description: 'Name of the procedure category' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  CategoryName: string;

  @ApiPropertyOptional({ example: 'Procedures that restore tooth structure or function.', description: 'Optional description' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  Description?: string;
}