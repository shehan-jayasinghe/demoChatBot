# Prisma Setup Instructions

This project uses **Prisma 7** with **SQLite** for local development. Demo products are loaded from [DummyJSON](https://dummyjson.com/docs/products) via a seed script.

## 1. Create your environment file

Copy the example env file and add your Clerk keys:

```bash
cp .env.example .env
```

Minimum required for database:

```env
DATABASE_URL="file:./dev.db"
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run migrations (create tables)

This creates the `Product` table in `dev.db`:

```bash
npm run db:migrate
```

When prompted for a migration name, you can use: `init`

## 4. Generate Prisma Client

```bash
npm run db:generate
```

## 5. Seed demo product data

Fetches 20 products from DummyJSON and saves them to the database. The first 4 are marked as featured (banner):

```bash
npm run db:seed
```

## One-command setup

Run migrate + generate + seed together:

```bash
npm run db:setup
```

## 6. Start the app

```bash
npm run dev
```

Open [http://localhost:3000/products](http://localhost:3000/products)

## Re-seed data (refresh products)

Safe to re-run — uses upsert so existing products are updated:

```bash
npm run db:seed
```

## Production (PostgreSQL on Vercel)

For production, switch to Postgres (e.g. Neon):

1. Create a Postgres database on [Neon](https://neon.tech)
2. Update `prisma/schema.prisma` datasource:

```prisma
datasource db {
  provider = "postgresql"
}
```

3. Set `DATABASE_URL` in Vercel to your Postgres connection string
4. Install Postgres adapter: `@prisma/adapter-pg` and update `lib/db.ts`
5. Deploy migrations:

```bash
npx prisma migrate deploy
npm run db:seed
```

## Useful commands

| Command | Description |
|---------|-------------|
| `npm run db:migrate` | Create/apply database migrations |
| `npm run db:generate` | Regenerate Prisma Client after schema changes |
| `npm run db:seed` | Load demo products from DummyJSON |
| `npm run db:setup` | Migrate + generate + seed (first-time setup) |
| `npx prisma studio` | Open visual database browser |

## Troubleshooting

**"Prisma Client not generated"**
```bash
npm run db:generate
```

**"Table Product does not exist"**
```bash
npm run db:migrate
```

**Empty products page**
```bash
npm run db:seed
```

**Images not loading**
DummyJSON images are allowed in `next.config.ts` under `cdn.dummyjson.com`.
