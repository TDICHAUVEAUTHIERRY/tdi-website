# 🚀 Guide de Déploiement sur Coolify

## TDI CHAUVEAU THIERRY - Site Web de Dépannage Informatique

Ce guide vous accompagne dans le déploiement de votre site web sur Coolify.

## 📋 Prérequis

- Un compte Coolify configuré
- Votre code source sur un repository Git (GitHub, GitLab, etc.)
- Un domaine configuré (optionnel mais recommandé)

## 🔧 Configuration Locale

### 1. Test Local avec Docker

Avant de déployer sur Coolify, testez votre application localement :

```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Exécuter le script de déploiement
./deploy.sh
```

### 2. Test Manuel

```bash
# Construire l'image
docker-compose build

# Démarrer le service
docker-compose up -d

# Vérifier que le site fonctionne
curl http://localhost:80/

# Arrêter le service
docker-compose down
```

## 🌐 Déploiement sur Coolify

### Étape 1 : Préparer le Repository

1. **Poussez votre code sur Git** :
   ```bash
   git add .
   git commit -m "Configuration pour Coolify"
   git push origin main
   ```

2. **Vérifiez que ces fichiers sont présents** :
   - `Dockerfile`
   - `nginx.conf`
   - `coolify.yml`
   - `.dockerignore`

### Étape 2 : Configuration Coolify

1. **Connectez-vous à votre instance Coolify**

2. **Créez une nouvelle application** :
   - Cliquez sur "New Application"
   - Sélectionnez votre repository Git
   - Choisissez la branche `main`

3. **Configuration de l'application** :
   - **Type** : Application
   - **Build Pack** : Nixpacks
   - **Port** : 80
   - **Expose Port** : 80

4. **Variables d'environnement** :
   ```
   NODE_ENV=production
   NGINX_HOST=0.0.0.0
   NGINX_PORT=80
   ```

5. **Commande de démarrage** :
   ```
   nginx -g "daemon off;"
   ```

### Étape 3 : Déploiement

1. **Cliquez sur "Deploy"**
2. **Attendez la fin du build**
3. **Vérifiez que l'application démarre**

## 🔒 Configuration SSL/HTTPS

Pour activer HTTPS sur Coolify :

1. **Dans les paramètres de l'application** :
   - Activez "Force HTTPS"
   - Configurez votre domaine personnalisé

2. **Configuration des labels Traefik** (déjà dans `coolify.yml`) :
   ```yaml
   labels:
     - "traefik.enable=true"
     - "traefik.http.routers.tdi-website.rule=Host(`votre-domaine.com`)"
     - "traefik.http.routers.tdi-website.entrypoints=web"
   ```

## 📊 Monitoring et Logs

### Logs de l'application :
- Accédez aux logs via l'interface Coolify
- Ou utilisez : `docker logs <container-id>`

### Métriques :
- Utilisation CPU et mémoire
- Trafic réseau
- Temps de réponse

## 🚨 Dépannage

### Problèmes courants :

1. **Application ne démarre pas** :
   - Vérifiez les logs dans Coolify
   - Vérifiez que le port 80 est libre
   - Vérifiez la configuration Nginx

2. **Erreur de build** :
   - Vérifiez que tous les fichiers sont présents
   - Vérifiez la syntaxe du Dockerfile
   - Vérifiez les permissions des fichiers

3. **Site accessible mais CSS/JS cassés** :
   - Vérifiez les chemins dans `index.html`
   - Vérifiez la configuration Nginx pour les fichiers statiques

### Commandes de débogage :

```bash
# Vérifier les logs du container
docker logs <container-id>

# Accéder au container
docker exec -it <container-id> sh

# Vérifier la configuration Nginx
docker exec -it <container-id> nginx -t

# Redémarrer le service
docker-compose restart
```

## 🔄 Mises à jour

Pour mettre à jour votre site :

1. **Modifiez votre code local**
2. **Testez avec Docker Compose** :
   ```bash
   ./deploy.sh
   ```
3. **Poussez sur Git** :
   ```bash
   git add .
   git commit -m "Mise à jour du site"
   git push origin main
   ```
4. **Redéployez sur Coolify** (automatique ou manuel)

## 📱 Configuration Mobile

Votre site est déjà optimisé pour mobile avec :
- Design responsive
- Meta viewport configuré
- CSS adaptatif
- Navigation mobile

## 🎯 Optimisations

### Performance :
- Compression gzip activée
- Cache configuré pour les ressources statiques
- Images optimisées
- CSS et JS minifiés

### Sécurité :
- En-têtes de sécurité configurés
- Protection XSS
- Protection contre le clickjacking
- Content Security Policy

## 📞 Support

En cas de problème :
1. Vérifiez les logs dans Coolify
2. Consultez la documentation Coolify
3. Testez localement avec Docker
4. Vérifiez la configuration des fichiers

## 🎉 Félicitations !

Votre site TDI CHAUVEAU THIERRY est maintenant prêt pour le déploiement sur Coolify !

---

**Note** : Ce guide est spécifique à votre site. Adaptez les paramètres selon vos besoins (domaine, SSL, etc.).
