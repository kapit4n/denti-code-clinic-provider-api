import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateInventoryLineDto } from './dto/create-inventory-line.dto';
import { AdjustInventoryDto } from './dto/adjust-inventory.dto';
import { ApplyCodeDeltasDto } from './dto/apply-code-deltas.dto';

@ApiTags('Material inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get('lines')
  @ApiOperation({ summary: 'List stock lines (consultory × treatment material) with optional filter' })
  @ApiQuery({ name: 'consultoryId', required: false, type: Number })
  listLines(@Query('consultoryId') consultoryId?: string) {
    const id =
      consultoryId !== undefined && consultoryId !== '' && !Number.isNaN(Number(consultoryId))
        ? parseInt(consultoryId, 10)
        : undefined;
    return this.service.listLines(id);
  }

  @Get('movements')
  @ApiOperation({ summary: 'Recent stock movements (audit)' })
  @ApiQuery({ name: 'consultoryId', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  listMovements(@Query('consultoryId') consultoryId?: string, @Query('take') take?: string) {
    const cid =
      consultoryId !== undefined && consultoryId !== '' && !Number.isNaN(Number(consultoryId))
        ? parseInt(consultoryId, 10)
        : undefined;
    const t = take !== undefined && take !== '' ? parseInt(take, 10) : 80;
    return this.service.listMovements(cid, Number.isFinite(t) ? t : 80);
  }

  @Post('lines')
  @ApiOperation({ summary: 'Register a catalog material at a consultory (optional initial quantity)' })
  createLine(@Body() dto: CreateInventoryLineDto) {
    return this.service.createLine(dto);
  }

  @Post('adjust')
  @ApiOperation({
    summary: 'Receive stock (RECEIVE), waste/adjust out (REMOVE), or clinical consume (CONSUME)',
  })
  adjust(@Body() dto: AdjustInventoryDto) {
    return this.service.adjust(dto);
  }

  @Post('apply-code-deltas')
  @ApiOperation({
    summary:
      'Apply net stock changes by treatment-facility codes (visit sync: positive delta = return to stock, negative = consume)',
  })
  applyCodeDeltas(@Body() dto: ApplyCodeDeltasDto) {
    return this.service.applyCodeDeltas(dto);
  }

  @Delete('lines/:lineId')
  @ApiOperation({ summary: 'Remove an inventory line when quantity is zero' })
  removeLine(@Param('lineId', ParseIntPipe) lineId: number) {
    return this.service.removeLine(lineId);
  }
}
