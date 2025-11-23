# ERP GCF - Système de Gestion Intégré pour Groupe GCF

## Overview
Système ERP complètement restructuré pour supporter le **Groupe GCF** avec ses **4 filiales** (Rail Electr, Infrarail, Citrail, Infrafer). L'ERP intègre gestion RH, projets, paies (conformité algérienne), gestion d'actifs/véhicules (critical pour Rail Electr), budgets, conformité réglementaire (Ministère des Travaux Publics), et communications internes.

## Groupe GCF Structure
```
GCF (Groupe Parent)
├── Rail Electr (rail-elctr) - Project initial
├── Infrarail (infrarail)
├── Citrail (citrail) 
└── Infrafer (infrafer)
```
Chaque filiale a :
- PDG (CEO) propre
- DG (Director General) propre
- Organisation/organigramme indépendant
- 4 pôles opérationnels (Extrême-Est, Ouest, Sud, Centre)
- Services par pôle (Réalisation, Soutien, Achat, Sécurité QHSE)

## User Preferences
- Iterative development with explanations
- Parallel module implementation preferred
- Fast delivery of functional components

## System Architecture

### Core Infrastructure
- **Frontend**: React 18 + TypeScript, Shadcn UI, Tailwind CSS, TanStack React Query v5, Wouter routing, React Hook Form + Zod validation
- **Backend**: Express.js + Node.js with TypeScript
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect) with mandatory pre-registration and RBAC
- **Email**: Nodemailer with SMTP configuration (env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)

### Advanced Modules Implemented
1. **Multi-Subsidiary Management**:
   - Groupe-level dashboard and reporting
   - Subsidiary-specific dashboards
   - Cross-subsidiary project tracking

2. **Asset & Logistics Management** (Critical for Rail Electr):
   - Asset tracking (vehicles, equipment, machinery, buildings)
   - Vehicle management (license plates, fuel types, maintenance scheduling)
   - Capacity tracking (tonnage for freight, passengers)
   - Maintenance schedule automation

3. **Advanced Budget & Financial**:
   - Multi-year budget allocation per subsidiary
   - Budget categories (operational, capital, projects, HR)
   - Real-time budget vs. actual tracking
   - Financial transaction logging

4. **Compliance & Regulations**:
   - Ministry of Public Works compliance tracking
   - Document versioning and archival
   - Compliance item management with due dates
   - Multi-policy support

5. **Payroll (Algerian Legislation)**:
   - CNSS 8%, Assurance Chômage 0.5%, Progressive IRG
   - Salary grids and allowances
   - Bonuses and incentives
   - Multi-subsidiary payroll processing

6. **Project Management with Gantt**:
   - Task dependencies and scheduling
   - Progress tracking
   - Resource allocation
   - Budget integration

7. **HR Management**:
   - Employee lifecycle (hire, assignments, leaves, termination)
   - Formation/training tracking
   - Performance evaluations
   - Organizational hierarchy

8. **Communications**:
   - Direct messaging between employees
   - Group chat for teams/projects
   - System notifications
   - Admin communication console

## Database Schema (New)
- **subsidiaries** - Groupe GCF + 4 filiales
- **users** - Employee accounts with subsidiary assignment
- **employees** - Full HR records with subsidiary context
- **projects** - Project tracking with subsidiary/pole assignment
- **tasks** - Gantt chart support
- **assets** - Equipment and vehicle tracking
- **vehicles** - Rail/transport specific (locomotives, wagons, trucks)
- **budgets** - Budget allocation and tracking
- **transactions** - Financial records
- **complianceItems** - Regulatory requirements
- **poles, poleServices, units** - Organizational hierarchy per subsidiary
- **leaves, payroll, formations** - HR functions
- **documents, conversations, messages** - Content management and communications

## API Endpoints - Subsidiaries & Advanced Features
```
GET  /api/subsidiaries
GET  /api/subsidiaries/:subsidiaryId
GET  /api/subsidiaries/:subsidiaryId/poles
GET  /api/subsidiaries/:subsidiaryId/assets
GET  /api/subsidiaries/:subsidiaryId/vehicles
GET  /api/subsidiaries/:subsidiaryId/budgets
GET  /api/subsidiaries/:subsidiaryId/compliance
GET  /api/dashboard/stats/:subsidiaryId
```

## Key Features by Filiale
### Rail Electr (rail-elctr)
- Electric rail vehicle tracking
- Locomotive and wagon management
- Energy consumption monitoring
- Maintenance scheduling for rolling stock

### Infrarail
- Railway infrastructure projects
- Track maintenance and repairs
- Civil engineering project tracking

### Citrail
- City transportation logistics
- Bus fleet management
- Urban routing and scheduling

### Infrafer
- Steel and infrastructure supplies
- Partner/supplier management
- Material inventory tracking

## Compliance Framework
- **Ministère des Travaux Publics**: Regulatory compliance tracking
- **Algerian Labor Law**: Employee protections and leave types
- **Financial Compliance**: Budget adherence and audit trails
- **Safety Compliance**: QHSE (Security, Health, Safety, Environment)

## Implementation Status
✅ Multi-subsidiary architecture
✅ 4 Filiales (Rail Electr, Infrarail, Citrail, Infrafer) created
✅ Asset & Vehicle management system
✅ Budget & Financial tracking
✅ Compliance management
✅ Advanced payroll (Algerian legislation)
✅ Gantt chart support (tasks, dependencies)
✅ Dashboard by subsidiary
✅ Email templates (Algerian administrative documents)
✅ API endpoints for all major modules

## Pending Enhancements
- Frontend pages for assets, budgets, vehicles
- Gantt chart visualization UI
- Advanced analytics dashboard
- Integration with GIS for location tracking
- Mobile app for field operations

## Environment Configuration
```
DATABASE_URL=postgresql://...
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
SESSION_SECRET=...
```

## Deployment
- Hosted on Replit
- PostgreSQL database (Neon)
- Session management via connect-pg-simple
- Real-time updates via WebSocket (WebSocket component ready)
