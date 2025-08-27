# Script de déploiement PowerShell pour TDI CHAUVEAU THIERRY
# Site web de dépannage informatique

Write-Host "🚀 Déploiement du site TDI CHAUVEAU THIERRY" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Vérification des prérequis
Write-Host "📋 Vérification des prérequis..." -ForegroundColor Yellow

# Vérifier si Git est installé
try {
    $gitVersion = git --version
    Write-Host "✅ Git installé : $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git n'est pas installé. Veuillez l'installer d'abord." -ForegroundColor Red
    Write-Host "📥 Téléchargez Git depuis : https://git-scm.com/download/win" -ForegroundColor Cyan
    exit 1
}

# Vérifier le statut Git
Write-Host "🔍 Vérification du statut Git..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Fichiers modifiés détectés :" -ForegroundColor Yellow
    Write-Host $gitStatus -ForegroundColor Gray
    
    # Demander confirmation pour commit
    $response = Read-Host "Voulez-vous commiter ces modifications ? (o/n)"
    if ($response -eq "o" -or $response -eq "O") {
        git add .
        $commitMessage = Read-Host "Message de commit (ou appuyez sur Entrée pour le message par défaut)"
        if (-not $commitMessage) {
            $commitMessage = "Mise à jour du site TDI"
        }
        git commit -m $commitMessage
        Write-Host "✅ Modifications commitées" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Aucune modification en attente" -ForegroundColor Green
}

# Vérifier la configuration du remote
Write-Host "🔗 Vérification de la configuration remote..." -ForegroundColor Yellow
$remotes = git remote -v
if ($remotes -like "*github.com*") {
    Write-Host "✅ Repository GitHub configuré" -ForegroundColor Green
    Write-Host $remotes -ForegroundColor Gray
} else {
    Write-Host "⚠️  Aucun repository GitHub configuré" -ForegroundColor Yellow
    Write-Host "📝 Pour configurer GitHub :" -ForegroundColor Cyan
    Write-Host "1. Créez un repository sur github.com" -ForegroundColor White
    Write-Host "2. Utilisez la commande : git remote add origin <URL>" -ForegroundColor White
    Write-Host "3. Exemple : git remote add origin https://github.com/votre-username/tdi-website.git" -ForegroundColor White
}

# Vérifier Docker (optionnel)
Write-Host "🐳 Vérification de Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker installé : $dockerVersion" -ForegroundColor Green
    Write-Host "🧪 Vous pouvez tester localement avec : docker-compose up -d" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  Docker non installé (optionnel pour le test local)" -ForegroundColor Yellow
    Write-Host "📥 Pour installer Docker : https://docs.docker.com/desktop/install/windows/" -ForegroundColor Cyan
}

# Instructions pour Coolify
Write-Host ""
Write-Host "🌐 Instructions pour le déploiement sur Coolify :" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host "1. ✅ Votre code est prêt et versionné avec Git" -ForegroundColor White
Write-Host "2. 📤 Poussez votre code sur GitHub :" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host "3. 🔗 Connectez votre repository à Coolify" -ForegroundColor White
Write-Host "4. ⚙️  Utilisez le fichier 'coolify.yml' pour la configuration" -ForegroundColor White
Write-Host "5. 🚀 Déployez votre application" -ForegroundColor White

Write-Host ""
Write-Host "📁 Fichiers de configuration créés :" -ForegroundColor Green
Write-Host "- Dockerfile : Configuration Docker" -ForegroundColor White
Write-Host "- nginx.conf : Configuration Nginx" -ForegroundColor White
Write-Host "- docker-compose.yml : Configuration Docker Compose" -ForegroundColor White
Write-Host "- coolify.yml : Configuration Coolify" -ForegroundColor White
Write-Host "- .dockerignore : Exclusion des fichiers" -ForegroundColor White
Write-Host "- deploy.sh : Script de déploiement Linux/Mac" -ForegroundColor White
Write-Host "- deploy.ps1 : Script de déploiement Windows (ce fichier)" -ForegroundColor White
Write-Host "- DEPLOYMENT.md : Guide complet de déploiement" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Configuration Coolify recommandée :" -ForegroundColor Green
Write-Host "- Type : Application" -ForegroundColor White
Write-Host "- Build Pack : Nixpacks" -ForegroundColor White
Write-Host "- Port : 80" -ForegroundColor White
Write-Host "- Commande de démarrage : nginx -g 'daemon off;'" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Votre projet est prêt pour le déploiement !" -ForegroundColor Green
Write-Host "📖 Consultez DEPLOYMENT.md pour plus de détails" -ForegroundColor Cyan

# Attendre l'input de l'utilisateur
Read-Host "Appuyez sur Entrée pour continuer..."
