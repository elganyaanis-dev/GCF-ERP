# ERP Rail Electr & GCF - Documentation

## Vue d'ensemble

Système ERP complet d'entreprise pour Rail Electr et GCF avec gestion intégrée des RH, projets, documents, missions et communications.

## Architecture

### Frontend (React + Vite)
- **Framework**: React 18 + TypeScript
- **UI Components**: Shadcn + Radix UI + Tailwind CSS
- **State Management**: TanStack React Query v5
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend (Express.js)
- **Framework**: Express + Node.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Auth**: Replit Auth (OpenID Connect)
- **Validation**: Zod
- **Session**: connect-pg-simple + express-session

## Structure Organisationnelle

```
Direction Générale (Alger, Hussein Dey)
├── Pôle Extrême Est (Annaba)
│   ├── Unité Annaba
│   ├── Unité Souk Ahras
│   ├── Unité Tebessa
│   └── Unité Constantine
├── Pôle Centre (Alger)
│   └── Unités des villes du centre
├── Pôle Ouest (Oran)
│   └── Unités des villes de l'ouest
└── Pôle Sud (Batna)
    └── Unités du sud
```

## Modules Implementés

### 1. **Authentification & Sécurité**
- ✅ Replit Auth (multi-providers)
- ✅ Gestion des sessions
- ✅ Contrôle d'accès par rôle
- ✅ Niveaux d'accréditation (0-4)

### 2. **Ressources Humaines**
- ✅ Gestion des employés
- ✅ Fiches détaillées par poste
- ✅ Affectation aux unités
- ✅ Relation superviseur/subordonné

### 3. **Gestion des Congés**
- ✅ Demandes de congé
- ✅ Validation par niveaux d'accréditation
- ✅ Historique d'approbation
- ✅ Types: annuel, maladie, maternité, impayé

### 4. **Paie**
- ✅ Génération de bulletins
- ✅ Paramètres salariaux
- ✅ Bonus et déductions
- ✅ Historique mensuel

### 5. **Formations**
- ✅ Catalogue de formations
- ✅ Inscriptions d'employés
- ✅ Suivi des compétences
- ✅ Catégories: technique, management, sécurité

### 6. **Gestion des Projets**
- ✅ Création et suivi de projets
- ✅ Budgets et dépenses
- ✅ Tâches et affectations
- ✅ Statuts: planning, in_progress, hold, completed, cancelled

### 7. **Gestion des Documents**
- ✅ Upload et versioning
- ✅ Classification par type
- ✅ Archivage
- ✅ Liens avec projets

### 8. **Ordres de Mission**
- ✅ Création d'ordres de mission numérotées
- ✅ Destination, objectif, budget estimé
- ✅ Statuts: draft, pending_approval, approved, in_progress, completed
- ✅ Approbation par niveaux hiérarchiques

### 9. **Gestion des Déplacements**
- ✅ Demandes de déplacement
- ✅ Modes de transport
- ✅ Distance et coûts
- ✅ Suivi et statuts

### 10. **Messagerie Interne**
- ✅ Conversations directes et groupes
- ✅ Historique des messages
- ✅ Participants
- ✅ Timestamps des messages

### 11. **Structure Organisationnelle**
- ✅ Gestion des directions
- ✅ Gestion des pôles opérationnels
- ✅ Gestion des unités locales
- ✅ Hiérarchie complète

### 12. **Analytics**
- ✅ Tableau de bord avec statistiques
- ✅ Employés actifs
- ✅ Projets en cours
- ✅ Documents et congés en attente

## Routes API Principales

### Authentification
- `GET /api/login` - Initiate login
- `GET /api/callback` - OAuth callback
- `GET /api/logout` - Logout
- `GET /api/auth/user` - Current user

### Ressources Humaines
- `GET /api/employees` - List all
- `POST /api/employees` - Create
- `PATCH /api/employees/:id` - Update
- `DELETE /api/employees/:id` - Delete

