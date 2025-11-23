# ERP Rail Electr & GCF - Documentation Complète v2.0

## Vue d'ensemble

Système ERP complet d'entreprise pour Rail Electr et GCF avec gestion intégrée des RH, projets, documents, missions, paie avancée, social, partenaires/fournisseurs et customization par service.

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
└── PÔLES OPÉRATIONNELS (4 pôles indépendants et collaboratifs)
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
- **Auth**: Replit Auth (OpenID Connect) + Pre-registration Validation
- **Validation**: Zod
- **Session**: connect-pg-simple + express-session

## Modules Implementés

### 1. **Authentification & Sécurité (RENFORCÉE)**
- ✅ Replit Auth (multi-providers)
- ✅ **NOUVEAU: Validation de pré-inscription obligatoire** - Seuls les employés pré-enregistrés peuvent accéder
- ✅ Gestion des sessions sécurisées
- ✅ Contrôle d'accès par rôle (RBAC)
- ✅ Niveaux d'accréditation masqués: 0 (User), 1 (Supervisor), 2 (Manager), 3 (Director), 4 (Admin)
- ✅ Accéditations supremes invisibles dans l'API

### 2. **Ressources Humaines**
- ✅ Gestion des employés avec fiches détaillées
- ✅ Date de naissance (pour validation pré-registration)
- ✅ Affectation aux unités et services
- ✅ Relations superviseur/subordonné
- ✅ Statuts: actif, inactif, en congé
- ✅ **NOUVEAU: Lien vers grille salariale**

### 3. **Gestion des Congés**
- ✅ Demandes de congé
- ✅ Validation par niveaux d'accréditation
- ✅ Types: annuel, maladie, maternité, impayé
- ✅ Historique d'approbation

### 4. **Paie Avancée (MODULE COMPLET)**
- ✅ **NOUVEAU: Grilles salariales** - Niveaux (A, B, C, etc.) avec min/max
- ✅ **NOUVEAU: Indemnités configurables** - Logement, repas, transport, etc.
- ✅ **NOUVEAU: Primes** - Performance, congés, annuelles, etc.
- ✅ **NOUVEAU: Frais de déplacement** - Transport, hébergement, repas
- ✅ **NOUVEAU: Support multi-pays** - Configuration par pays (Algérie, etc.)
- ✅ Bulletins de paie détaillés
- ✅ Cotisations sociales
- ✅ Statuts: draft, validated, paid

### 5. **Bénéfices Sociaux (NOUVEAU MODULE)**
- ✅ Assurance santé
- ✅ Retraite
- ✅ Assurance décès
- ✅ **Configuration par poste** - Coûts différents selon position

### 6. **Gestion Sociale (NOUVEAU MODULE)**
- ✅ **NOUVEAU: Dons aux causes** - Pour fêtes religieuses, solidarité, etc.
- ✅ **NOUVEAU: Prêts aux employés** - Avec conditions d'approbation
  - Montant configurable
  - Durée de remboursement (mois)
  - Taux d'intérêt
  - Statut: pending, approved, active, completed

### 7. **Formations**
- ✅ Catalogue de formations
- ✅ Inscriptions d'employés
- ✅ Suivi des compétences
- ✅ Catégories: technique, management, sécurité, conformité

### 8. **Gestion des Projets (AMÉLIORÉE)**
- ✅ **NOUVEAU: Types de projets**
  - Marchés publics
  - Contrats gré à gré
  - Sous-traitance
- ✅ **NOUVEAU: Lien vers partenaires/fournisseurs**
- ✅ Budgets et dépenses
- ✅ Tâches et affectations (Gantt)
- ✅ Statuts: planning, in_progress, hold, completed, cancelled

### 9. **Partenaires & Fournisseurs (NOUVEAU MODULE COMPLET)**
- ✅ **NOUVEAU: Database complète**
  - Partenaires collaborateurs
  - Fournisseurs (matériels, services)
  - Sous-traitants
