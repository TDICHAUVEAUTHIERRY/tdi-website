/* ===== TDI CHAUVEAU THIERRY - SCRIPT CONCATÉNÉ ===== */
/* Ce fichier contient tous les modules JavaScript pour une compatibilité optimale */

// ===== CORE FUNCTIONS =====
// Fonction utilitaire pour ajouter des classes CSS conditionnelles
function addClassConditionally(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

// Fonction pour vérifier si l'élément est dans le viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fonction pour améliorer la performance avec debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction pour valider les emails
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Système de notification
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Créer la nouvelle notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles de la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Fermeture automatique après 5 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Fermeture manuelle
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Animation des compteurs
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Lazy loading des images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Gestion des erreurs de chargement
function handleImageErrors() {
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.display = 'none';
            console.warn('Image failed to load:', e.target.src);
        }
    });
}

// Export des fonctions utilitaires
window.TDIUtils = {
    addClassConditionally,
    isInViewport,
    debounce,
    isValidEmail,
    showNotification,
    animateCounters,
    lazyLoadImages,
    handleImageErrors
};

// ===== NAVIGATION MANAGER =====
class NavigationManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        
        this.init();
    }
    
    init() {
        if (this.hamburger && this.navMenu) {
            this.setupMobileMenu();
        }
        
        if (this.navbar) {
            this.setupScrollEffects();
        }
        
        this.setupSmoothScroll();
    }
    
    setupMobileMenu() {
        // Gestion du menu hamburger
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
        
        // Fermer le menu mobile quand on clique sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }
    
    setupScrollEffects() {
        // Navigation sticky avec effet de transparence
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                this.navbar.style.background = 'rgba(0, 105, 148, 0.95)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            } else {
                this.navbar.style.background = 'linear-gradient(135deg, #006994, #004d6b)';
                this.navbar.style.backdropFilter = 'none';
            }
            
            this.lastScrollTop = scrollTop;
        });
    }
    
    setupSmoothScroll() {
        // Smooth scroll pour les liens d'ancrage
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Ajuster pour la navbar fixe
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    closeMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
        }
    }
    
    isMobileMenuOpen() {
        return this.navMenu && this.navMenu.classList.contains('active');
    }
}

