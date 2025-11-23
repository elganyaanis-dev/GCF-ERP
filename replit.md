# ERP GCF SPA ALGÉRIE - Système de Gestion Intégré V5

## 📋 Structure Officielle du Groupe GCF (Validée J.O. - 24 Novembre 2025)

**Holding d'État à 100%**
- Création : Mai 2024 (Décret CPE n° 184-23/05/2024)
- Siège : Birkhadem, Alger
- Actionnaire : État Algérien
- Président du CA : M. AÏACH Karim
- Directeur Général : M. Samir BOUAKLINE

### 5 Filiales Opérationnelles du Groupe GCF

| Filiale | Code | Spécialité | PDG | Siège |
|---------|------|-----------|-----|-------|
| **RAILELECTR SPA** | railelectr | Électrification ferroviaire, caténaires, métro, tramway | M. HARBI Moulka | Alger |
| **INFRARAIL SPA** | infrarail | Construction infrastructures ferroviaires, béton, agrégats | M. ROUAINIA Toufik | Rouiba |
| **INFRAFER (EPE)** | infrafer | Transport routier & ferroviaire (fret, logistique) | M. HAMIDOUCHE M. Lamine | Alger |
| **SETIRAIL SPA** | setirail | Ingénierie ferroviaire (études, BIM, supervision) | M. TALEB Farouk | Alger |

---

## 🚀 Architecture V5 - Système Premium Sécurisé

### Core Infrastructure
- **Frontend**: React 18 + TypeScript, Shadcn UI, Tailwind CSS, TanStack React Query v5, Wouter routing
- **Backend**: Express.js + Node.js with TypeScript, middleware sécurité avancée
- **Database**: PostgreSQL (Neon) avec Drizzle ORM, 32 tables opérationnelles
- **Authentication**: Replit Auth (OpenID Connect) V2 robusté
- **Security**: RBAC 6 niveaux (0-5 + Supreme Admin), isolation multi-tenant, audit logging
- **Email**: Nodemailer (Templates administratifs algériens)

### Modules Implémentés V5

1. **Multi-Subsidiary Management** ✅
   - 5 ERPs autonomes (GCF + 4 filiales)
   - Sélecteur ERP avec navigation automatique vers /dashboard
   - Dashboards par filiale avec statistiques
   - Isolation complète des données

2. **RH & Payroll** ✅
   - CNSS 8%, Assurance Chômage 0.5%, IRG progressif
   - Grilles salariales & allocations
   - Bonus & incentives
   - Processing multi-filiale

3. **Gestion de Projets** ✅
   - Support Gantt chart
   - Task dependencies & scheduling
   - Progress tracking & ressources allocation
   - Budget integration

4. **Gestion de Documents** ✅
   - Éditeur texte avancé
   - Support Excel intégré
   - Versioning automatique
   - Archivage et compliance

5. **Organisation** ✅
   - Directions, Pôles, Services, Unités
   - Hiérarchie et organigramme
   - Permissions RBAC par structure

6. **Marchés Publics** ✅
   - 7 plateformes algériennes intégrées avec liens directs
   - DZ Tenders, DZ Marchés, Tenders-360, SmartMarchés, MS Marchés, TopTenders, Algérie Marchés

### Sécurité V5 - Architecture Renforcée

#### RBAC System (6 Niveaux)
- **Level 0**: User (employé standard)
- **Level 1**: Manager (responsable équipe)
- **Level 2**: Admin (administrateur filiale)
- **Level 3**: Director (directeur général)
- **Level 4**: CEO (PDG)
- **Level 5**: Supreme Admin (elganya.anis@gmail.com - accès illimité)

#### Middleware de Sécurité
- `requireAuth`: Validation authentification
- `requireAccreditation(level)`: Contrôle RBAC par niveau
- `requireSupremeAdmin`: Accès Supreme Admin uniquement
- `requireSubsidiaryAccess`: Isolation multi-tenant par filiale
- `logAction`: Audit logging pour tous les changements

#### Architecture Isolée
- **SessionStorage**: Stockage `selected_erp` pour isolation
- **Routing Automatique**: Navigation vers /dashboard après sélection ERP
- **Context Protection**: Chaque ERP a son contexte isolé
- **Database Security**: Queries filtrées par `subsidiary_id`

### UI/UX V5 - Design Premium

#### ERPSelector (Landing Multi-Tenant)
- Grid 5 filiales avec gradient par couleur
- Supreme Admin badge visible pour elganya.anis@gmail.com
- Navigation fluide vers ERP après sélection
- Responsive design (1, 2, 3 colonnes)

