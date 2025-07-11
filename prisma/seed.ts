// prisma/seed.ts (for clinic-provider-service)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding for Clinic & Provider Service...');

  // --- 1. Create Specializations ---
  const specGeneral = await prisma.specialization.upsert({
    where: { SpecializationName: 'General Dentistry' },
    update: {},
    create: {
      SpecializationName: 'General Dentistry',
      Description: 'Provides primary dental care, including diagnostics, preventative care, and basic restorative procedures.',
    },
  });

  const specOrtho = await prisma.specialization.upsert({
    where: { SpecializationName: 'Orthodontics' },
    update: {},
    create: {
      SpecializationName: 'Orthodontics',
      Description: 'Focuses on correcting misaligned teeth and jaws.',
    },
  });

  const specEndo = await prisma.specialization.upsert({
    where: { SpecializationName: 'Endodontics' },
    update: {},
    create: {
      SpecializationName: 'Endodontics',
      Description: 'Specializes in treating the inside of the tooth (the pulp), primarily through root canal therapy.',
    },
  });

  const specPerio = await prisma.specialization.upsert({
    where: { SpecializationName: 'Periodontics' },
    update: {},
    create: {
      SpecializationName: 'Periodontics',
      Description: 'Focuses on the prevention, diagnosis, and treatment of gum disease.',
    },
  });

  console.log('Created Specializations...');

  // --- 2. Create Procedure Categories ---
  const catDiagnostic = await prisma.procedureCategory.upsert({
    where: { CategoryName: 'Diagnostic' },
    update: {},
    create: { CategoryName: 'Diagnostic', Description: 'Procedures to diagnose dental conditions.' },
  });

  const catPreventative = await prisma.procedureCategory.upsert({
    where: { CategoryName: 'Preventative' },
    update: {},
    create: { CategoryName: 'Preventative', Description: 'Procedures to prevent dental diseases.' },
  });

  const catRestorative = await prisma.procedureCategory.upsert({
    where: { CategoryName: 'Restorative' },
    update: {},
    create: { CategoryName: 'Restorative', Description: 'Procedures to restore tooth function and appearance.' },
  });

  const catEndodontic = await prisma.procedureCategory.upsert({
    where: { CategoryName: 'Endodontic' },
    update: {},
    create: { CategoryName: 'Endodontic', Description: 'Procedures related to root canal therapy.' },
  });

  console.log('Created Procedure Categories...');

  // --- 3. Create Procedure Types ---
  // Diagnostic Procedures
  await prisma.procedureType.upsert({ where: { ProcedureName: 'Comprehensive Oral Evaluation' }, update: {}, create: { ProcedureName: 'Comprehensive Oral Evaluation', CategoryID: catDiagnostic.CategoryID, DefaultDurationMinutes: 30, StandardPrice: 100 } });
  await prisma.procedureType.upsert({ where: { ProcedureName: 'Bitewing Radiographs - Two Films' }, update: {}, create: { ProcedureName: 'Bitewing Radiographs - Two Films', CategoryID: catDiagnostic.CategoryID, DefaultDurationMinutes: 15, StandardPrice: 50, RequiresToothSpecification: true } });

  // Preventative Procedures
  await prisma.procedureType.upsert({ where: { ProcedureName: 'Prophylaxis - Adult' }, update: {}, create: { ProcedureName: 'Prophylaxis - Adult', CategoryID: catPreventative.CategoryID, DefaultDurationMinutes: 45, StandardPrice: 120 } });
  await prisma.procedureType.upsert({ where: { ProcedureName: 'Fluoride Treatment' }, update: {}, create: { ProcedureName: 'Fluoride Treatment', CategoryID: catPreventative.CategoryID, DefaultDurationMinutes: 10, StandardPrice: 40 } });

  // Restorative Procedures
  await prisma.procedureType.upsert({ where: { ProcedureName: 'Composite Filling - 1 Surface' }, update: {}, create: { ProcedureName: 'Composite Filling - 1 Surface', CategoryID: catRestorative.CategoryID, DefaultDurationMinutes: 60, StandardPrice: 250, RequiresToothSpecification: true } });
  await prisma.procedureType.upsert({ where: { ProcedureName: 'Full Porcelain Crown' }, update: {}, create: { ProcedureName: 'Full Porcelain Crown', CategoryID: catRestorative.CategoryID, DefaultDurationMinutes: 90, StandardPrice: 1200, RequiresToothSpecification: true } });

  // Endodontic Procedures
  await prisma.procedureType.upsert({ where: { ProcedureName: 'Root Canal Therapy - Molar' }, update: {}, create: { ProcedureName: 'Root Canal Therapy - Molar', CategoryID: catEndodontic.CategoryID, DefaultDurationMinutes: 120, StandardPrice: 1500, RequiresToothSpecification: true } });

  console.log('Created Procedure Types...');

  // --- 4. Create Doctors ---
  // These first two doctors match the users created in the auth-service seed script.
  await prisma.doctor.upsert({
    where: { Email: 'susan.storm@denti-code.com' },
    update: {},
    create: {
      FirstName: 'Susan',
      LastName: 'Storm',
      Email: 'susan.storm@denti-code.com',
      ContactPhone: '+15550100',
      LicenseNumber: 'DDS-SS111',
      OfficeRoomNumber: '101',
      SpecializationID: specEndo.SpecializationID,
    },
  });

  await prisma.doctor.upsert({
    where: { Email: 'peter.parker@denti-code.com' },
    update: {},
    create: {
      FirstName: 'Peter',
      LastName: 'Parker',
      Email: 'peter.parker@denti-code.com',
      ContactPhone: '+15550101',
      LicenseNumber: 'DMD-PP222',
      OfficeRoomNumber: '102',
      SpecializationID: specGeneral.SpecializationID,
    },
  });

  // Add 3 more doctors as requested
  await prisma.doctor.upsert({
    where: { Email: 'bruce.banner@denti-code.com' },
    update: {},
    create: {
      FirstName: 'Bruce',
      LastName: 'Banner',
      Email: 'bruce.banner@denti-code.com',
      ContactPhone: '+15550102',
      LicenseNumber: 'DDS-BB333',
      OfficeRoomNumber: '201',
      SpecializationID: specOrtho.SpecializationID,
    },
  });

  await prisma.doctor.upsert({
    where: { Email: 'tony.stark@denti-code.com' },
    update: {},
    create: {
      FirstName: 'Tony',
      LastName: 'Stark',
      Email: 'tony.stark@denti-code.com',
      ContactPhone: '+15550103',
      LicenseNumber: 'DMD-TS444',
      OfficeRoomNumber: '202',
      SpecializationID: specPerio.SpecializationID,
    },
  });

  await prisma.doctor.upsert({
    where: { Email: 'natasha.romanoff@denti-code.com' },
    update: {},
    create: {
      FirstName: 'Natasha',
      LastName: 'Romanoff',
      Email: 'natasha.romanoff@denti-code.com',
      ContactPhone: '+15550104',
      LicenseNumber: 'DDS-NR555',
      OfficeRoomNumber: '103',
      SpecializationID: specGeneral.SpecializationID,
    },
  });

  console.log('Created Doctors...');
  console.log('Seeding for Clinic & Provider Service finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
