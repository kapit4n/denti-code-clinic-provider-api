import {
  Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Doctor created successfully.'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Doctor already exists (unique constraint failed).' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of doctors.'})
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a doctor by ID' })
  @ApiParam({ name: 'id', description: 'Doctor ID', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Doctor details.'})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Doctor not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a doctor by ID' })
  @ApiParam({ name: 'id', description: 'Doctor ID', type: Number })
  @ApiBody({ type: UpdateDoctorDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Doctor updated successfully.'})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Doctor not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a doctor by ID' })
  @ApiParam({ name: 'id', description: 'Doctor ID', type: Number })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Doctor deleted successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Doctor not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.remove(id);
  }
}