- ✅ Gestion par type
- ✅ Contact, adresse, détails fiscaux
- ✅ Coordonnées bancaires
- ✅ Statuts: actif, inactif, suspendu
- ✅ Historique de collaboration

### 10. **Gestion des Documents**
- ✅ Upload et versioning
- ✅ Classification par type
- ✅ Archivage
- ✅ Liens avec projets

### 11. **Ordres de Mission**
- ✅ Création d'ordres numérotées (MO-TIMESTAMP)
- ✅ Destination, objectif, budget estimé
- ✅ Statuts: draft, pending_approval, approved, in_progress, completed
- ✅ Approbation par niveaux hiérarchiques

### 12. **Gestion des Déplacements**
- ✅ Demandes de déplacement
- ✅ Modes de transport: voiture, avion, train, bus
- ✅ **NOUVEAU: Frais de déplacement détaillés**
- ✅ Distance et coûts estimés/réels
- ✅ Suivi et approbation

### 13. **Messagerie Interne**
- ✅ Conversations directes et groupes
- ✅ Historique des messages
- ✅ Gestion des participants
- ✅ Timestamps en temps réel

### 14. **Structure Organisationnelle**
- ✅ Gestion des directions générales
- ✅ Gestion des pôles opérationnels (indépendants mais collaboratifs)
- ✅ Gestion des unités locales
- ✅ Gestion des directions centrales
- ✅ Gestion des services par pôle
- ✅ **NOUVEAU: Emails pour chaque service et direction**

### 15. **Customization par Service (NOUVEAU MODULE)**
- ✅ **NOUVEAU: Configuration spécifique par service**
  - Feature flags
  - Paramètres métier
  - Permissions granulaires
  - Configuration du workflow
- ✅ Indépendance des pôles avec collaboration possible

### 16. **Analytics & Reporting**
- ✅ Tableau de bord avec statistiques
- ✅ Employés actifs
- ✅ Projets en cours
- ✅ Solde des documents et congés
- ✅ Données paie (consolidation multi-pays)

### 17. **Communications ERP**
- ✅ Feedback direct des utilisateurs
- ✅ Demandes de modification
- ✅ Signalement de bugs
- ✅ Demandes de features

## Base de Données - Tables Complètes

```
Core Tables:
- users (authentification & accréditation)
- employees (fiches employés + DOB)

Organization:
- directions (Direction Générale)
- central_directions (Directions centrales)
- poles (Pôles opérationnels)
- pole_services (Services par pôle)
- units (Unités locales)

HR & Payroll:
- leaves (Congés)
- payroll (Bulletins de paie avancés)
- salary_grids (Grilles salariales)
- allowances (Indemnités)
- bonuses (Primes)
- formations (Formations)

Social & Benefits:
- social_benefits (Bénéfices sociaux)
- employee_donations (Dons aux causes)
- employee_loans (Prêts aux employés)

Projects & Documents:
- projects (Projets avec types)
- project_types (Types: public_market, direct_contract, subcontracting)
- tasks (Tâches Gantt)
- documents (Documents versionnés)

Partners & Suppliers:
- partners (Partenaires, fournisseurs, sous-traitants)

Travel & Missions:
- mission_orders (Ordres de mission)
- travels (Déplacements)
- travel_expenses (Frais de déplacement)

Customization:
- service_customizations (Configuration par service)

Messaging:
- conversations (Conversations)
- messages (Messages)
- conversation_participants (Participants)

Audit & Notifications:
- notifications (Notifications)
- audit_logs (Logs d'audit)
- erp_communications (Communications ERP)
```

## Routes API Principales

### Authentification & Sécurité
```
GET  /api/login                    - Initiate login
GET  /api/callback                 - OAuth callback  
GET  /api/logout                   - Logout
GET  /api/auth/user                - Current user (masque admin/director)
```

