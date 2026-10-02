# Développement — AfriLaunch

## Prérequis

- Node.js 20+
- PostgreSQL local ou distant
- accès à une base PostgreSQL avec une base dédiée au projet

## Installation

```bash
npm install
cp .env.example .env.local
```

## Variables requises

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/africlaunch_dev?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
AUTH_SECRET="replace-with-a-long-random-secret"
NODE_ENV="development"
```

## Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

## Lancement

```bash
npm run dev
```

## Vérification de qualité

```bash
npm run lint
npm run typecheck
npm run build
```

## Important

Cette phase correspond au socle backend uniquement. Les fonctionnalités business complètes seront ajoutées dans des étapes ultérieures et validées séparément.
