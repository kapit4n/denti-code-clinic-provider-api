import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DoctorsModule } from './doctors/doctors.module';
import { SpecializationsModule } from './specializations/specializations.module';
import { ProceduresModule } from './procedures/procedures.module';
import { TreatmentFacilitiesModule } from './treatment-facilities/treatment-facilities.module';
import { ConsultoriesModule } from './consultories/consultories.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    PrismaModule,
    DoctorsModule,
    SpecializationsModule,
    ProceduresModule,
    TreatmentFacilitiesModule,
    ConsultoriesModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