### Ressources Humaines
```
GET    /api/employees              - List all
POST   /api/employees              - Create
GET    /api/employees/:id          - Get one
PATCH  /api/employees/:id          - Update
DELETE /api/employees/:id          - Delete
```

### Paie & Avantages
```
GET    /api/payroll                - Bulletins
POST   /api/payroll                - Générer bulletin
GET    /api/salary-grids           - Grilles salariales
POST   /api/salary-grids           - Créer grille
GET    /api/allowances             - Indemnités
POST   /api/allowances             - Créer indemnité
GET    /api/bonuses                - Primes
POST   /api/bonuses                - Créer prime
GET    /api/social-benefits        - Bénéfices sociaux
GET    /api/employee-donations     - Dons
POST   /api/employee-donations     - Créer don
GET    /api/employee-loans         - Prêts
POST   /api/employee-loans         - Créer prêt
PATCH  /api/employee-loans/:id     - Approuver/Mettre à jour
```

### Partenaires & Fournisseurs
```
GET    /api/partners               - List all
POST   /api/partners               - Create
PATCH  /api/partners/:id           - Update
```

### Projets
```
GET    /api/projects               - List
POST   /api/projects               - Create
GET    /api/projects/:id           - Get one
PATCH  /api/projects/:id           - Update
DELETE /api/projects/:id           - Delete
GET    /api/project-types          - List types
```

### Déplacements & Frais
```
GET    /api/travels                - List
POST   /api/travels                - Create
PATCH  /api/travels/:id            - Update
GET    /api/travel-expenses        - Expenses list
POST   /api/travel-expenses        - Create expense
```

### Structure Organisationnelle
```
GET    /api/organization/directions              - List
POST   /api/organization/directions              - Create (admin only)
GET    /api/organization/poles                   - List
POST   /api/organization/poles                   - Create (admin only)
GET    /api/organization/units                   - List
POST   /api/organization/units                   - Create
GET    /api/organization/central-directions      - List
POST   /api/organization/central-directions      - Create (admin only)
GET    /api/organization/poles/:poleId/services  - List
POST   /api/organization/pole-services           - Create
```

### Customization par Service
```
GET    /api/service-customizations/:poleServiceId  - List configs
POST   /api/service-customizations                 - Create config
```

### Autres Modules
```
GET    /api/leaves                 - Congés
POST   /api/leaves                 - Demander congé
PATCH  /api/leaves/:id             - Approver/rejeter
GET    /api/formations             - Formations
POST   /api/formations             - Créer formation
GET    /api/documents              - Documents
POST   /api/documents              - Upload
GET    /api/mission-orders         - Ordres de mission
POST   /api/mission-orders         - Créer ordre
PATCH  /api/mission-orders/:id     - Mettre à jour
GET    /api/conversations          - Messagerie
POST   /api/conversations          - Créer conversation
GET    /api/conversations/:id/messages     - Messages
POST   /api/conversations/:id/messages     - Envoyer message
GET    /api/dashboard/stats        - Stats tableau de bord
GET    /api/notifications          - Notifications
GET    /api/erp-communications     - Communications
POST   /api/erp-communications     - Créer communication
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

| Niveau | Rôle | Permissions | Visible en API |
|--------|------|-----------|---|
| 0 | Utilisateur | Consulter ses données, créer demandes | "user" |
| 1 | Superviseur | Valider demandes de ses subordonnés | "manager" |
| 2 | Manager | Gérer son service, valider congés | "manager" |
| 3 | Directeur | Gérer son pôle/direction, approbations | "manager" |
| 4 | Admin | Accès complet, configuration système | "manager" |

**Note: Les niveaux 3 et 4 (Director/Admin) apparaissent comme "manager" dans l'API pour la sécurité**

## Sécurité Avancée

- ✅ Authentification Replit Auth (OpenID Connect)
- ✅ **Validation de pré-registration obligatoire** - Vérification email/nom dans employees
- ✅ Sessions sécurisées en base de données (PostgreSQL)
- ✅ Tokens d'authentification avec refresh
- ✅ Validation Zod sur tous les inputs
- ✅ Contrôle d'accès basé sur rôles (RBAC) granulaire
- ✅ **Masquage des accéditations supremes** - Admin/Director invisibles
- ✅ Logs d'audit complets
- ✅ Messages d'erreur génériques (pas d'exposition d'infos admin)
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
- **Auth**: Replit Auth (OpenID Connect) avec pré-registration validation
- **Domaine personnalisé**: rail-electre-erp.replit.app (configurable)

## Variables d'Environnement Requises

```
DATABASE_URL          - Connection string PostgreSQL
PGHOST, PGPORT, etc.  - Credentials PostgreSQL
SESSION_SECRET        - Secret pour les sessions
ISSUER_URL            - Replit auth issuer URL
REPL_ID               - Replit application ID
```

## Comptes Administrateurs (MASQUÉS)

```
Admin Suprême:
- Email: elganya.anis@gmail.com
- Rôle: Admin (level 4)
- Visible comme: Manager (sécurité)

