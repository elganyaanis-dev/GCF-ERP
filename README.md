# GCF ERP - Système de Gestion Intégré

## 📋 Vue d'ensemble

**GCF ERP** est un système de gestion d'entreprise (ERP) complet et moderne conçu pour le **Groupe GCF SPA Algérie** et ses 4 filiales opérationnelles. Bâti avec les technologies web les plus récentes, il offre une solution scalable pour la gestion intégrée RH, financière, logistique et projets.

### Structure Officielle du Groupe GCF
```
GCF SPA ALGÉRIE (Holding d'État)
├── RAILELECTR SPA - Électrification ferroviaire
├── INFRARAIL SPA - Infrastructures ferroviaires
├── INFRAFER EPE - Transport routier & ferroviaire
└── SETIRAIL SPA - Ingénierie ferroviaire
```

---

## 🚀 Caractéristiques Principales

### 1. **Multi-Subsidiary Management**
- Tableau de bord groupe avec reporting croisé
- Gestion indépendante de chaque filiale
- Vue consolidée des statistiques groupes

### 2. **Gestion des Ressources Humaines**
- Gestion complète du cycle de vie des employés
- Suivi des congés (conforme législation algérienne)
- Formations et développement professionnel
- Évaluations de performance

### 3. **Paie Algérienne Conforme**
- CNSS: 8%
- Assurance Chômage: 0.5%
- IRG progressif selon grilles salariales
- Bonus et allocations
- Génération automatique des fiches de paie

### 4. **Gestion d'Actifs & Logistique**
- Suivi des véhicules (locomotives, wagons, camions, bus)
- Gestion des équipements et machinerie
- Planification des maintenances
- Tracking capacités (tonnage, passagers)

### 5. **Gestion Budgétaire & Financière**
- Allocations budgets multi-années par filiale
- Catégories: opérationnel, capital, projets, RH
- Suivi budget vs réel en temps réel
- Logging transactions financières
- Audit trails complets

### 6. **Gestion de Projets avec Gantt**
- Création et suivi des tâches
- Dépendances entre tâches
- Planification avec calendrier Gantt
- Allocation des ressources
- Intégration budgets

### 7. **Conformité & Régulations**
- Tracking conformité Ministère des Travaux Publics
- Gestion des documents avec versioning
- Archival réglementaire
- Respect de la QHSE (Sécurité, Santé, Environnement)

### 8. **Communications**
- Messagerie interne entre employés
- Chats de groupes par projets/équipes
- Notifications système
- Console administrative

### 9. **Gestion des Missions & Déplacements**
- Ordres de mission
- Suivi des déplacements
- Frais de mission

---

## 🏗️ Architecture Technique

### Frontend
- **Framework**: React 18 + TypeScript
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query v5
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js avec TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **Email**: Nodemailer
- **Sessions**: connect-pg-simple
- **WebSockets**: WebSocket (ready for real-time)

### Base de Données
- **31 tables PostgreSQL** organisées par domaine
- Drizzle schema avec migrations sûres
- Support Gantt chart (dépendances, durées)
- Compliance tracking multi-niveaux

---

## 📦 Installation

### Prérequis
- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### Setup Local

```bash
# Cloner le repository
git clone https://github.com/yourusername/gcf-erp.git
cd gcf-erp

# Installer les dépendances
npm install

# Configuration des variables d'environnement
cp .env.example .env

# Remplir .env avec:
DATABASE_URL=postgresql://user:pass@host:port/gcf_erp
SESSION_SECRET=your_session_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Migrer la base de données
npm run db:push

# Démarrer en développement
npm run dev
```

L'application sera disponible sur `http://localhost:5000`

---

## 🔌 API Endpoints

### Subsidiaires & Groupe
```
GET  /api/subsidiaries                           # Liste toutes les filiales
GET  /api/subsidiaries/:subsidiaryId             # Filiale spécifique
GET  /api/subsidiaries/:subsidiaryId/poles       # Pôles d'une filiale
GET  /api/subsidiaries/:subsidiaryId/assets      # Actifs
GET  /api/subsidiaries/:subsidiaryId/vehicles    # Véhicules
GET  /api/subsidiaries/:subsidiaryId/budgets     # Budgets
GET  /api/subsidiaries/:subsidiaryId/compliance  # Conformité
GET  /api/dashboard/stats/:subsidiaryId          # Statistiques
```

### Ressources Humaines
```
GET  /api/employees                              # Liste employés
POST /api/generate-payslip                       # Générer fiche de paie
GET  /api/document-templates                     # Templates administratifs
POST /api/send-email                             # Envoyer email
```

### Projets & Tâches
```
GET  /api/projects                               # Liste projets
GET  /api/projects/:projectId/tasks              # Tâches d'un projet
POST /api/tasks                                  # Créer tâche
PATCH /api/tasks/:taskId                         # Mettre à jour tâche
```

### Documents
```
GET  /api/documents                              # Liste documents
POST /api/documents                              # Uploader document
GET  /api/documents/:documentId/versions         # Versions d'un document
```

---

