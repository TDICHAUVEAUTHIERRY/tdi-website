#!/bin/bash

# Script de déploiement pour TDI CHAUVEAU THIERRY
# Site web de dépannage informatique

echo "🚀 Déploiement du site TDI CHAUVEAU THIERRY sur Coolify"
echo "=================================================="

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Docker et Docker Compose sont installés"

# Nettoyage des anciens builds
echo "🧹 Nettoyage des anciens builds..."
docker system prune -f
docker-compose down --remove-orphans

# Build de l'image
echo "🔨 Construction de l'image Docker..."
docker-compose build --no-cache

if [ $? -eq 0 ]; then
    echo "✅ Image construite avec succès"
else
    echo "❌ Erreur lors de la construction de l'image"
    exit 1
fi

# Test local
echo "🧪 Test local de l'application..."
docker-compose up -d

# Attendre que le service soit prêt
echo "⏳ Attente du démarrage du service..."
sleep 10

# Vérifier la santé du service
if curl -f http://localhost:80/ > /dev/null 2>&1; then
    echo "✅ Service local fonctionne correctement"
else
    echo "❌ Service local ne répond pas"
    docker-compose logs
    docker-compose down
    exit 1
fi

# Arrêter le service local
docker-compose down

echo ""
echo "🎉 Déploiement local réussi !"
echo ""
echo "📋 Prochaines étapes pour Coolify :"
echo "1. Poussez votre code sur Git (GitHub, GitLab, etc.)"
echo "2. Connectez votre repository à Coolify"
echo "3. Utilisez le fichier 'coolify.yml' pour la configuration"
echo "4. Déployez votre application"
echo ""
echo "🔧 Configuration Coolify :"
echo "- Type d'application : Application"
echo "- Port : 80"
echo "- Build Pack : Nixpacks"
echo "- Commande de démarrage : nginx -g 'daemon off;'"
echo ""
echo "📁 Fichiers créés :"
echo "- Dockerfile : Configuration Docker"
echo "- nginx.conf : Configuration Nginx"
echo "- docker-compose.yml : Configuration Docker Compose"
echo "- .dockerignore : Exclusion des fichiers"
echo "- coolify.yml : Configuration Coolify"
echo "- deploy.sh : Script de déploiement"
echo ""
echo "🌐 Votre site sera accessible sur le port 80"
echo "🔒 Nginx est configuré avec des en-têtes de sécurité"
echo "⚡ Compression gzip activée pour de meilleures performances"
echo "💾 Cache configuré pour les ressources statiques"