Director Suprême:
- Email: ilhemlilishka@gmail.com
- Rôle: Director (level 3)
- Visible comme: Manager (sécurité)
```

## Fonctionnalités Avancées Disponibles

- ✅ Pré-registration validation obligatoire
- ✅ Grilles salariales par niveau
- ✅ Indemnités multiples (logement, transport, etc.)
- ✅ Frais de déplacement détaillés
- ✅ Gestion des bénéfices sociaux
- ✅ Dons et prêts aux employés
- ✅ Customization par service (feature flags)
- ✅ Partenaires/Fournisseurs/Sous-traitants
- ✅ Types de projets (publics, gré à gré, sous-traitance)
- ✅ Pôles opérationnels indépendants mais collaboratifs
- ✅ Niveaux d'accréditation masqués pour sécurité
- ✅ Validation d'ordres de mission par hiérarchie
- ✅ Historique complet des actions (audit logs)
- ✅ Synchronisation temps réel (messaging)
- ✅ Rapports et analytics
- ✅ Export de données

## Prochaines Étapes Optionnelles

1. Intégration API SAP/Sage pour comptabilité
2. Module CRM pour clients & opportunités
3. Planning prévisionnel avec IA
4. Application mobile React Native
5. Backup automatique & point-in-time restore
6. Chat vidéo intégré
7. Gestion des stocks avec codes-barres
8. Workflows personnalisables par service
9. BI avancée avec Machine Learning
10. API REST publique documentée
11. Portail RH pour employés (consultation bulletins, demandes de congé, etc.)
12. Dashboard temps réel pour directeurs
13. Alertes et notifications intelligentes
14. Intégration avec systèmes de paie externes

## Support & Documentation

Pour plus d'informations sur:
- **Structure organisationnelle**: Page `/org-structure`
- **Messagerie**: Page `/messaging`
- **Ordres de mission**: Page `/mission-orders`
- **Déplacements**: Page `/travels`
- **RH & Paie**: Pages `/employees`, `/leaves`, `/payroll`
- **Partenaires**: Section Projets
- **Configuration**: Page `/settings`

---

**Dernière Mise à Jour**: 23 Nov 2025
**Version**: 2.0.0
**Statut**: ✅ MVP Complet avec Modules Avancés - Production Ready

**Nouvelles Fonctionnalités v2.0**:
- Pré-registration obligatoire pour sécurité
- Paie avancée (grilles, indemnités, primes, frais)
- Bénéfices sociaux complets
- Module social (dons, prêts)
- Base de données partenaires/fournisseurs
- Types de projets (marchés publics, contrats, sous-traitance)
- Customization par service (indépendance des pôles)
- Emails pour services et directions
- Support multi-pays pour paie
- Accéditations supremes masquées pour sécurité