#### ERPLayout Homogène
- Sidebar unifié par ERP
- Header avec infos filiale
- Navigation cohérente
- 7 plateformes marchés publics dans sidebar
- Support dark mode complet

#### Pages Modules
- Dashboard avec stats temps réel
- Employés avec import Excel
- Projets avec Gantt support
- Documents avec éditeurs
- Paie conforme algérienne
- Organisation avec hiérarchie
- Tenders avec liens directs
- Settings avec configurables

---

## 🔌 API Endpoints Principales

**Authentication:**
```
POST /api/login
GET  /api/auth/user
POST /api/logout
```

**Subsidiaries & Data:**
```
GET  /api/subsidiaries
GET  /api/dashboard/stats
GET  /api/employees
GET  /api/projects
POST /api/generate-payslip
```

**Admin:**
```
GET  /api/admin-chat (Supreme Admin only)
POST /api/admin-chat (Supreme Admin only)
```

---

## 🎯 État Implémentation V5 (23 Novembre 2025)

✅ **Complet:**
- Structure multi-filiale 5 ERPs autonomes
- Routing V5 avec navigation auto vers /dashboard après sélection
- ERPSelector avec sélection fluide
- ERPLayout composant réutilisable homogène
- RBAC 6 niveaux + Supreme Admin
- Middleware de sécurité avancée
- Isolation multi-tenant complète
- 7 plateformes marchés publics intégrées
- UI Premium avec design cohérent
- Dark mode complet
- Error handling avancé

🔄 **Améliorations Récentes:**
- Correction du routing 404 (auto-navigation /dashboard)
- Réorganisation architecture en composants
- Sécurité renforcée avec middleware
- Error handlers typés

---

## 🌍 Conformité Réglementaire

- **Législation Algérienne** : Droit du travail, CNSS, IRG, Assurance Chômage
- **Ministère Travaux Publics** : Tracking conformité & document archival
- **Conformité Financière** : Audit trails, budget adherence
- **Multi-Tenant Security** : Isolation données par filiale

---

## 📁 Structure Fichiers V5

```
client/src/
├── pages/
│   ├── landing.tsx              # Page de login
│   ├── erp-selector.tsx         # Sélecteur multi-filiales
│   ├── erp-dashboard.tsx        # Dashboard autonome
│   ├── erp-employees.tsx        # Gestion RH
│   ├── erp-projects.tsx         # Projets + Gantt
│   ├── erp-documents.tsx        # Documents + Éditeurs
│   ├── erp-payroll.tsx          # Paie conforme
│   ├── erp-organization.tsx     # Organigramme
│   ├── erp-tenders.tsx          # Marchés publics
│   ├── erp-settings.tsx         # Paramètres filiale
│   └── admin-console.tsx        # Admin supreme
├── components/
│   ├── erp-layout.tsx           # Layout réutilisable
│   ├── admin-chat.tsx           # Chat supreme admin
│   ├── header.tsx
│   ├── app-sidebar.tsx
│   └── ui/                      # Shadcn components
└── lib/
    ├── error-handler.ts         # Gestion erreurs typées
    └── queryClient.ts

server/
├── security.ts                  # RBAC + Middleware
├── routes.ts                    # API endpoints
├── auth_v2.ts                   # Auth robusté
└── index.ts                     # Server Express

shared/
└── schema.ts                    # 32 tables DB + types
```

---

## 🔐 Sessions & Persistence

- **SessionStorage**: `selected_erp` (stockage ERP sélectionné)
- **PostgreSQL Sessions**: 7 jours TTL
- **Auto-Redirect**: "/dashboard" après sélection ERP

---

## 🚀 Prêt pour Production - V5 COMPLÈTE ET OPÉRATIONNELLE

✅ Routing auto-navigation /dashboard fonctionnel
✅ 5 ERPs autonomes avec isolation multi-tenant
✅ RBAC 6 niveaux + Supreme Admin (elganya.anis@gmail.com)
✅ Sécurité renforcée avec middleware
✅ Error handling avancé
✅ UI/UX Premium homogène
✅ 7 plateformes marchés publics intégrées
✅ Dark mode complet
✅ Design responsive
✅ Documentation complète

### Performance & Optimisations
- React Query avec caching intelligent
- Hot reload Vite optimisé
- Components légers et réutilisables
- SessionStorage pour navigation rapide
- Middleware efficace

