import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Specializations')
@Controller('specializations')
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new specialization' })
  @ApiBody({ type: CreateSpecializationDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Specialization created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Specialization name already exists.',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationsService.create(createSpecializationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all specializations' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all specializations.',
  })
  findAll() {
    return this.specializationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specialization by ID' })
  @ApiParam({ name: 'id', description: 'Specialization ID', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Specialization details.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Specialization not found.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.specializationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specialization by ID' })
  @ApiParam({ name: 'id', description: 'Specialization ID', type: Number })
  @ApiBody({ type: UpdateSpecializationDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Specialization updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Specialization not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Specialization name already exists (for another record).',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecializationDto: UpdateSpecializationDto,
  ) {
    return this.specializationsService.update(id, updateSpecializationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specialization by ID' })
  @ApiParam({ name: 'id', description: 'Specialization ID', type: Number })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Specialization deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Specialization not found.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Cannot delete specialization due to existing references.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.specializationsService.remove(id);
  }
}
