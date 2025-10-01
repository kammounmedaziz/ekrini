# Plateforme de Location Automobile – Architecture Microservices

## Description
Plateforme de location automobile centralisant l’offre de plusieurs agences partenaires. Microservices Node.js/Express, frontend React/Tailwind, MongoDB, Docker, CI/CD GitHub Actions.

## Structure du projet
```
├── backend/
│   ├── auth-user-service/          # Authentification, gestion utilisateurs, KYC, MFA
│   ├── agency-fleet-service/       # Gestion agences et flotte véhicules
│   ├── search-availability-service/ # Recherche, disponibilité, cache, ElasticSearch
│   ├── reservation-service/        # Réservations, contrats, intégration calendrier
│   ├── payment-billing-service/    # Paiements, facturation, intégrations Stripe/PayPal
│   ├── review-support-service/     # Avis, support, modération
│   └── shared/                     # Librairies/utilitaires communs
├── frontend/                       # Application React.js (UI/UX Tailwind CSS)
├── docker/                         # Dockerfiles, docker-compose.yml
├── docs/                          # Documentation API et architecture
├── scripts/                       # Scripts de déploiement et utilitaires
└── .github/workflows/             # CI/CD GitHub Actions
```

## Démarrage rapide
1. Installer Node.js, Docker, MongoDB
2. Configurer les fichiers `.env` pour chaque service
3. Lancer `docker-compose up` dans le dossier `docker`

## Technologies
- Node.js, Express.js, React.js, Tailwind CSS
- MongoDB, Redis, ElasticSearch
- Docker, GitHub Actions
