# ERP GCF SPA ALGÉRIE - Système de Gestion Intégré V5 COMPLÈTE

## 📋 Structure Officielle du Groupe GCF (Validée J.O. - 24 Novembre 2025)

**Holding d'État à 100%**
- Création : Mai 2024 (Décret CPE n° 184-23/05/2024)
- Siège : Birkhadem, Alger
- Actionnaire : État Algérien
- Président du CA : M. AÏACH Karim
- Directeur Général : M. Samir BOUAKLINE

### 5 Filiales Opérationnelles du Groupe GCF

| Filiale | Code | Spécialité | PDG | Siège | Statut |
|---------|------|-----------|-----|-------|--------|
| **GCF SPA ALGÉRIE** | gcf | Holding Principal | M. AÏACH Karim | Birkhadem, Alger | Holding |
| **RAILELECTR SPA** | railelectr | Électrification ferroviaire, caténaires, métro, tramway | M. HARBI Moulka | Alger | Filiale Active |
| **INFRARAIL SPA** | infrarail | Construction infrastructures ferroviaires, béton, agrégats | M. ROUAINIA Toufik | Rouiba | Filiale Active |
| **INFRAFER (EPE)** | infrafer | Transport routier & ferroviaire (fret, logistique) | M. HAMIDOUCHE M. Lamine | Alger | Filiale Active |
| **SETIRAIL SPA** | setirail | Ingénierie ferroviaire (études, BIM, supervision) | M. TALEB Farouk | Alger | Filiale Active |
| **INFODGE SPA** | infodge | Informatique, développement, R&D, gestion pub, relations | À Nommer | Alger | Filiale Nouvelle (2025) |

---

## 🚀 Architecture V5 COMPLÈTE - Système Ultra-Moderne Sécurisé

### Core Infrastructure
- **Frontend**: React 18 + TypeScript, Shadcn UI, Tailwind CSS, TanStack React Query v5, Wouter routing
- **Backend**: Express.js + Node.js with TypeScript, middleware sécurité avancée, RBAC complet
- **Database**: PostgreSQL (Neon) avec Drizzle ORM, 32+ tables opérationnelles
- **Authentication**: Replit Auth (OpenID Connect) V2 robusté + RBAC 6 niveaux
- **Security**: Isolation multi-tenant, audit logging, encryption E2E
- **Email**: Nodemailer (Templates administratifs algériens)

### Modules Implémentés V5 (COMPLETS)

1. **Multi-Subsidiary Management** ✅
   - 6 ERPs autonomes (GCF Holding + 5 filiales)
   - Sélecteur ERP avec navigation fluide
   - Dashboards rôle-spécifiques par filiale
   - Isolation complète des données
   - Coordination inter-ERPs

2. **RH & Payroll Complet** ✅
   - CNSS 8%, Assurance Chômage 0.5%, IRG progressif (conforme DGI Algeria)
   - Grilles salariales multi-niveaux
   - Allocations familiales, primes, bonuses
   - Ordres de mission (OdM) et frais
   - Ordres de déplacement (OdD) et allocations
   - Congés (annuel, maladie, événements familiaux, sabbatique)
   - Formations professionnelles et éligibilité
   - Calcul automatique multi-filiale
   - Avances et crédits aux employés
   - Cotisations sociales

3. **Gestion de Projets Ultra-Moderne** ✅
   - Gantt charts interactifs avec dépendances
   - Allocation dynamique de ressources
   - Suivi budget vs réalisé
   - KPIs en temps réel
   - Risques et mitigations
   - Jalons et livrables
   - Documentation intégrée

4. **Gestion de Documents Premium** ✅
   - Éditeur texte avancé (TipTap/Prosemirror)
   - Support Excel intégré avec formules
   - Versioning automatique + historique complet
   - Archivage et compliance réglementaire
   - Signature numérique
   - Partage sécurisé par rôle
   - OCR et reconnaissance de documents

5. **Organisation Complète** ✅
   - Directions, Pôles, Services, Unités (hiérarchie 4 niveaux)
   - Organigramme dynamique
   - Permissions RBAC granulaires par structure
   - Positions et responsabilités
   - Turnover tracking

6. **Marchés Publics Intégrés** ✅
   - 7 plateformes algériennes avec liens directs
   - Suivi automatique des appels d'offres
   - Notifications en temps réel
   - Historique des réponses
   - Conformité DCE

7. **Sécurité & Audit** ✅
   - Audit logging complet (qui, quoi, quand, où)
   - Traçabilité des modifications
   - Conformité réglementaire algérienne
   - Backup automatique
   - Encryption des données sensibles

8. **Communication Inter-ERP** ✅
   - Notifications centralisées
   - Messagerie inter-filiales
   - Rapports consolidés
   - Dashboards fédérés

### Sécurité V5 - Architecture Renforcée

#### RBAC System (6 Niveaux)
- **Level 0**: Employé (accès personnel uniquement)
- **Level 1**: Chef de Service (gestion du service)
- **Level 2**: Admin Filiale (administration complète)
- **Level 3**: Directeur (vision stratégique)
- **Level 4**: PDG/CEO (exécutif)
- **Level 5**: Supreme Admin (elganya.anis@gmail.com - accès illimité multi-tenant)

#### Middleware de Sécurité
- `requireAuth`: Validation authentification
- `requireAccreditation(level)`: Contrôle RBAC stricte
- `requireSupremeAdmin`: Accès Supreme Admin uniquement
- `requireSubsidiaryAccess`: Isolation multi-tenant par filiale
- `logAction`: Audit logging pour tous les changements critiques
- `rateLimiting`: Protection contre les abus

