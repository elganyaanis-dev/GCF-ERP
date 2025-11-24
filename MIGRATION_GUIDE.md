# 🚀 GUIDE DE MIGRATION - GCF ERP V5 ULTRA PREMIUM

## POUR MIGRER VERS L'APP REPLIT "gcf-erp"

### OPTION 1: CLONER VERS L'APP (PLUS SIMPLE)

1. **Ouvrir l'app Replit "gcf-erp"** depuis votre dashboard
2. **Dans le terminal de cette app, exécuter:**
```bash
# Remplacer l'URL du repo
git remote set-url origin https://github.com/VOTRE_USER/gcf-erp.git
git pull origin main
npm install
```
3. **Cliquer "Run" pour relancer**

---

### OPTION 2: PUSHER CE CODE VERS GITHUB

Si gcf-erp est lié à un repository GitHub:

1. **Configurer le remote:**
```bash
git remote set-url origin https://github.com/VOTRE_USER/gcf-erp.git
```

2. **Pousser le code:**
```bash
git push -u origin main
```

3. **Dans l'app gcf-erp, pullez:**
```bash
git pull origin main
npm install
npm run dev
```

---

## CONTENU MIGRÉS:

✅ **Frontend (client/)** - 12 pages React + Composants Premium
✅ **Backend (server/)** - Express API + Authentication  
✅ **Database** - Schémas Drizzle ORM
✅ **Configuration** - Vite, Tailwind, Drizzle, TypeScript

---

## FEATURES V5 ULTRA PREMIUM:

✅ **6 ERPs Autonomes** (GCF + 5 Filiales)
✅ **12 Pages Complètes** (Dashboard, Employés, Projets, **MISSIONS**, Documents, Paie, etc)
✅ **Design 100% Responsive** (Mobile + PC)
✅ **Gestion Missions** - 4 phases, Tâches, Assignés
✅ **Authentication** - Replit Auth + RBAC 6 niveaux
✅ **Analytics Premium** - KPIs, Dashboards, Reports
✅ **Sidebar Navigation** - Avec bouton "Changer d'ERP"
✅ **Gradients & Animations** - Design professionnel haut de gamme

---

## VARIABLES D'ENVIRONNEMENT À CONFIGURER:

```env
DATABASE_URL=postgresql://...
PGHOST=...
PGPORT=...
PGUSER=...
PGPASSWORD=...
PGDATABASE=...
SESSION_SECRET=votre_secret_session
```

---

## PROCHAINES ÉTAPES APRÈS MIGRATION:

1. ✅ Configurer les variables d'environnement
2. ✅ Tester navigation complète (Dashboard → Missions → ERP Selector)
3. ✅ Vérifier responsive (Mobile + PC)
4. ✅ Tester Authentication & Logout
5. ✅ Publier l'app (Publish button dans Replit)

---

## COMMANDES IMPORTANTES:

```bash
# Développement
npm run dev

# Build production
npm run build

# Vérifier le code
npm run lint

# Tests
npm run test
```

---

**Status:** 🟢 PRÊT POUR MIGRATION
**Dernière mise à jour:** 24 Novembre 2025
