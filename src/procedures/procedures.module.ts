import { Module } from '@nestjs/common';
import { ProcedureCategoriesService } from './services/procedure-categories.service';
import { ProcedureTypesService } from './services/procedure-types.service';
import { ProcedureCategoriesController } from './controllers/procedure-categories.controller';
import { ProcedureTypesController } from './controllers/procedure-types.controller';

@Module({
  controllers: [
    ProcedureCategoriesController,
    ProcedureTypesController
  ],
  providers: [
    ProcedureCategoriesService,
    ProcedureTypesService
  ],
})
export class ProceduresModule {}