-- CreateTable
CREATE TABLE "TreatmentFacility" (
    "FacilityID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FacilityCode" TEXT NOT NULL,
    "CategoryKey" TEXT NOT NULL,
    "DisplayName" TEXT NOT NULL,
    "SortOrder" INTEGER NOT NULL DEFAULT 0,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentFacility_FacilityCode_key" ON "TreatmentFacility"("FacilityCode");
