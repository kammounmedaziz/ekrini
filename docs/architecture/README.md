# Architecture

## Vue d'ensemble
La plateforme utilise une architecture microservices avec les composants suivants:

## Services Backend
1. **Auth User Service**: Gestion des utilisateurs et authentification
2. **Agency Fleet Service**: Gestion des agences et des flottes
3. **Search Availability Service**: Recherche et disponibilité
4. **Reservation Service**: Gestion des réservations
5. **Payment Billing Service**: Paiements et facturation
6. **Review Support Service**: Avis et support client

## Frontend
- Application React.js avec Tailwind CSS
- Communication via API REST

## Base de données
- MongoDB pour la persistance
- Redis pour le cache
- Elasticsearch pour la recherche

## Infrastructure
- Docker pour la conteneurisation
- GitHub Actions pour CI/CD