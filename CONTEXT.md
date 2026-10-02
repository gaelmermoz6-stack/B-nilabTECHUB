# AfriLaunch — contexte technique

## État du projet

Le frontend des écrans public, auth, dashboard, admin et projets est déjà présent et fonctionnel au niveau UI.

Le backend n'est pas encore implémenté de manière fonctionnelle. La base actuelle contient :

- architecture Next.js App Router;
- structure de dossiers par fonctionnalités;
- configuration Prisma préparée;
- variables d'environnement d'exemple;
- validation Zod installée;
- composants de sécurité et d'authentification en préparation.

## Ce qui est volontairement mis en pause

Les fonctionnalités métier suivantes sont volontairement laissées hors de cette étape de socle backend :

- création de projet;
- candidatures;
- documents;
- notifications;
- dashboard dynamique;
- administration métier.

## Architecture de fondation

- `src/app/api/v1/` : points d'entrée HTTP versionnés;
- `src/lib/prisma.ts` : client Prisma singleton;
- `src/lib/auth/` : stratégie d'authentification et permissions;
- `src/lib/env/` : validation des variables d'environnement;
- `src/lib/errors/` : gestion centralisée des erreurs;
- `src/lib/validation/` : validation des schémas de données;
- `src/features/*/` : modules métier par domaine;
- `prisma/schema.prisma` : modèles initiaux de base pour les utilisateurs et les projets.

## Authentification proposée

L'option retenue est Auth.js (NextAuth) avec adapter Prisma, compatible avec Next.js App Router et avec des sessions/user roles sécurisées.

## Important

Cette étape cible le socle backend uniquement. Aucun frontend existant n'est réécrit ou supprimé.
