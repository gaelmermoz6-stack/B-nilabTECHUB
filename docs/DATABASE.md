# Base de données — AfriLaunch

## Technologie retenue

- PostgreSQL
- Prisma ORM

## Modèles de base présents

### User

Représente l'utilisateur de la plateforme.

Champs principaux :

- `id` : identifiant unique
- `email` : email unique
- `passwordHash` : mot de passe hashé
- `firstName` : prénom
- `lastName` : nom
- `phone` : optionnel
- `role` : `USER | ADMIN`
- `status` : `ACTIVE | INACTIVE | PENDING`
- `emailVerifiedAt` : date de vérification
- `createdAt`, `updatedAt`

Relations :

- `profile` : un seul profil
- `projects` : projets créés par l'utilisateur
- `applications` : candidatures
- `notifications` : notifications reçues

### Profile

Informations de profil étendu pour l'utilisateur.

### Project

Projet entrepreneurial publié ou en cours de préparation.

Points importants :

- `slug` unique
- `title` et `summary` requis
- `category` conservé comme champ texte initial pour permettre une évolution ultérieure vers un modèle dédié
- `ownerId` relation avec l'utilisateur

### Application

Candidature ou demande de participation sur un projet.

### Notification

Notification utilisateur liée à des événements de plateforme.

## À noter

Le schéma actuel est une fondation sécurisée et évolutive. Les modèles plus avancés (catégories, documents, workflows admin) seront ajoutés plus tard après validation du socle.
