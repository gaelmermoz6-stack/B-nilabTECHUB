# Sécurité — AfriLaunch

## Bonnes pratiques mises en place dans le socle

- variables d'environnement centralisées
- secrets ne sont pas poussés dans le dépôt
- validation des entrées côté serveur via Zod
- gestion d'erreurs sans exposition de stack trace
- base de permissions préparée par rôle
- préparation de sessions Auth.js / NextAuth

## Recommandations à venir

- sessions sécurisées avec cookies HTTP-only
- `NEXTAUTH_SECRET` / `AUTH_SECRET` distincts et fortes
- taux limite (rate limiting)
- protections sur fichiers uploadés
- logs sans données sensibles
- rôles backend vérifiés à chaque accès sensible

## Règle importante

Le fait qu'un bouton soit caché dans le frontend ne constitue pas une protection. Toute permission doit être vérifiée côté serveur.
