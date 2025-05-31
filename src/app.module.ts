import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DoctorsModule } from './doctors/doctors.module';
import { SpecializationsModule } from './specializations/specializations.module';
import { ProceduresModule } from './procedures/procedures.module';

@Module({
  imports: [
    PrismaModule,
    DoctorsModule,
    SpecializationsModule,
    ProceduresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
