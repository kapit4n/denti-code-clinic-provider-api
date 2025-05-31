import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ProcedureCategoriesService } from '../services/procedure-categories.service';
import { CreateProcedureCategoryDto } from '../dto/category/create-procedure-category.dto';
import { UpdateProcedureCategoryDto } from '../dto/category/update-procedure-category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Procedures - Categories')
@Controller('procedures/categories') // Base path for categories
export class ProcedureCategoriesController {
  constructor(private readonly categoriesService: ProcedureCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new procedure category' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Category created.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateProcedureCategoryDto) {
    return this.categoriesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all procedure categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a procedure category by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a procedure category' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateProcedureCategoryDto) {
    return this.categoriesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a procedure category' })
  @ApiParam({ name: 'id', type: Number })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}