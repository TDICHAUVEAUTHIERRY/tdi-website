/* ===== ANIMATIONS MODULE OPTIMISÉ MOBILE ===== */
class AnimationManager {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isLowPerformance = this.detectLowPerformance();
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    detectLowPerformance() {
        // Détection de performance basée sur l'appareil
        const userAgent = navigator.userAgent.toLowerCase();
        const isOldDevice = /android [1-6]|iphone os [1-9]|ipad os [1-9]/i.test(userAgent);
        const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const hasSlowConnection = navigator.connection && navigator.connection.effectiveType === 'slow-2g';
        
        return this.isMobile || isOldDevice || hasLowMemory || hasSlowConnection;
    }
    
    init() {
        if (this.isLowPerformance) {
            this.setupBasicAnimations();
        } else {
            this.setupFullAnimations();
        }
        
        this.setupMobileOptimizations();
    }
    
    setupBasicAnimations() {
        // Animations simplifiées pour appareils lents
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                }
            });
        }, { threshold: 0.2 });
        
        // Observer les éléments avec des animations simples
        document.querySelectorAll('.service-card, .advantage-item, .pricing-card, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.4s ease';
            observer.observe(el);
        });
    }
    
    setupFullAnimations() {
        // Animations complètes pour appareils performants
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);
        
        document.querySelectorAll('.service-card, .advantage-item, .pricing-card, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        this.setupHoverEffects();
        this.setupFloatingElements();
    }
    
    setupHoverEffects() {
        if (this.isMobile) return; // Pas d'effets hover sur mobile
        
        // Animation des cartes de services au hover
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.isMobile) {
                    card.style.transform = 'translateY(-10px) scale(1.01)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!this.isMobile) {
                    card.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
        
        // Animation des cartes de tarifs
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.isMobile && !card.classList.contains('featured')) {
                    card.style.transform = 'translateY(-8px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!this.isMobile && !card.classList.contains('featured')) {
                    card.style.transform = 'translateY(0)';
                }
            });
        });
    }
    
    setupFloatingElements() {
        if (this.isMobile) return; // Pas d'éléments flottants sur mobile
        
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 1.5}s`;
        });
    }
    
    setupMobileOptimizations() {
        if (this.isMobile) {
            // Désactiver les animations lourdes sur mobile
            this.disableHeavyAnimations();
            
            // Optimiser les transitions CSS
            this.optimizeTransitions();
        }
    }
    
    disableHeavyAnimations() {
        // Désactiver les effets de parallaxe sur mobile
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'none';
        }
        
        // Réduire le nombre d'éléments animés
        const animatedElements = document.querySelectorAll('.floating-icon, .particle');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.display = 'none';
        });
    }
    
    optimizeTransitions() {
        // Optimiser les transitions pour mobile
        const elementsWithTransitions = document.querySelectorAll('[style*="transition"]');
        elementsWithTransitions.forEach(el => {
            const currentTransition = el.style.transition;
            if (currentTransition.includes('transform')) {
                // Remplacer les transitions de transform par des transitions simples
                el.style.transition = currentTransition.replace(/transform[^,]*/g, 'opacity 0.3s ease');
            }
        });
    }
    
    // Méthode pour animer un élément spécifique
    animateElement(element, animationType = 'fadeIn') {
        if (this.isLowPerformance) {
            // Animation simple pour appareils lents
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.4s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
            }, 50);
        } else {
            // Animation complète pour appareils performants
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    // Méthode pour activer/désactiver les animations
    toggleAnimations(enable = true) {
        const animatedElements = document.querySelectorAll('.service-card, .advantage-item, .pricing-card, .contact-item');
        
        animatedElements.forEach(el => {
            if (enable && !this.isLowPerformance) {
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            } else {
                el.style.transition = 'opacity 0.3s ease';
            }
        });
    }
    
    // Méthode pour optimiser en temps réel
    optimizeForCurrentConditions() {
        if (this.isMobile) {
            this.setupBasicAnimations();
        }
    }
}

// Initialiser les animations quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
    
    // Optimiser lors du redimensionnement
    window.addEventListener('resize', () => {
        if (window.animationManager) {
            window.animationManager.optimizeForCurrentConditions();
        }
    });
    
    // Optimiser lors du changement d'orientation
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (window.animationManager) {
                window.animationManager.optimizeForCurrentConditions();
            }
        }, 100);
    });
});
