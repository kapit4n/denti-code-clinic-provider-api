import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsInt, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // For Swagger docs

export class CreateDoctorDto {
  @ApiProperty({ example: 'John', description: 'Doctor\'s first name' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  FirstName: string;

  @ApiProperty({ example: 'Doe', description: 'Doctor\'s last name' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  LastName: string;

  @ApiProperty({ example: 'LIC12345', description: 'Doctor\'s license number (unique)' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  LicenseNumber: string;

  @ApiProperty({ example: '+15551234567', description: 'Doctor\'s contact phone (unique)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/, { message: 'ContactPhone must be a valid E.164 number' }) // Example regex
  ContactPhone: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Doctor\'s email (unique)' })
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @ApiPropertyOptional({ example: 'Room 101', description: 'Doctor\'s office room number' })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  OfficeRoomNumber?: string;

  @ApiPropertyOptional({ example: true, description: 'Is the doctor currently active?' })
  @IsOptional()
  @IsBoolean()
  IsActive?: boolean = true;

  @ApiPropertyOptional({ example: 1, description: 'ID of the specialization' })
  @IsOptional()
  @IsInt()
  SpecializationID?: number;
}