import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSpecializationDto {
  @ApiProperty({
    example: 'Orthodontics',
    description: 'Name of the dental specialization (must be unique)',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  SpecializationName: string;

  @ApiPropertyOptional({
    example: 'Focuses on the diagnosis, prevention, and correction of malpositioned teeth and jaws.',
    description: 'Optional description of the specialization',
  })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  Description?: string;
}