## 📊 Schéma Base de Données

### Tables Principales
- **subsidiaries** - 5 filiales (GCF + 4 opérationnelles)
- **users** - Comptes utilisateurs
- **employees** - Données RH complètes
- **projects** - Projets par filiale
- **tasks** - Tâches avec support Gantt
- **assets** - Actifs (équipements, véhicules)
- **vehicles** - Gestion détaillée des véhicules
- **budgets** - Allocations et suivi
- **transactions** - Mouvements financiers
- **complianceItems** - Conformité réglementaire
- **leaves** - Congés employés
- **payroll** - Fiches de paie
- **formations** - Formations et trainings
- **documents** - Gestion documentaire avec versioning
- **messages** - Messagerie interne
- **conversations** - Chats de groupe

---

## 🔐 Authentification & Sécurité

### Authentification
- **OAuth via Replit Auth** (OpenID Connect)
- **Role-Based Access Control (RBAC)** - 6 niveaux d'accréditation (0-5)
- **Supreme Admin**: elganya.anis@gmail.com (préconfiguré)
- **Pre-registration** requise pour nouvel accès
- **Session Management** via PostgreSQL + connect-pg-simple

### Sécurité
- ✅ Variables d'environnement pour tous secrets
- ✅ Audit logging de toutes actions
- ✅ HTTPS obligatoire en production
- ✅ Validation Zod de tous inputs
- ✅ Prepared statements (Drizzle ORM)
- ✅ CORS configuré

---

## 🎯 Modules Disponibles

| Module | Status | Description |
|--------|--------|-------------|
| Tableau de Bord | ✅ Complete | Vue d'ensemble groupe & filiales |
| Groupe GCF | ✅ Complete | Structure officielle 5 filiales |
| RH & Paie | ✅ Complete | Employés, congés, paie DZ |
| Projets | ✅ Complete | Gestion avec Gantt support |
| Documents | ✅ Complete | Versioning, archival, templates |
| Actifs & Véhicules | ✅ Complete | Tracking logistique complet |
| Budgets | ✅ Complete | Multi-filiale, suivi temps réel |
| Conformité | ✅ Complete | Ministère Travaux Publics |
| Messagerie | ✅ Complete | Chat interne & notifications |
| Admin Console | ✅ Complete | Gestion système |
| Analytics | 🟡 Partial | Dashboards avancés |
| Mobile | 🔄 Planned | App React Native |

---

## 📱 Responsive Design

✅ Desktop (1920px+)
✅ Laptop (1366px)
✅ Tablet (768px)
✅ Mobile (320px+)

Toutes les pages sont **fully responsive** avec Tailwind CSS.

---

## 🧪 Tests

```bash
# Vérifier la compilation TypeScript
npm run check

# Build production
npm run build

# Démarrer en production
npm run start
```

---

## 📝 Templates Administratifs

4 templates Algériens disponibles:
1. **Fiche de Paie** - Conforme législation DZ
2. **Attestation de Travail** - Format officiel
3. **Ordre de Service** - Gestion missions
4. **Certificat d'Adhésion** - CNSS & sociales

Tous générables via API `/api/send-email`

---

## 🌍 Conformité Algérienne

### Législation du Travail
- ✅ Types de congés légaux
- ✅ Protections employés
- ✅ Droits syndicaux

### Finances
- ✅ CNSS 8% + Chômage 0.5% + IRG progressif
- ✅ Audit trails complets
- ✅ Conformité budget

### Ministère Travaux Publics
- ✅ Tracking conformité réglementaire
- ✅ Document archival
- ✅ Reporting compliance

### QHSE
- ✅ Sécurité au travail
- ✅ Santé des employés
- ✅ Environnement

---

## 📈 Performance

- ⚡ **Frontend**: React Query caching + code splitting
- ⚡ **Backend**: Connection pooling PostgreSQL
- ⚡ **Database**: Indexes sur colonnes fréquentes
- ⚡ **CDN Ready**: Assets statiques optimisés
- ⚡ **Gzip**: Compression automatique

---

## 🚀 Deployment

### Replit (Current)
```bash
npm run build
npm run start
```

### Docker
```bash
docker build -t gcf-erp .
docker run -p 5000:5000 gcf-erp
```

### Production Checklist
- [ ] Configurer variables d'env production
- [ ] Backups PostgreSQL activés
- [ ] HTTPS/TLS configuré
- [ ] CDN configuré
- [ ] Monitoring actif
- [ ] Logs centralisés
- [ ] SMTP email configuré
- [ ] Alertes configurées

---

## 🤝 Contribution

Les contributions sont bienvenues! Pour les changements majeurs:

1. Fork le repository
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📞 Support

Pour les questions ou bugs:
- 📧 Email: support@gcf.dz
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

## 📜 License

MIT License - voir [LICENSE](LICENSE) pour détails

---

## 🎓 Ressources

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [React Query Docs](https://tanstack.com/query)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)

---

**Version**: 1.0.0  
**Dernière mise à jour**: 24 Novembre 2025  
**Statut**: Production Ready ✅