// ===== ANIMATION MANAGER =====
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParallaxEffects();
        this.setupFloatingElements();
    }
    
    setupScrollAnimations() {
        // Animation des éléments au scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);
        
        // Observer tous les éléments avec la classe 'animate-on-scroll'
        document.querySelectorAll('.service-card, .advantage-item, .pricing-card, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    setupHoverEffects() {
        // Animation des cartes de services au hover
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Animation des cartes de tarifs
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('featured')) {
                    card.style.transform = 'translateY(-10px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('featured')) {
                    card.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Animation des éléments d'avantages
        document.querySelectorAll('.advantage-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    setupParallaxEffects() {
        // Effet de parallaxe léger pour la section hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    setupFloatingElements() {
        // Animation des éléments flottants
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 2}s`;
        });
    }
    
    animateElement(element, animationType = 'fadeInUp') {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }
    
    toggleAnimations(enable = true) {
        const animatedElements = document.querySelectorAll('.service-card, .advantage-item, .pricing-card, .contact-item');
        
        animatedElements.forEach(el => {
            if (enable) {
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            } else {
                el.style.transition = 'none';
            }
        });
    }
}

// ===== FORM MANAGER =====
class FormManager {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.contactForm) {
            this.setupContactForm();
        }
        
        this.setupFormValidation();
        this.setupFormAccessibility();
    }
    
    setupContactForm() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
        
        // Validation en temps réel
        this.setupRealTimeValidation();
    }
    
    setupRealTimeValidation() {
        const inputs = this.contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Validation selon le type de champ
        switch (field.type) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Veuillez entrer une adresse email valide.';
                }
                break;
                
            case 'tel':
                if (value && !this.isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Veuillez entrer un numéro de téléphone valide.';
                }
                break;
                
            default:
                if (field.hasAttribute('required') && !value) {
                    isValid = false;
                    errorMessage = 'Ce champ est obligatoire.';
                }
                break;
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    setupFormValidation() {
        // Validation globale du formulaire
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.handleFormSubmission();
            }
        });
    }
    
    validateForm() {
        const requiredFields = this.contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async handleFormSubmission() {
        try {
            // Afficher un indicateur de chargement
            this.showLoadingState();
            
            // Récupération des valeurs du formulaire
            const formData = new FormData(this.contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
            await this.simulateFormSubmission(data);
            
            // Succès
            this.showSuccessMessage();
            this.contactForm.reset();
            
        } catch (error) {
            // Erreur
            this.showErrorMessage(error.message);
        } finally {
            this.hideLoadingState();
        }
    }
    
    async simulateFormSubmission(data) {
        // Simulation d'un délai d'envoi
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simuler un succès (90% de chance)
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Erreur lors de l\'envoi. Veuillez réessayer.'));
                }
            }, 1500);
        });
    }
    
    showLoadingState() {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        }
    }
    
    hideLoadingState() {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Envoyer la demande';
        }
    }
    
    showSuccessMessage() {
        if (window.TDIUtils && window.TDIUtils.showNotification) {
            window.TDIUtils.showNotification('Demande envoyée avec succès ! Nous vous recontacterons rapidement.', 'success');
        } else {
            alert('Demande envoyée avec succès ! Nous vous recontacterons rapidement.');
        }
    }
    
    showErrorMessage(message) {
        if (window.TDIUtils && window.TDIUtils.showNotification) {
            window.TDIUtils.showNotification(message, 'error');
        } else {
            alert('Erreur : ' + message);
        }
    }
    
    setupFormAccessibility() {
        // Amélioration de l'accessibilité des formulaires
        const formGroups = this.contactForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            const label = group.querySelector('label');
            
            if (input && !label) {
                // Créer un label si il n'existe pas
                const newLabel = document.createElement('label');
                newLabel.textContent = input.placeholder || 'Champ';
                newLabel.setAttribute('for', input.id);
                group.insertBefore(newLabel, input);
            }
            
            // Ajouter des attributs ARIA
            if (input) {
                if (input.hasAttribute('required')) {
                    input.setAttribute('aria-required', 'true');
                }
                
                if (input.hasAttribute('placeholder')) {
                    input.setAttribute('aria-describedby', input.id + '-help');
                }
            }
        });
    }
    
    resetForm() {
        if (this.contactForm) {
            this.contactForm.reset();
            this.clearAllErrors();
        }
    }
    
    clearAllErrors() {
        const errorFields = this.contactForm.querySelectorAll('.field-error');
        errorFields.forEach(error => error.remove());
        
        const inputs = this.contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.classList.remove('error'));
    }
    
    validateSpecificField(fieldName) {
        const field = this.contactForm.querySelector(`[name="${fieldName}"]`);
        if (field) {
            return this.validateField(field);
        }
        return false;
    }
}

// ===== INITIALISATION =====
// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialiser tous les modules
    window.navigationManager = new NavigationManager();
    window.animationManager = new AnimationManager();
    window.formManager = new FormManager();
    
    // Initialiser les utilitaires
    if (window.TDIUtils) {
        window.TDIUtils.lazyLoadImages();
        window.TDIUtils.handleImageErrors();
    }
    
    // Amélioration de la performance avec debounce pour le scroll
    const debouncedScrollHandler = debounce(function() {
        // Code de gestion du scroll optimisé
    }, 16); // ~60 FPS
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Effet de focus amélioré pour l'accessibilité
    document.querySelectorAll('input, select, textarea, button, a').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #90e0ef';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Initialisation terminée
    console.log('TDI CHAUVEAU THIERRY - Site initialisé avec succès !');
});

// ===== PARTICLES ANIMATION (OPTIONNEL) =====
// Ajouter l'animation des particules au CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialiser les particules si demandé (désactivé par défaut pour la performance)
// createParticles();
