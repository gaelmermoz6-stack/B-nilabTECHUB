# Architecture backend — AfriLaunch

## Objectif de cette étape

Cette première étape établit le socle backend sans modifier ni casser les écrans frontend existants.

## Structure actuelle

- `src/app` : routes Next.js App Router
- `src/components` : composants UI déjà présents
- `src/features` : modules métier par domaine
- `src/lib` : utilitaires de backend (Prisma, auth, env, validation, erreurs)
- `src/services` : logique métier supplémentaire
- `src/types` : types partagés
- `src/config` : configuration applicative

## Backend fondation

### 1. Base de données

- PostgreSQL via Prisma ORM
- client Prisma unique géré dans `src/lib/prisma.ts`
- schéma initial pour utilisateurs, profils, projets, demandes, notifications

### 2. Validation

- Zod préparé pour les données de formulaire et les entités serveur
- utilitaires dans `src/lib/validation`

### 3. Gestion des erreurs

- centralisation des erreurs dans `src/lib/errors/api-error.ts`
- objets de réponse standardisés sans fuite de secrets

### 4. Variables d'environnement

- centralisation dans `src/lib/env/index.ts`
- exemple dans `.env.example`

### 5. Authentification

- Auth.js / NextAuth proposé comme mécanisme principal
- adaptation Prisma prévue
- rôles `USER` et `ADMIN` avec permissions explicites

## Points d'entrée HTTP

Les routes versionnées sont déposées sous `src/app/api/v1/`.

Pour l'instant, seules les routes de structure sont présentes :

- `/api/v1`
- `/api/v1/health`
- `/api/v1/auth/register`
- `/api/v1/auth/login`

Les fonctionnalités d'inscription réelle et de connexion complète sont volontairement mises en pause pour cette phase.

## Règle de conception utilisée

- aucun frontend supprimé ;
- aucune logique métier complexe ajoutée sans validation du socle ;
- aucune route métier complète avant la fondation backend stable.
