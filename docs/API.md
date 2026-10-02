# API — AfriLaunch

## Versionnement

Le backend est préparé autour de l'API versionnée :

- `/api/v1/`

## Routes présentes

### GET /api/v1

Retourne l'état de la version API.

### GET /api/v1/health

Vérifie si le service est disponible.

### POST /api/v1/auth/register

Point d'entrée préparé pour l'inscription. La logique métier réelle n'est pas encore active.

### POST /api/v1/auth/login

Point d'entrée préparé pour la connexion. La logique métier réelle n'est pas encore active.

## Conventions

- Réponses JSON
- codes HTTP standards
- erreurs normalisées via la couche `src/lib/errors`
- validation via Zod avant traitement métier

## À venir

Les routes complètes seront mises en place progressivement après validation du socle :

- auth
- projets
- candidatures
- admin
- documents
- notifications
