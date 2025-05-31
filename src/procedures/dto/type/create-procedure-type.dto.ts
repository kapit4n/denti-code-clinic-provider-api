import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber, IsBoolean, Min, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProcedureTypeDto {
  @ApiProperty({ example: 'Composite Filling - 1 Surface', description: 'Name of the procedure type' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  ProcedureName: string;

  @ApiPropertyOptional({ example: 'One surface composite resin filling.', description: 'Optional description' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  Description?: string;

  @ApiPropertyOptional({ example: 60, description: 'Default duration in minutes' })
  @IsOptional()
  @IsInt()
  @Min(0)
  DefaultDurationMinutes?: number;

  @ApiPropertyOptional({ example: 150.00, description: 'Standard price for the procedure' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  StandardPrice?: number;

  @ApiPropertyOptional({ example: true, description: 'Does this procedure require tooth specification?' })
  @IsOptional()
  @IsBoolean()
  RequiresToothSpecification?: boolean = false;

  @ApiPropertyOptional({ example: true, description: 'Is this procedure type currently active?' })
  @IsOptional()
  @IsBoolean()
  IsActive?: boolean = true;

  @ApiProperty({ example: 1, description: 'ID of the parent procedure category' })
  @IsInt()
  @IsNotEmpty()
  CategoryID: number;
}