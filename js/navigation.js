/* ===== NAVIGATION MODULE ===== */
class NavigationManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        this.isMobile = window.innerWidth <= 768;
        
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
        this.setupMobileOptimizations();
    }
    
    setupMobileMenu() {
        // Gestion du menu hamburger avec support tactile
        this.hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // Support tactile pour fermer le menu
        this.hamburger.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });
        
        // Fermer le menu mobile quand on clique sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
            
            // Support tactile pour les liens
            link.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.closeMobileMenu();
                
                // Navigation vers la section
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    this.scrollToSection(href);
                }
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Fermer le menu lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Empêcher le scroll du body quand le menu est ouvert
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
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
                    this.scrollToSection(anchor.getAttribute('href'));
                }
            });
        });
    }
    
    scrollToSection(href) {
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajuster pour la navbar fixe
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    setupMobileOptimizations() {
        if (this.isMobile) {
            // Optimisations spécifiques mobile
            this.optimizeForMobile();
        }
    }
    
    optimizeForMobile() {
        // Améliorer la réactivité tactile
        const touchElements = document.querySelectorAll('.nav-link, .btn, .hamburger');
        touchElements.forEach(element => {
            element.style.touchAction = 'manipulation';
            element.style.webkitTapHighlightColor = 'transparent';
        });
        
        // Optimiser les transitions pour mobile
        if (this.navMenu) {
            this.navMenu.style.willChange = 'transform, opacity';
        }
    }
    
    // Méthode pour fermer le menu mobile
    closeMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Méthode pour vérifier si le menu mobile est ouvert
    isMobileMenuOpen() {
        return this.navMenu && this.navMenu.classList.contains('active');
    }
}

// Initialiser la navigation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});
