import { PartialType } from '@nestjs/swagger';
import { CreateProcedureTypeDto } from './create-procedure-type.dto';

export class UpdateProcedureTypeDto extends PartialType(CreateProcedureTypeDto) {}
