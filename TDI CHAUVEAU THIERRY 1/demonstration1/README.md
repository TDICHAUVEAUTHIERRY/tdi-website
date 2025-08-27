# TDI CHAUVEAU THIERRY - Site de Dépannage Informatique

## 📁 Structure du Projet

Ce projet utilise une architecture modulaire pour optimiser la maintenance et les performances.

### 🎨 Structure CSS

```
css/
├── base.css          # Variables CSS, reset, typographie, boutons
├── navigation.css    # Styles de la navigation et header
├── hero.css          # Styles de la section d'accueil
├── sections.css      # Styles des sections (services, avantages, tarifs, contact)
├── footer.css        # Styles du footer
├── main.css          # Fichier principal avec imports (optionnel)
└── styles.css        # Fichier concaténé pour production
```

### ⚡ Structure JavaScript

```
js/
├── core.js           # Fonctions utilitaires de base
├── navigation.js     # Gestion de la navigation et menu mobile
├── animations.js     # Gestion des animations et effets visuels
├── forms.js          # Gestion des formulaires et validation
├── main.js           # Fichier principal avec imports (optionnel)
└── script.js         # Fichier concaténé pour production
```

### 🖼️ Dossier Images

```
images/               # Images et ressources graphiques
```

## 🚀 Utilisation

### Pour le Développement

Utilisez les fichiers modulaires séparés pour une meilleure organisation :

```html
<!-- CSS modulaire -->
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/navigation.css">
<link rel="stylesheet" href="css/hero.css">
<link rel="stylesheet" href="css/sections.css">
<link rel="stylesheet" href="css/footer.css">

<!-- JavaScript modulaire -->
<script src="js/core.js"></script>
<script src="js/navigation.js"></script>
<script src="js/animations.js"></script>
<script src="js/forms.js"></script>
<script src="js/main.js"></script>
```

### Pour la Production

Utilisez les fichiers concaténés pour de meilleures performances :

```html
<!-- CSS concaténé -->
<link rel="stylesheet" href="styles.css">

<!-- JavaScript concaténé -->
<script src="script.js"></script>
```

## 🔧 Fonctionnalités

### Navigation
- Menu hamburger responsive
- Navigation sticky avec effet de transparence
- Smooth scroll pour les liens d'ancrage

### Animations
- Animations au scroll avec Intersection Observer
- Effets de hover sur les cartes
- Parallaxe léger sur la section hero
- Éléments flottants animés

### Formulaires
- Validation en temps réel
- Gestion des erreurs avec feedback visuel
- Accessibilité améliorée (ARIA, labels)
- Simulation d'envoi avec états de chargement

### Performance
- Lazy loading des images
- Debounce sur les événements de scroll
- Optimisations pour navigateurs anciens
- Gestion des erreurs globales

## 🎯 Avantages de l'Architecture Modulaire

### ✅ Maintenance
- Code organisé par fonctionnalité
- Modification facile d'un module spécifique
- Réutilisation possible des modules

### ✅ Performance
- Chargement conditionnel des modules
- Fichiers concaténés pour la production
- Optimisation du cache navigateur

### ✅ Développement
- Travail en équipe facilité
- Tests unitaires possibles par module
- Débogage simplifié

### ✅ Compatibilité
- Fallbacks pour navigateurs anciens
- Détection automatique des fonctionnalités
- Graceful degradation

## 📱 Responsive Design

Le site est entièrement responsive avec :
- Design mobile-first
- Breakpoints : 480px, 768px, 1200px
- Menu hamburger pour mobile
- Adaptations des animations selon l'écran

## 🌈 Palette de Couleurs

```css
--primary-color: #006994      /* Bleu océan principal */
--primary-dark: #004d6b       /* Bleu océan foncé */
--secondary-color: #00b4d8    /* Bleu océan clair */
--accent-color: #90e0ef       /* Bleu accent */
--text-dark: #1e3a5f         /* Texte principal */
--text-light: #6b7280        /* Texte secondaire */
```

## 🔍 Optimisations

### CSS
- Variables CSS pour la cohérence
- Animations optimisées avec transform/opacity
- Media queries organisées par composant

### JavaScript
- Classes ES6 pour l'organisation
- Gestion des événements optimisée
- Lazy loading et debouncing
- Gestion d'erreurs robuste

## 📋 Scripts de Build (Optionnels)

Pour automatiser la concaténation, vous pouvez utiliser :

### Avec Node.js
```bash
npm install -g concat
concat -o styles.css css/*.css
concat -o script.js js/*.js
```

### Avec Gulp
```bash
npm install -g gulp-cli
npm install
gulp build
```

### Avec Webpack
```bash
npm install
npm run build
```

## 🚀 Déploiement

1. **Développement** : Utilisez les fichiers modulaires
2. **Tests** : Vérifiez sur différents navigateurs
3. **Production** : Utilisez les fichiers concaténés
4. **Optimisation** : Minifiez les fichiers CSS/JS
5. **Cache** : Configurez les en-têtes de cache

## 📞 Support

Pour toute question ou problème :
- Vérifiez la console du navigateur
- Consultez les logs dans le code
- Testez module par module

---

**TDI CHAUVEAU THIERRY** - Dépannage Informatique Professionnel
*Site optimisé et modulaire pour une maintenance facile*
