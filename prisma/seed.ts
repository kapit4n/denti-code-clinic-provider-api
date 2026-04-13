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

  // --- Consultories (inventory locations) ---
  const cons1 = await prisma.consultory.upsert({
    where: { ShortCode: 'C1' },
    update: { Name: 'Consultorio 1', SortOrder: 10, IsActive: true },
    create: { Name: 'Consultorio 1', ShortCode: 'C1', SortOrder: 10 },
  });
  const cons2 = await prisma.consultory.upsert({
    where: { ShortCode: 'C2' },
    update: { Name: 'Consultorio 2', SortOrder: 20, IsActive: true },
    create: { Name: 'Consultorio 2', ShortCode: 'C2', SortOrder: 20 },
  });
  await prisma.consultory.upsert({
    where: { ShortCode: 'LAB' },
    update: { Name: 'Laboratorio', SortOrder: 30, IsActive: true },
    create: { Name: 'Laboratorio', ShortCode: 'LAB', SortOrder: 30 },
  });
  console.log('Upserted consultories (inventory locations).');

  // --- Treatment facilities / supplies (catalog for appointments documentation) ---
  await prisma.inventoryMovement.deleteMany({});
  await prisma.materialInventoryLine.deleteMany({});
  await prisma.treatmentFacility.deleteMany({});
  const treatmentFacilityRows = [
    { FacilityCode: 'articaine_4pct', CategoryKey: 'anesthesia', DisplayName: 'Articaine 4% with epinephrine (cartridge)', SortOrder: 10 },
    { FacilityCode: 'lidocaine_2pct', CategoryKey: 'anesthesia', DisplayName: 'Lidocaine 2% with epinephrine (cartridge)', SortOrder: 20 },
    { FacilityCode: 'mepivacaine_3pct', CategoryKey: 'anesthesia', DisplayName: 'Mepivacaine 3% plain (cartridge)', SortOrder: 30 },
    { FacilityCode: 'bupivacaine_05', CategoryKey: 'anesthesia', DisplayName: 'Bupivacaine 0.5% with epinephrine (block)', SortOrder: 40 },
    { FacilityCode: 'topical_benzocaine', CategoryKey: 'anesthesia', DisplayName: 'Topical anesthetic gel (benzocaine)', SortOrder: 50 },
    { FacilityCode: 'nitrous_oxide_delivery', CategoryKey: 'anesthesia', DisplayName: 'Nitrous oxide / oxygen delivery circuit', SortOrder: 60 },
    { FacilityCode: 'latex_gloves', CategoryKey: 'ppe', DisplayName: 'Latex examination gloves', SortOrder: 10 },
    { FacilityCode: 'nitrile_gloves', CategoryKey: 'ppe', DisplayName: 'Nitrile examination gloves', SortOrder: 20 },
    { FacilityCode: 'surgical_mask', CategoryKey: 'ppe', DisplayName: 'Surgical mask', SortOrder: 30 },
    { FacilityCode: 'protective_eyewear', CategoryKey: 'ppe', DisplayName: 'Protective eyewear (loupes / glasses)', SortOrder: 40 },
    { FacilityCode: 'face_shield', CategoryKey: 'ppe', DisplayName: 'Face shield', SortOrder: 50 },
    { FacilityCode: 'patient_bib', CategoryKey: 'ppe', DisplayName: 'Patient bib & clip', SortOrder: 60 },
    { FacilityCode: 'high_volume_evacuation', CategoryKey: 'isolation', DisplayName: 'High-volume evacuation (HVE)', SortOrder: 10 },
    { FacilityCode: 'saliva_ejector', CategoryKey: 'isolation', DisplayName: 'Saliva ejector', SortOrder: 20 },
    { FacilityCode: 'suction_tips', CategoryKey: 'isolation', DisplayName: 'Disposable suction tips', SortOrder: 30 },
    { FacilityCode: 'rubber_dam_kit', CategoryKey: 'isolation', DisplayName: 'Rubber dam, frame & clamps', SortOrder: 40 },
    { FacilityCode: 'cotton_rolls', CategoryKey: 'isolation', DisplayName: 'Cotton rolls', SortOrder: 50 },
    { FacilityCode: 'gauze_2x2', CategoryKey: 'isolation', DisplayName: 'Gauze 2×2', SortOrder: 60 },
    { FacilityCode: 'handpiece_highspeed', CategoryKey: 'power_equipment', DisplayName: 'High-speed handpiece', SortOrder: 10 },
    { FacilityCode: 'handpiece_slowspeed', CategoryKey: 'power_equipment', DisplayName: 'Low-speed handpiece / contra-angle', SortOrder: 20 },
    { FacilityCode: 'ultrasonic_scaler', CategoryKey: 'power_equipment', DisplayName: 'Ultrasonic scaler / piezo insert', SortOrder: 30 },
    { FacilityCode: 'prophy_angle', CategoryKey: 'power_equipment', DisplayName: 'Disposable prophy angle & paste', SortOrder: 40 },
    { FacilityCode: 'air_water_syringe', CategoryKey: 'power_equipment', DisplayName: 'Air–water syringe tips', SortOrder: 50 },
    { FacilityCode: 'curing_light_led', CategoryKey: 'power_equipment', DisplayName: 'LED curing light', SortOrder: 60 },
    { FacilityCode: 'mouth_mirror', CategoryKey: 'hand_instruments', DisplayName: 'Mouth mirror & handle', SortOrder: 10 },
    { FacilityCode: 'explorer_probe', CategoryKey: 'hand_instruments', DisplayName: 'Explorer / probe', SortOrder: 20 },
    { FacilityCode: 'periodontal_probe', CategoryKey: 'hand_instruments', DisplayName: 'Periodontal probe (Williams / UNC)', SortOrder: 30 },
    { FacilityCode: 'college_pliers', CategoryKey: 'hand_instruments', DisplayName: 'Cotton pliers / college tweezers', SortOrder: 40 },
    { FacilityCode: 'digital_sensor', CategoryKey: 'imaging', DisplayName: 'Digital radiography sensor', SortOrder: 10 },
    { FacilityCode: 'lead_apron_thyroid_collar', CategoryKey: 'imaging', DisplayName: 'Lead apron & thyroid collar', SortOrder: 20 },
    { FacilityCode: 'phosphor_plates', CategoryKey: 'imaging', DisplayName: 'Phosphor storage plates (PSP)', SortOrder: 30 },
    { FacilityCode: 'fluoride_varnish', CategoryKey: 'restorative', DisplayName: 'Fluoride varnish application', SortOrder: 10 },
    { FacilityCode: 'etchant_syringe', CategoryKey: 'restorative', DisplayName: 'Phosphoric acid etchant', SortOrder: 20 },
    { FacilityCode: 'bonding_agent', CategoryKey: 'restorative', DisplayName: 'Dental bonding agent / primer', SortOrder: 30 },
    { FacilityCode: 'composite_compules', CategoryKey: 'restorative', DisplayName: 'Composite resin compules', SortOrder: 40 },
    { FacilityCode: 'articulating_paper', CategoryKey: 'restorative', DisplayName: 'Articulating paper / foil', SortOrder: 50 },
  ];
  await prisma.treatmentFacility.createMany({ data: treatmentFacilityRows });
  console.log(`Seeded ${treatmentFacilityRows.length} treatment facilities.`);

  // --- Sample material inventory (per consultory, linked to treatment catalog) ---
  const fac = async (code: string) =>
    prisma.treatmentFacility.findUniqueOrThrow({ where: { FacilityCode: code } });

  const nitrile = await fac('nitrile_gloves');
  const articaine = await fac('articaine_4pct');
  const composite = await fac('composite_compules');

  await prisma.materialInventoryLine.createMany({
    data: [
      { ConsultoryID: cons1.ConsultoryID, FacilityID: nitrile.FacilityID, Quantity: 120 },
      { ConsultoryID: cons1.ConsultoryID, FacilityID: articaine.FacilityID, Quantity: 40 },
      { ConsultoryID: cons2.ConsultoryID, FacilityID: nitrile.FacilityID, Quantity: 80 },
      { ConsultoryID: cons2.ConsultoryID, FacilityID: composite.FacilityID, Quantity: 24 },
    ],
  });
  await prisma.inventoryMovement.createMany({
    data: [
      {
        ConsultoryID: cons1.ConsultoryID,
        FacilityID: nitrile.FacilityID,
        QuantityChange: 120,
        Type: 'RECEIVE',
      },
      {
        ConsultoryID: cons1.ConsultoryID,
        FacilityID: articaine.FacilityID,
        QuantityChange: 40,
        Type: 'RECEIVE',
      },
      {
        ConsultoryID: cons2.ConsultoryID,
        FacilityID: nitrile.FacilityID,
        QuantityChange: 80,
        Type: 'RECEIVE',
      },
      {
        ConsultoryID: cons2.ConsultoryID,
        FacilityID: composite.FacilityID,
        QuantityChange: 24,
        Type: 'RECEIVE',
      },
    ],
  });
  console.log('Seeded sample material inventory lines + opening movements.');

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
