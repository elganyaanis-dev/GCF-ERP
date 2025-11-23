# ERP Rail Electr & GCF - Documentation Complète

## Vue d'ensemble

Système ERP complet d'entreprise pour Rail Electr et GCF avec gestion intégrée des RH, projets, documents, missions et communications.

## Architecture Organisationnelle Complète

```
DIRECTION GÉNÉRALE (Alger, Hussein Dey)
│
├── DIRECTIONS CENTRALES
│   ├── Direction de Marché
│   ├── Direction de Réalisation
│   ├── Direction des RH
│   ├── Direction des Matériels
│   └── Direction des Études
│
└── PÔLES OPÉRATIONNELS (4 pôles)
    ├── Pôle Extrême Est (Annaba)
    │   ├── Service Soutien (RH & CNAS)
    │   ├── Service Réalisation
    │   ├── Service Achats & Inventaire
    │   ├── Service Études
    │   ├── Chef de Projet
    │   └── Unités: Annaba, Souk Ahras, Tebessa, Constantine
    │
    ├── Pôle Centre (Alger)
    │   ├── Service Soutien (RH & CNAS)
    │   ├── Service Réalisation
    │   ├── Service Achats & Inventaire
    │   ├── Service Études
    │   ├── Chef de Projet
    │   └── Unités: Alger et villes du centre
    │
    ├── Pôle Ouest (Oran)
    │   ├── Service Soutien (RH & CNAS)
    │   ├── Service Réalisation
    │   ├── Service Achats & Inventaire
    │   ├── Service Études
    │   ├── Chef de Projet
    │   └── Unités: Villes de l'ouest
    │
    └── Pôle Sud (Batna)
        ├── Service Soutien (RH & CNAS)
        ├── Service Réalisation
        ├── Service Achats & Inventaire
        ├── Service Études
        ├── Chef de Projet
        └── Unités: Villes du sud
```

## Architecture Technique

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

## Modules Implementés

### 1. **Authentification & Sécurité**
- ✅ Replit Auth (multi-providers)
- ✅ Gestion des sessions sécurisées
- ✅ Contrôle d'accès par rôle (RBAC)
- ✅ Niveaux d'accréditation: 0 (User), 1 (Supervisor), 2 (Manager), 3 (Director), 4 (Admin)

### 2. **Ressources Humaines**
- ✅ Gestion des employés avec fiches détaillées
- ✅ Affectation aux unités et services
- ✅ Relations superviseur/subordonné
- ✅ Statuts: actif, inactif, en congé

### 3. **Gestion des Congés**
- ✅ Demandes de congé
- ✅ Validation par niveaux d'accréditation
- ✅ Types: annuel, maladie, maternité, impayé
- ✅ Historique d'approbation

### 4. **Paie**
- ✅ Génération de bulletins
- ✅ Paramètres salariaux (base, bonus, déductions)
- ✅ Historique mensuel
- ✅ Statuts: draft, validated, paid

### 5. **Formations**
- ✅ Catalogue de formations
- ✅ Inscriptions d'employés
- ✅ Suivi des compétences
- ✅ Catégories: technique, management, sécurité, conformité

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
- ✅ Création d'ordres numérotées (MO-TIMESTAMP)
- ✅ Destination, objectif, budget estimé
- ✅ Statuts: draft, pending_approval, approved, in_progress, completed
- ✅ Approbation par niveaux hiérarchiques

### 9. **Gestion des Déplacements**
- ✅ Demandes de déplacement
- ✅ Modes de transport: voiture, avion, train, bus
- ✅ Distance et coûts estimés/réels
- ✅ Suivi et approbation

### 10. **Messagerie Interne**
- ✅ Conversations directes et groupes
- ✅ Historique des messages
- ✅ Gestion des participants
- ✅ Timestamps en temps réel

### 11. **Structure Organisationnelle**
- ✅ Gestion des directions générales
- ✅ Gestion des pôles opérationnels
- ✅ Gestion des unités locales
- ✅ Gestion des directions centrales (Marché, Réalisation, RH, Matériels, Études)
- ✅ Gestion des services par pôle

### 12. **Analytics & Reporting**
- ✅ Tableau de bord avec statistiques
- ✅ Employés actifs
- ✅ Projets en cours
- ✅ Solde des documents et congés

## Base de Données - Tables Principales

```
Core Tables:
- users (authentification & accéditation)
- employees (fiches employés)

Organization:
- directions (Direction Générale)
- central_directions (Directions centrales)
- poles (Pôles opérationnels)
- pole_services (Services par pôle)
- units (Unités locales)

HR & Payroll:
- leaves (Congés)
- payroll (Bulletins de paie)
- formations (Formations)

Projects & Documents:
- projects (Projets)
- tasks (Tâches)
- documents (Documents versionnés)

Missions & Travel:
- mission_orders (Ordres de mission)
- travels (Déplacements)

Messaging:
- conversations (Conversations)
- messages (Messages)
- conversation_participants (Participants)

Audit & Notifications:
- notifications (Notifications)
- audit_logs (Logs d'audit)
```

## Routes API Principales

