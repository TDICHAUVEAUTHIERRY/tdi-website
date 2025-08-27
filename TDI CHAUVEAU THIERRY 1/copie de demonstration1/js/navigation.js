/* ===== NAVIGATION MODULE ===== */
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
    
    // Méthode pour fermer le menu mobile
    closeMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
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
