/* ===== TDI CHAUVEAU THIERRY - MAIN JAVASCRIPT OPTIMISÉ MOBILE ===== */
/* Ce fichier initialise tous les modules JavaScript avec optimisations mobile */

// Configuration de performance mobile
const MOBILE_CONFIG = {
    isMobile: window.innerWidth <= 768,
    isLowPerformance: false,
    debounceDelay: 150,
    animationThreshold: 0.2
};

// Détection de performance
function detectPerformance() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isOldDevice = /android [1-6]|iphone os [1-9]|ipad os [1-9]/i.test(userAgent);
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const hasSlowConnection = navigator.connection && navigator.connection.effectiveType === 'slow-2g';
    
    MOBILE_CONFIG.isLowPerformance = MOBILE_CONFIG.isMobile || isOldDevice || hasLowMemory || hasSlowConnection;
    
    if (MOBILE_CONFIG.isLowPerformance) {
        MOBILE_CONFIG.debounceDelay = 300;
        MOBILE_CONFIG.animationThreshold = 0.3;
    }
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Détecter la performance de l'appareil
    detectPerformance();
    
    // Initialiser les utilitaires de base
    if (typeof TDIUtils === 'undefined') {
        console.warn('TDIUtils non disponible, chargement des utilitaires de base...');
        loadCoreUtilities();
    }
    
    // Initialiser tous les modules avec délai pour mobile
    if (MOBILE_CONFIG.isMobile) {
        // Délai d'initialisation pour mobile
        setTimeout(() => {
            initializeModules();
            setupGlobalConfig();
        }, 100);
    } else {
        initializeModules();
        setupGlobalConfig();
    }
    
    // Initialisation terminée
    console.log(`TDI CHAUVEAU THIERRY - Application initialisée (Mobile: ${MOBILE_CONFIG.isMobile}, Performance: ${MOBILE_CONFIG.isLowPerformance ? 'Faible' : 'Normale'})`);
    
    // Événements de fin de chargement optimisés
    window.addEventListener('load', function() {
        console.log('TDI CHAUVEAU THIERRY - Page entièrement chargée !');
        
        // Masquer le loader si il existe
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
        
        // Optimisations post-chargement pour mobile
        if (MOBILE_CONFIG.isMobile) {
            optimizeForMobile();
        }
    });
});

// Fonction pour charger les utilitaires de base si nécessaire
function loadCoreUtilities() {
    // Définir les utilitaires de base optimisés pour mobile
    window.TDIUtils = {
        showNotification: function(message, type = 'info') {
            if (MOBILE_CONFIG.isMobile) {
                // Notification simplifiée pour mobile
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#2196f3'};
                    color: white;
                    padding: 12px 20px;
                    border-radius: 5px;
                    z-index: 10000;
                    font-size: 14px;
                    max-width: 90%;
                    text-align: center;
                `;
                notification.textContent = message;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            } else {
                alert(`${type.toUpperCase()}: ${message}`);
            }
        },
        debounce: function(func, wait) {
            const delay = MOBILE_CONFIG.isLowPerformance ? wait * 2 : wait;
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, delay);
            };
        },
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        // Nouveaux utilitaires pour mobile
        isMobile: function() {
            return MOBILE_CONFIG.isMobile;
        },
        isLowPerformance: function() {
            return MOBILE_CONFIG.isLowPerformance;
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
        
        // Initialiser les modules disponibles avec optimisations mobile
        if (typeof window.navigationManager === 'undefined') {
            console.log('Initialisation du gestionnaire de navigation...');
        }
        
        if (typeof window.animationManager === 'undefined') {
            console.log('Initialisation du gestionnaire d\'animations...');
        }
        
        if (typeof window.formManager === 'undefined') {
            console.log('Initialisation du gestionnaire de formulaires...');
        }
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des modules:', error);
    }
}

// Fonction pour configurer les paramètres globaux
function setupGlobalConfig() {
    // Configuration des performances mobile
    if (MOBILE_CONFIG.isMobile) {
        // Réduire la fréquence des événements sur mobile
        document.addEventListener('scroll', TDIUtils.debounce(() => {
            // Gestion du scroll optimisée pour mobile
        }, MOBILE_CONFIG.debounceDelay));
        
        // Optimiser les événements de redimensionnement
        window.addEventListener('resize', TDIUtils.debounce(() => {
            // Gestion du redimensionnement optimisée
        }, 250));
    }
}

// Optimisations spécifiques pour mobile
function optimizeForMobile() {
    // Réduire les animations CSS sur mobile
    const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
    animatedElements.forEach(el => {
        const currentTransition = el.style.transition;
        if (currentTransition && currentTransition.includes('transform')) {
            // Simplifier les transitions de transform sur mobile
            el.style.transition = currentTransition.replace(/transform[^,]*/g, 'opacity 0.3s ease');
        }
    });
    
    // Optimiser les images pour mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        // Lazy loading pour mobile
        if (!img.loading) {
            img.loading = 'lazy';
        }
    });
    
    // Optimiser les formulaires pour mobile
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.style.fontSize = '16px'; // Évite le zoom sur iOS
        input.style.minHeight = '44px'; // Taille minimale pour tactile
    });
}

// Gestion des erreurs optimisée pour mobile
window.addEventListener('error', function(e) {
    if (MOBILE_CONFIG.isMobile) {
        console.warn('Erreur détectée sur mobile:', e.error);
        // Ne pas afficher d'alertes d'erreur sur mobile
    } else {
        console.error('Erreur détectée:', e.error);
    }
});

// Optimisation lors du changement d'orientation
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        if (MOBILE_CONFIG.isMobile) {
            optimizeForMobile();
        }
    }, 100);
});
