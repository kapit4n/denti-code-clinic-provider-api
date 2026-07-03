# denti-code-clinic-provider-api

Clinic & Provider Management microservice for the denti-code platform. Manages doctors, specializations, procedures, treatment facilities, consultories, and inventory.

## System Diagram

```
                         ┌──────────────────────────────┐
                         │  denti-code-clinic-provider  │
                         │  (port 3002)                 │
                         │                              │
Appointments Svc ──POST──►  /inventory/apply-code-deltas │
(inventory sync)           │                              │
                           │  ┌────────────────────────┐ │
                           │  │  Doctors · Specializations│
                           │  │  Procedures · Facilities │
                           │  │  Consultories · Inventory│
                           │  └───────────┬────────────┘ │
                           └──────────────┼──────────────┘
                                          │
                                          ▼
                                  ┌──────────────┐
                                  │   Prisma +   │
                                  │   SQLite     │
                                  └──────────────┘
```

## Key Features

- **Provider Management** — CRUD for doctors and specializations
- **Procedure Catalog** — categories and types with pricing and duration defaults
- **Treatment Facilities** — read-only catalog of dental materials, equipment, and PPE
- **Inventory Tracking** — stock lines per consultory, movement audit log, batch delta sync
- **Consultories** — manage operatories as inventory locations
- **Swagger Docs** — auto-generated OpenAPI documentation
- **Avatar Management** — doctor avatar via `x-user-email` header

## Getting Started

```bash
npm install
npx prisma migrate dev
npm run prisma.seed
npm run start:dev
```

Server starts on `http://0.0.0.0:3002`.

## Docs

- [Architecture](./ARCHITECTURE.md)
- [Tech Stack](./TECH_STACK.md)