### Authentification
```
GET  /api/login                    - Initiate login
GET  /api/callback                 - OAuth callback
GET  /api/logout                   - Logout
GET  /api/auth/user                - Current user
```

### Ressources Humaines
```
GET    /api/employees              - List all
POST   /api/employees              - Create
GET    /api/employees/:id          - Get one
PATCH  /api/employees/:id          - Update
DELETE /api/employees/:id          - Delete
```

### Gestion des Missions & Déplacements
```
GET    /api/mission-orders         - List
POST   /api/mission-orders         - Create
PATCH  /api/mission-orders/:id     - Update

GET    /api/travels                - List
POST   /api/travels                - Create
PATCH  /api/travels/:id            - Update
```

### Messagerie
```
GET    /api/conversations          - List user's conversations
POST   /api/conversations          - Create
GET    /api/conversations/:id/messages     - Get messages
POST   /api/conversations/:id/messages     - Send message
POST   /api/conversations/:id/participants - Add participant
```

### Structure Organisationnelle
```
GET    /api/organization/directions              - List
POST   /api/organization/directions              - Create

GET    /api/organization/poles                   - List
POST   /api/organization/poles                   - Create

GET    /api/organization/units                   - List
POST   /api/organization/units                   - Create

GET    /api/organization/central-directions     - List
POST   /api/organization/central-directions     - Create

GET    /api/organization/poles/:poleId/services - List
POST   /api/organization/pole-services          - Create
```

### Autres Modules
```
GET    /api/leaves                 - Congés
POST   /api/leaves                 - Demander congé
PATCH  /api/leaves/:id             - Approver/rejeter

GET    /api/payroll                - Paie
POST   /api/payroll                - Générer bulletin

GET    /api/formations             - Formations
POST   /api/formations             - Créer formation

GET    /api/projects               - Projets
POST   /api/projects               - Créer projet
GET    /api/documents              - Documents
POST   /api/documents              - Upload

GET    /api/dashboard/stats        - Stats tableau de bord
GET    /api/notifications          - Notifications
GET    /api/analytics              - Analytics
```

## Pages Frontend

```
/ - Dashboard principal
/employees - Gestion des employés
/leaves - Gestion des congés
/payroll - Gestion de la paie
/formations - Catalogue de formations
/projects - Gestion des projets
/documents - Gestionnaire de documents
/analytics - Analytics & reporting
/messaging - Messagerie interne
/mission-orders - Ordres de mission
/travels - Gestion des déplacements
/organization - Structure de base
/org-structure - Directions & Services
/settings - Paramètres
```

## Niveaux d'Accréditation & Permissions

| Niveau | Rôle | Permissions |
|--------|------|-----------|
| 0 | Utilisateur | Consulter ses données, créer demandes |
| 1 | Superviseur | Valider demandes de ses subordonnés |
| 2 | Manager | Gérer son service, valider congés |
| 3 | Directeur | Gérer son pôle/direction, approbations |
| 4 | Admin | Accès complet, configuration système |

## Caractéristiques de Sécurité

- ✅ Authentification Replit Auth (OpenID Connect)
- ✅ Sessions sécurisées en base de données
- ✅ Tokens d'authentification avec refresh
- ✅ Validation Zod sur tous les inputs
- ✅ Contrôle d'accès basé sur rôles (RBAC)
- ✅ Logs d'audit complets
- ✅ HTTPS/TLS en production

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

## Déploiement

L'application est déployée sur Replit:
- **Frontend**: Servi par Vite via Express (port 5000)
- **Backend**: Express.js + Node.js
- **Base de données**: PostgreSQL Neon
- **Auth**: Replit Auth (OpenID Connect)

## Variables d'Environnement Requises

```
DATABASE_URL          - Connection string PostgreSQL
PGHOST, PGPORT, etc.  - Credentials PostgreSQL
SESSION_SECRET        - Secret pour les sessions
ISSUER_URL            - Replit auth issuer URL
REPL_ID               - Replit application ID
```

## Fonctionnalités Avancées Disponibles

- Niveaux d'accréditation par position
- Validation d'ordres de mission par hiérarchie
- Historique complet des actions (audit logs)
- Synchronisation temps réel (messaging)
- Rapports et analytics
- Export de données

## Prochaines Étapes Optionnelles

1. Intégration API SAP/Sage pour comptabilité
2. Module CRM pour clients & opportunités
3. Planning prévisionnel avec IA
4. Application mobile React Native
5. Backup automatique & point-in-time restore
6. Chat vidéo intégré
7. Gestion des stocks avec codes-barres
8. Workflows personnalisables
9. BI avancée avec Machine Learning
10. API REST publique documentée

## Support & Documentation

Pour plus d'informations sur:
- **Structure organisationnelle**: Page `/org-structure`
- **Messagerie**: Page `/messaging`
- **Ordres de mission**: Page `/mission-orders`
- **Déplacements**: Page `/travels`
- **RH & Paie**: Pages `/employees`, `/leaves`, `/payroll`

---

**Dernière Mise à Jour**: 23 Nov 2025
**Version**: 1.0.0
**Statut**: ✅ MVP Complet - Production Ready