#### Architecture Isolée Stricte
- **SessionStorage**: Contexte `selected_erp` isolé
- **Database Filtering**: Queries filtrées par `subsidiary_id` + `poleServiceId`
- **Row-Level Security**: PostgreSQL RLS activé
- **Token Isolation**: JWT scoped par filiale

### UI/UX V5 - Design Premium Ultra-Moderne

#### ERPSelector (Landing Multi-Tenant)
- Grid 6 filiales (GCF + 5) avec gradient unique par couleur
- Supreme Admin badge brillant pour elganya.anis@gmail.com
- Badges statut filiale (Active, Nouvelle, etc.)
- Informations PDG et siège
- Navigation fluide via sessionStorage
- Design responsive (1, 2, 3 colonnes)
- Animations fluides Framer Motion

#### ERPLayout Homogène Premium
- Sidebar collapsible par ERP avec branding
- Header avec user info + déconnexion + changement ERP
- Navigation dynamique selon rôle
- 7 plateformes marchés publics accessibles
- Support dark mode complet et fluide
- Performance optimisée avec React Query caching

#### Pages Modules Complets
- **Dashboard**: Stats personnalisées par rôle (employé/chef/RH/admin/ceo)
- **Employés**: Import Excel, évaluation, formations éligibles
- **Projets**: Gantt, resources, budget tracking
- **Documents**: Éditeurs avancés, versioning, archivage
- **Paie**: Calcul automatique conforme algérien, bulletins de paie
- **OdM & OdD**: Ordres de mission et déplacement
- **Organisation**: Hiérarchie, permissions, turnover
- **Formations**: Tracking, éligibilité, certifications
- **Tenders**: 7 plateformes intégrées
- **Paramètres**: Configuration par filiale et rôle

---

## 🔌 API Endpoints Complètes

**Authentication:**
```
GET  /api/auth/user         # User courant
GET  /api/user/profile      # Profil détaillé + rôle
POST /api/logout            # Déconnexion sécurisée
```

**Data Management:**
```
GET  /api/employees         # Liste employees (filtrée par rôle)
GET  /api/projects          # Projets (filtrés)
GET  /api/documents         # Documents (filtrés)
GET  /api/payroll           # Données paie (RH/Admin only)
GET  /api/formations        # Formations + éligibilité
GET  /api/mission-orders    # Ordres de mission
GET  /api/travels           # Ordres de déplacement
GET  /api/organization/*    # Structure org (filtrée)
```

**Admin:**
```
GET  /api/admin-chat        # Admin communication (Supreme Admin)
POST /api/admin-chat        # Messages admin
GET  /api/subsidiaries      # Toutes filiales (Supreme Admin)
```

---

## 🎯 État Implémentation V5 FINALE (24 Novembre 2025)

### ✅ COMPLET:
- **6 ERPs Autonomes**: GCF + 5 filiales (RAILELECTR, INFRARAIL, INFRAFER, SETIRAIL, INFODGE)
- **Routing V5**: Navigation fluide + auto-redirect /dashboard
- **ERPSelector**: Sélection multi-filiales avec statuts
- **RBAC Complet**: 6 niveaux + rôles spécifiques + filtrage données
- **Dashboards Rôle-Spécifiques**:
  - Employés: Mon espace (formations, OdM, OdD, documents perso)
  - Chef de Service: Vue service (employés, projets, documents service)
  - RH: Tableau de bord RH (paie, formations, congés, OdM/OdD)
  - Admin/Director/CEO: Dashboards exécutifs avec stats complètes
- **Isolation Multi-Tenant**: Complète par filiale + poleService
- **UI Premium**: Design cohérent, dark mode, animations
- **7 Plateformes Marchés Publics**: Intégrées avec liens directs
- **Security**: Audit logging, encryption, rate limiting
- **Error Handling**: Typés et détaillés
- **Documentation**: Complète et à jour

### 🔄 ARCHITECTURE FINALE:
```
GCF Holding (gcf)
├── RAILELECTR SPA (railelectr) - Électrification
├── INFRARAIL SPA (infrarail) - Construction
├── INFRAFER EPE (infrafer) - Transport
├── SETIRAIL SPA (setirail) - Ingénierie
└── INFODGE SPA (infodge) - IT/Dev/R&D

Chaque ERP:
├── Employees + Payroll
├── Projects + Gantt
├── Documents + Versions
├── Formations + Tracking
├── OdM & OdD
├── Organization
├── Tenders
├── Settings
└── Admin (Supreme Admin only)
```

---

## 🌍 Conformité Réglementaire Algérienne

- **Code du Travail Algérien**: RH/Paie conforme
- **CNSS**: Cotisations 8% + Assurance Chômage 0.5%
- **DGI**: IRG progressif + déclarations fiscales
- **Ministère Travaux Publics**: Tracking conformité
- **Conformité Financière**: Audit trails complets
- **Multi-Tenant Security**: Isolation données par filiale
- **Signature Numérique**: Support légal algérien

---

## 🚀 V5 FINALISÉE - PRÊTE PRODUCTION

✅ Architecture ultra-moderne complète
✅ 6 ERPs autonomes avec coordination
✅ RBAC granulaire + filtrage strict
✅ Dashboards rôle-spécifiques intelligents
✅ Tous les modules indispensables
✅ UI/UX premium et responsive
✅ Sécurité entreprise-grade
✅ Conformité réglementaire algérienne
✅ Performance optimisée
✅ Documentation exhaustive

### Performance & Optimisations
- React Query v5 avec caching 5-min
- Lazy loading des modules
- Code splitting automatique
- Hot reload Vite optimisé
- Database indexing complet
- Middleware efficace O(1)
- Compression assets
- CDN-ready architecture

