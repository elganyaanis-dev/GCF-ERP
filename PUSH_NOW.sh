#!/bin/bash

# Script pour pousser le code GCF ERP vers GitHub
# Exécutez: bash PUSH_NOW.sh

set -e

echo "🚀 PUSHING GCF ERP V5 ULTRA PREMIUM TO GITHUB..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Configuration du remote
echo "1️⃣  Configurant le remote GitHub..."
git remote set-url origin https://github.com/elganyaanis-dev/gcf-erp.git

# Vérifier le status
echo "2️⃣  Status du repo..."
git status

# Ajouter tous les fichiers
echo "3️⃣  Ajoutant tous les fichiers..."
git add .

# Commit
echo "4️⃣  Créant le commit..."
git commit -m "Add GCF ERP V5 Ultra Premium: 12 pages, 6 ERPs, Missions management, 100% responsive design, 40+ API endpoints"

# Push vers GitHub
echo "5️⃣  Poussant vers GitHub..."
git push -u origin main

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ PUSH TERMINÉ!"
echo ""
echo "Vérifiez sur: https://github.com/elganyaanis-dev/gcf-erp"
echo ""
echo "Ensuite, dans l'app Replit 'gcf-erp':"
echo "  git pull origin main"
echo "  npm install"
echo "  npm run dev"
