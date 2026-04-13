import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ConsultoriesService } from './consultories.service';
import { CreateConsultoryDto } from './dto/create-consultory.dto';
import { UpdateConsultoryDto } from './dto/update-consultory.dto';

@ApiTags('Consultories')
@Controller('consultories')
export class ConsultoriesController {
  constructor(private readonly service: ConsultoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List consultories / operatories (inventory locations)' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  findAll(@Query('includeInactive') includeInactive?: string) {
    return this.service.findAll(includeInactive === 'true' || includeInactive === '1');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get consultory by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create consultory' })
  create(@Body() dto: CreateConsultoryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update consultory' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateConsultoryDto) {
    return this.service.update(id, dto);
  }
}
