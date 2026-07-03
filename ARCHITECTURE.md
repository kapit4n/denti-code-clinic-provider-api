# Architecture

## Overview

**denti-code-clinic-provider-api** is the Clinic & Provider Management microservice. It manages doctors, specializations, procedure catalogs, treatment facilities, consultories (operatories), and material inventory.

```
┌────────────────────────────────────────────────────────────┐
│              denti-code-clinic-provider-api                 │
│              NestJS 11 · Prisma · SQLite                   │
│              (port 3002)                                   │
│                                                            │
│  ┌──────────┐ ┌──────────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Doctors   │ │Specializations│ │Procedures│ │Inventory │ │
│  │ CRUD      │ │ CRUD         │ │ Cats +   │ │ Lines    │ │
│  │ /api/v1   │ │ /api/v1      │ │ Types    │ │ Movemts  │ │
│  │           │ │              │ │ /api/v1  │ │ /api/v1  │ │
│  └──────────┘ └──────────────┘ └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────────┐ ┌──────────┐              │
│  │Consultories││Treatment    │ │Patients  │              │
│  │ CRUD      ││ Facilities   │ │(via auth │              │
│  │ /api/v1   ││ (read-only)  │ │ headers) │              │
│  └──────────┘ └──────────────┘ └──────────┘              │
└────────────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────┐     ┌──────────────────────┐
│   SQLite/Prisma  │     │  Appointments Svc    │
│   dev.db         │◄────│  (inventory sync)    │
└──────────────────┘     └──────────────────────┘
```

## Project Structure

```
src/
  main.ts                        # Bootstrap NestJS with global prefix /api, v1 versioning
  app.module.ts                  # Root module
  app.controller.ts              # Health check (GET /)
  app.service.ts
  prisma/
    prisma.module.ts             # Global Prisma module
    prisma.service.ts            # PrismaClient wrapper
  doctors/
    doctors.module.ts
    doctors.controller.ts        # CRUD for doctors
    doctors.service.ts
    dto/
      create-doctor.dto.ts
      update-doctor.dto.ts
      patch-doctor-avatar.dto.ts
  specializations/
    specializations.module.ts
    specializations.controller.ts
    specializations.service.ts
    dto/
  procedures/
    procedures.module.ts
    controllers/
      procedure-categories.controller.ts
      procedure-types.controller.ts
    services/
      procedure-categories.service.ts
      procedure-types.service.ts
    dto/
  treatment-facilities/
    treatment-facilities.module.ts
    treatment-facilities.controller.ts  # Read-only list
    treatment-facilities.service.ts
  consultories/
    consultories.module.ts
    consultories.controller.ts
    consultories.service.ts
    dto/
  inventory/
    inventory.module.ts
    inventory.controller.ts             # Stock lines, movements, adjust, code-deltas
    inventory.service.ts                # Transactional inventory operations
    dto/
      create-inventory-line.dto.ts
      adjust-inventory.dto.ts
      apply-code-deltas.dto.ts
prisma/
  schema.prisma                         # 8 models
  seed.ts                               # Marvel-themed seed data
  migrations/
```

## Database Model

```
Specialization ──╼ Doctor ──╼ Doctor (self-referencing via SpecializationID)

ProcedureCategory ──╼ ProcedureType

TreatmentFacility (catalog of materials/equipment)

Consultory ──╼ MaterialInventoryLine ──╼ TreatmentFacility
       └──────╼ InventoryMovement
```

## Key Integration

The `POST /api/v1/inventory/apply-code-deltas` endpoint is consumed by the Appointments Service to sync facility/material usage during patient visits:
- Sends net deltas by facility code (e.g., `nitrile_gloves: -2`)
- Service adjusts stock atomically within a Prisma transaction

## API Routes

All routes are under `/api/v1`.

### Doctors
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| CRUD   | `/doctors`            | Doctor management   |
| PATCH  | `/doctors/me/avatar`  | Update avatar       |

### Specializations
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| CRUD   | `/specializations`    | Specialization mgmt |

### Procedures
| Method | Endpoint                                | Description         |
|--------|-----------------------------------------|---------------------|
| CRUD   | `/procedures/categories`                | Procedure categories|
| CRUD   | `/procedures/types`                     | Procedure types     |

### Treatment Facilities
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | `/treatment-facilities` | List active facilities |

### Consultories
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| CRUD   | `/consultories`       | Consultory mgmt     |

### Inventory
| Method | Endpoint                       | Description                 |
|--------|--------------------------------|-----------------------------|
| GET    | `/inventory/lines`             | Stock lines by consultory   |
| GET    | `/inventory/movements`         | Movement history            |
| POST   | `/inventory/lines`             | Create stock line           |
| POST   | `/inventory/adjust`            | RECEIVE/REMOVE/CONSUME stock|
| POST   | `/inventory/apply-code-deltas` | Batch delta sync (from visits)|
| DELETE | `/inventory/lines/:lineId`     | Remove stock line           |