### Gestion des Missions
- `GET /api/mission-orders` - List
- `POST /api/mission-orders` - Create
- `PATCH /api/mission-orders/:id` - Update
- `GET /api/travels` - List travels
- `POST /api/travels` - Create travel
- `PATCH /api/travels/:id` - Update travel

### Messagerie
- `GET /api/conversations` - List user's conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/:id/messages` - Get messages
- `POST /api/conversations/:id/messages` - Send message
- `POST /api/conversations/:id/participants` - Add participant

### Organisation
- `GET /api/organization/directions` - List
- `POST /api/organization/directions` - Create
- `GET /api/organization/poles` - List
- `POST /api/organization/poles` - Create
- `GET /api/organization/units` - List
- `POST /api/organization/units` - Create

## Base de Données - Tables Principales

1. **users** - Utilisateurs authentifiés
2. **employees** - Fiches employés détaillées
3. **directions** - Direction générale
4. **poles** - Pôles opérationnels
5. **units** - Unités locales
6. **projects** - Projets
7. **tasks** - Tâches de projets
8. **documents** - Documents versionnés
9. **leaves** - Demandes de congé
10. **payroll** - Bulletins de paie
11. **formations** - Formations et inscriptions
12. **missionOrders** - Ordres de mission
13. **travels** - Déplacements professionnels
14. **conversations** - Conversations (messagerie)
15. **messages** - Messages
16. **conversationParticipants** - Participants aux conversations
17. **notifications** - Notifications utilisateurs
18. **auditLogs** - Logs d'audit des actions

## Niveaux d'Accréditation

- **0**: Utilisateur normal (employé)
- **1**: Superviseur
- **2**: Manager
- **3**: Directeur
- **4**: Administrateur système

## Pages Frontend

- `/` - Dashboard
- `/employees` - Gestion des employés
- `/leaves` - Gestion des congés
- `/payroll` - Gestion de la paie
- `/formations` - Catalogue de formations
- `/projects` - Gestion des projets
- `/documents` - Gestionnaire de documents
- `/analytics` - Analytics & reporting
- `/messaging` - Messagerie interne
- `/mission-orders` - Ordres de mission
- `/travels` - Gestion des déplacements
- `/organization` - Structure organisationnelle
- `/settings` - Paramètres

## Caractéristiques de Sécurité

- ✅ Authentification Replit Auth
- ✅ Sessions sécurisées en base de données
- ✅ Tokens d'authentification
- ✅ Validation Zod sur tous les inputs
- ✅ Contrôle d'accès basé sur rôles (RBAC)
- ✅ Logs d'audit complets
- ✅ HTTPS/TLS en production

## Déploiement

L'application est déployée sur Replit:
- Frontend: Servi par Vite via Express
- Backend: Express.js sur port 5000
- Base de données: PostgreSQL Neon
- Auth: Replit Auth intégrée

## Variables d'Environnement Requises

- `DATABASE_URL` - Connection string PostgreSQL
- `SESSION_SECRET` - Secret pour les sessions
- `ISSUER_URL` - Replit auth issuer
- `REPL_ID` - Replit application ID

## Prochaines Étapes Possibles

1. Intégration SAP/Sage pour synchronisation comptable
2. Module CRM pour gestion clients
3. Planning prévisionnel avec IA
4. Application mobile React Native
5. Backup automatique et point-in-time restore
6. Visioconférence intégrée
7. Gestion des stocks avec codes-barres
8. Workflows personnalisables
9. BI avancée avec Machine Learning
10. Export API REST documentée

## Configuration Locale

```bash
# Installation
npm install

# Migration BD
npm run db:push

# Développement
npm run dev

# Build
npm run build
```

## Dernière Mise à Jour

- **Date**: 22 Nov 2025
- **Version**: 1.0.0
- **Statut**: MVP Complet - Production Ready
