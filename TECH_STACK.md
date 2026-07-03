# Tech Stack

| Layer              | Technology                              |
|--------------------|-----------------------------------------|
| Runtime            | Node.js                                 |
| Language           | TypeScript (SWC-compiled)               |
| Framework          | NestJS v11                              |
| ORM                | Prisma v6                               |
| Database           | SQLite (dev)                            |
| API Documentation  | @nestjs/swagger (OpenAPI)               |
| Validation         | class-validator + class-transformer     |
| Testing            | Jest + supertest                        |
| Linting            | ESLint 9 + Prettier                     |

## Key Dependencies

| Package                    | Purpose                                 |
|----------------------------|-----------------------------------------|
| @nestjs/core v11           | NestJS framework                        |
| @nestjs/swagger            | OpenAPI/Swagger auto-documentation      |
| @prisma/client v6          | Type-safe database client               |
| prisma v6                  | Schema management, migrations           |
| class-validator            | DTO validation decorators               |
| class-transformer          | Payload transformation                  |

## Scripts

| Command               | Description                     |
|-----------------------|---------------------------------|
| `npm run start:dev`   | Start with hot-reload           |
| `npm run build`       | Compile via nest build          |
| `npm start`           | Run compiled server             |
| `npm test`            | Run unit tests                  |
| `npm run test:e2e`    | Run end-to-end tests            |
| `npm run lint`        | ESLint with --fix               |
| `npm run prisma.seed` | Seed database                   |

## Environment Variables

| Variable           | Default             | Description                  |
|--------------------|---------------------|------------------------------|
| `PORT`             | `3002`              | HTTP server port             |
| `DATABASE_URL`     | `file:./dev.db`     | Prisma database connection   |

## Seed Data

- 4 specializations (General Dentistry, Orthodontics, Endodontics, Periodontics)
- 4 procedure categories, 8 procedure types
- 5 doctors (Marvel-themed, matching auth service users)
- 3 consultories
- 36 treatment facilities across 8 categories
- Sample inventory lines with opening movements
