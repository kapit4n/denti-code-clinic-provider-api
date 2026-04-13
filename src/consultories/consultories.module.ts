import { Module } from '@nestjs/common';
import { ConsultoriesController } from './consultories.controller';
import { ConsultoriesService } from './consultories.service';

@Module({
  controllers: [ConsultoriesController],
  providers: [ConsultoriesService],
})
export class ConsultoriesModule {}
