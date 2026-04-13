-- CreateTable
CREATE TABLE "Consultory" (
    "ConsultoryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "ShortCode" TEXT,
    "SortOrder" INTEGER NOT NULL DEFAULT 0,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MaterialInventoryLine" (
    "LineID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ConsultoryID" INTEGER NOT NULL,
    "FacilityID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MaterialInventoryLine_ConsultoryID_fkey" FOREIGN KEY ("ConsultoryID") REFERENCES "Consultory" ("ConsultoryID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MaterialInventoryLine_FacilityID_fkey" FOREIGN KEY ("FacilityID") REFERENCES "TreatmentFacility" ("FacilityID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InventoryMovement" (
    "MovementID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ConsultoryID" INTEGER NOT NULL,
    "FacilityID" INTEGER NOT NULL,
    "QuantityChange" INTEGER NOT NULL,
    "Type" TEXT NOT NULL,
    "Note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InventoryMovement_ConsultoryID_fkey" FOREIGN KEY ("ConsultoryID") REFERENCES "Consultory" ("ConsultoryID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_FacilityID_fkey" FOREIGN KEY ("FacilityID") REFERENCES "TreatmentFacility" ("FacilityID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Consultory_ShortCode_key" ON "Consultory"("ShortCode");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialInventoryLine_ConsultoryID_FacilityID_key" ON "MaterialInventoryLine"("ConsultoryID", "FacilityID");
