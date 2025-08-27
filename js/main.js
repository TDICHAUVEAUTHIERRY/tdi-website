/* ===== TDI CHAUVEAU THIERRY - MAIN JAVASCRIPT ===== */
/* Ce fichier initialise tous les modules JavaScript */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialiser les utilitaires de base
    if (typeof TDIUtils === 'undefined') {
        console.warn('TDIUtils non disponible, chargement des utilitaires de base...');
        // Charger les utilitaires de base si ils ne sont pas disponibles
        loadCoreUtilities();
    }
    
    // Initialiser tous les modules
    initializeModules();
    
    // Configuration globale
    setupGlobalConfig();
    
    // Initialisation terminée
    console.log('TDI CHAUVEAU THIERRY - Application initialisée avec succès !');
    
    // Événements de fin de chargement
    window.addEventListener('load', function() {
        console.log('TDI CHAUVEAU THIERRY - Page entièrement chargée !');
        
        // Masquer le loader si il existe
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    });
});

// Fonction pour charger les utilitaires de base si nécessaire
function loadCoreUtilities() {
    // Définir les utilitaires de base si ils ne sont pas chargés
    window.TDIUtils = {
        showNotification: function(message, type = 'info') {
            alert(`${type.toUpperCase()}: ${message}`);
        },
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    };
}

// Fonction pour initialiser tous les modules
function initializeModules() {
    try {
        // Vérifier que tous les modules sont disponibles
        if (typeof NavigationManager === 'undefined') {
            console.warn('NavigationManager non disponible');
        }
        
        if (typeof AnimationManager === 'undefined') {
            console.warn('AnimationManager non disponible');
        }
        
        if (typeof FormManager === 'undefined') {
            console.warn('FormManager non disponible');
        }
        
        // Initialiser les modules disponibles
        if (typeof window.navigationManager === 'undefined') {
            console.log('Initialisation du gestionnaire de navigation...');
            // Le module sera initialisé automatiquement via son propre fichier
        }
        
        if (typeof window.animationManager === 'undefined') {
            console.log('Initialisation du gestionnaire d\'animations...');
            // Le module sera initialisé automatiquement via son propre fichier
        }
        
        if (typeof window.formManager === 'undefined') {
            console.log('Initialisation du gestionnaire de formulaires...');
            // Le module sera initialisé automatiquement via son propre fichier
        }
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des modules:', error);
    }
}

// Fonction pour configurer les paramètres globaux
function setupGlobalConfig() {
    // Configuration des performances
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Optimisations à effectuer quand le navigateur est inactif
            optimizePerformance();
        });
    }
    
    // Configuration de l'accessibilité
    setupAccessibility();
    
    // Configuration des erreurs globales
    setupErrorHandling();
}

// Fonction pour optimiser les performances
function optimizePerformance() {
    // Désactiver les animations si l'utilisateur préfère moins de mouvement
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (window.animationManager) {
            window.animationManager.toggleAnimations(false);
        }
    }
    
    // Lazy loading des images
    if (window.TDIUtils && window.TDIUtils.lazyLoadImages) {
        window.TDIUtils.lazyLoadImages();
    }
    
    // Gestion des erreurs d'images
    if (window.TDIUtils && window.TDIUtils.handleImageErrors) {
        window.TDIUtils.handleImageErrors();
    }
}

// Fonction pour configurer l'accessibilité
function setupAccessibility() {
    // Améliorer la navigation au clavier
    document.addEventListener('keydown', function(e) {
        // Navigation avec Tab
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Détecter la navigation à la souris
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Améliorer le focus pour l'accessibilité
    document.querySelectorAll('button, a, input, select, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #90e0ef';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Fonction pour gérer les erreurs globales
function setupErrorHandling() {
    // Gestion des erreurs JavaScript
    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript:', e.error);
        
        // Envoyer l'erreur à un service de monitoring si nécessaire
        // sendErrorToMonitoring(e.error);
    });
    
    // Gestion des promesses rejetées
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Promesse rejetée:', e.reason);
        
        // Envoyer l'erreur à un service de monitoring si nécessaire
        // sendErrorToMonitoring(e.reason);
    });
}

// Fonction pour vérifier la compatibilité du navigateur
function checkBrowserCompatibility() {
    const features = {
        es6: typeof Promise !== 'undefined',
        intersectionObserver: typeof IntersectionObserver !== 'undefined',
        fetch: typeof fetch !== 'undefined',
        localStorage: typeof localStorage !== 'undefined'
    };
    
    const unsupportedFeatures = Object.keys(features).filter(feature => !features[feature]);
    
    if (unsupportedFeatures.length > 0) {
        console.warn('Fonctionnalités non supportées:', unsupportedFeatures);
        
        // Afficher un message d'avertissement si nécessaire
        if (unsupportedFeatures.includes('es6')) {
            showBrowserWarning();
        }
    }
    
    return features;
}

// Fonction pour afficher un avertissement de navigateur
function showBrowserWarning() {
    const warning = document.createElement('div');
    warning.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #f59e0b;
        color: white;
        padding: 1rem;
        text-align: center;
        z-index: 10001;
        font-size: 0.875rem;
    `;
    warning.innerHTML = `
        ⚠️ Votre navigateur est ancien. Certaines fonctionnalités peuvent ne pas fonctionner correctement. 
        <a href="https://browsehappy.com/" target="_blank" style="color: white; text-decoration: underline;">Mettre à jour</a>
    `;
    
    document.body.appendChild(warning);
    
    // Supprimer l'avertissement après 10 secondes
    setTimeout(() => {
        if (warning.parentNode) {
            warning.remove();
        }
    }, 10000);
}

// Vérifier la compatibilité au chargement
document.addEventListener('DOMContentLoaded', function() {
    checkBrowserCompatibility();
});

// Exposer les fonctions principales globalement pour le débogage
window.TDIMain = {
    checkBrowserCompatibility,
    optimizePerformance,
    setupAccessibility,
    setupErrorHandling
};
