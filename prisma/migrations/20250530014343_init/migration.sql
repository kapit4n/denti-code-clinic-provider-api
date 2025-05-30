-- CreateTable
CREATE TABLE "Specialization" (
    "SpecializationID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SpecializationName" TEXT NOT NULL,
    "Description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Doctor" (
    "DoctorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "LicenseNumber" TEXT NOT NULL,
    "ContactPhone" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "OfficeRoomNumber" TEXT,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "SpecializationID" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Doctor_SpecializationID_fkey" FOREIGN KEY ("SpecializationID") REFERENCES "Specialization" ("SpecializationID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProcedureCategory" (
    "CategoryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CategoryName" TEXT NOT NULL,
    "Description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProcedureType" (
    "ProcedureTypeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ProcedureName" TEXT NOT NULL,
    "Description" TEXT,
    "DefaultDurationMinutes" INTEGER,
    "StandardPrice" REAL,
    "RequiresToothSpecification" BOOLEAN NOT NULL DEFAULT false,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CategoryID" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProcedureType_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "ProcedureCategory" ("CategoryID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialization_SpecializationName_key" ON "Specialization"("SpecializationName");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_LicenseNumber_key" ON "Doctor"("LicenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_ContactPhone_key" ON "Doctor"("ContactPhone");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_Email_key" ON "Doctor"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "ProcedureCategory_CategoryName_key" ON "ProcedureCategory"("CategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "ProcedureType_ProcedureName_key" ON "ProcedureType"("ProcedureName");
