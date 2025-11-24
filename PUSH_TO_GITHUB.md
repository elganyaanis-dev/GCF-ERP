# 🚀 POUSSER LE CODE VERS LE REPO GITHUB "gcf-erp"

## ⚠️ IMPORTANT: LE CODE EST PRÊT LOCALEMENT MAIS DOIT ÊTRE POUSSÉ VERS GITHUB

### ÉTAPE 1: OUVRIR LE TERMINAL REPLIT

1. Cliquez sur "Shell" ou ouvrez le terminal
2. Vous êtes maintenant dans `/home/runner/workspace`

### ÉTAPE 2: CONFIGURER LE REPO GITHUB

```bash
# REMPLACEZ: https://github.com/VOTRE_USER/gcf-erp.git
# par l'URL RÉELLE de votre repo GitHub

git remote set-url origin https://github.com/VOTRE_USER/gcf-erp.git
```

### ÉTAPE 3: POUSSER LE CODE VERS GITHUB

```bash
# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Add complete GCF ERP V5 Ultra Premium system with 12 pages, 6 ERPs, Missions management, and responsive design"

# Pousser vers GitHub (principal)
git push -u origin main
```

### ÉTAPE 4: VÉRIFIER SUR GITHUB

1. Allez sur https://github.com/VOTRE_USER/gcf-erp
2. Vous devriez voir tous les fichiers

### ÉTAPE 5: DANS L'APP REPLIT "gcf-erp"

Une fois que le code est sur GitHub:

```bash
# Dans le terminal de l'app gcf-erp
git pull origin main
npm install
npm run dev
```

---

## FICHIERS QUI SERONT POUSSÉS:

✅ client/ (12 pages React complètes)
✅ server/ (Backend Express + 40+ API endpoints)
✅ shared/ (Schemas Zod)
✅ public/ (Assets statiques)
✅ Configuration complète (vite, tailwind, drizzle, etc)

## TOTAL: 110+ fichiers source

---

## SI VOUS N'AVEZ PAS D'URL GITHUB:

1. Créez un repo vide sur GitHub
2. Copiez l'URL HTTPS (ex: https://github.com/VOTRE_USER/gcf-erp.git)
3. Remplacez dans la commande git remote set-url

---

## PROBLÈME AVEC .git/index.lock?

Si vous avez une erreur `.git/index.lock`:

```bash
rm -f .git/index.lock
git status
```

Puis retry les commandes ci-dessus.
