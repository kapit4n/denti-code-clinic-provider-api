import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ProcedureTypesService } from '../services/procedure-types.service';
import { CreateProcedureTypeDto } from '../dto/type/create-procedure-type.dto';
import { UpdateProcedureTypeDto } from '../dto/type/update-procedure-type.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Procedures - Types')
@Controller('procedures/types') // Base path for types
export class ProcedureTypesController {
  constructor(private readonly typesService: ProcedureTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new procedure type' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Type created.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateProcedureTypeDto) {
    return this.typesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all procedure types, optionally filtered by category ID' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number, description: 'Filter types by category ID' })
  findAll(@Query('categoryId', new ParseIntPipe({ optional: true })) categoryId?: number) {
    return this.typesService.findAll(categoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a procedure type by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.typesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a procedure type' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateProcedureTypeDto) {
    return this.typesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a procedure type' })
  @ApiParam({ name: 'id', type: Number })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.typesService.remove(id);
  }
}