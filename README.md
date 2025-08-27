# 🖥️ TDI CHAUVEAU THIERRY - Site Web de Dépannage Informatique

## 📋 Description

Site web professionnel pour **TDI CHAUVEAU THIERRY**, entreprise de dépannage informatique basée à Tigy, Loiret. Le site présente les services, tarifs et informations de contact de l'entreprise.

## 🌟 Fonctionnalités

- **Design moderne et responsive** adapté mobile et desktop
- **Section services** détaillant l'offre de dépannage informatique
- **Tarifs transparents** avec différents forfaits
- **Boutique en ligne** pour l'achat de matériel informatique
- **Système de paiement** intégré PayPal
- **Formulaire de contact** pour les demandes de devis
- **Navigation intuitive** avec menu hamburger mobile

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript vanilla
- **Design** : CSS Grid, Flexbox, Animations CSS
- **Icônes** : Font Awesome 6
- **Polices** : Google Fonts (Poppins)
- **Paiement** : PayPal SDK
- **Responsive** : Design mobile-first

## 🚀 Déploiement

Ce site est configuré pour être déployé sur **Coolify** avec Docker et Nginx.

### Fichiers de configuration :
- `Dockerfile` - Configuration Docker
- `nginx.conf` - Configuration Nginx
- `docker-compose.yml` - Configuration Docker Compose
- `coolify.yml` - Configuration spécifique Coolify
- `deploy.sh` - Script de déploiement automatisé

## 📱 Compatibilité

- ✅ **Desktop** : Chrome, Firefox, Safari, Edge
- ✅ **Mobile** : iOS Safari, Chrome Mobile, Samsung Internet
- ✅ **Tablette** : iPad, Android Tablets
- ✅ **Accessibilité** : Navigation clavier, lecteurs d'écran

## 🔧 Installation locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/tdi-website.git
cd tdi-website

# Tester avec Docker
docker-compose up -d

# Ouvrir dans le navigateur
# http://localhost:80
```

## 📊 Structure du projet

```
tdi-website/
├── index.html              # Page principale
├── styles.css              # Styles principaux
├── css/                    # Fichiers CSS modulaires
│   ├── base.css           # Styles de base
│   ├── hero.css           # Section héro
│   ├── navigation.css     # Navigation
│   ├── sections.css       # Sections de contenu
│   ├── footer.css         # Pied de page
│   └── main.css           # Styles principaux
├── js/                     # Scripts JavaScript
│   ├── main.js            # Script principal
│   ├── navigation.js       # Gestion navigation
│   ├── animations.js       # Animations
│   ├── forms.js            # Gestion formulaires
│   ├── payment.js          # Intégration PayPal
│   └── hardware-shop.js    # Boutique matériel
├── images/                  # Images du site
├── Dockerfile              # Configuration Docker
├── nginx.conf              # Configuration Nginx
├── docker-compose.yml      # Configuration Docker Compose
├── coolify.yml             # Configuration Coolify
├── deploy.sh               # Script de déploiement
└── README.md               # Ce fichier
```

## 🎨 Design

- **Palette de couleurs** : Bleu professionnel (#006994)
- **Typographie** : Poppins (moderne et lisible)
- **Layout** : Grid et Flexbox pour un design responsive
- **Animations** : Transitions CSS fluides
- **Icônes** : Font Awesome pour une cohérence visuelle

## 📞 Contact

**TDI CHAUVEAU THIERRY**
- **Téléphone** : 09 81 82 37 68 / 07 60 89 50 18
- **Email** : tdidepannage.informatique@ik.me
- **Adresse** : 10 rue du moulin, 45510 Tigy, France
- **Horaires** : Lun-Ven 9h-19h, Sam 8h-13h (sur RDV)

## 🔒 Sécurité

- En-têtes de sécurité configurés
- Protection XSS et clickjacking
- Content Security Policy
- Validation des formulaires côté client et serveur

## 📈 Performance

- Compression gzip activée
- Cache configuré pour les ressources statiques
- Images optimisées
- CSS et JS minifiés
- Lazy loading des images

## 🚀 Déploiement sur Coolify

Consultez le fichier `DEPLOYMENT.md` pour un guide complet du déploiement sur Coolify.

## 📄 Licence

© 2025-2026 TDI CHAUVEAU THIERRY. Tous droits réservés.
SIRET : 511.457.186.00043

---

**Développé avec ❤️ pour TDI CHAUVEAU THIERRY**
