# Utiliser l'image officielle Nginx Alpine (plus légère)
FROM nginx:alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Créer le répertoire pour le site
RUN mkdir -p /var/www/html

# Copier tous les fichiers du site
COPY . /var/www/html/

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
