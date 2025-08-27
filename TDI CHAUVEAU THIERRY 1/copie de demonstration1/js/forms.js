/* ===== FORMS MODULE ===== */
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
    
    // Méthode pour réinitialiser le formulaire
    resetForm() {
        if (this.contactForm) {
            this.contactForm.reset();
            this.clearAllErrors();
        }
    }
    
    // Méthode pour effacer toutes les erreurs
    clearAllErrors() {
        const errorFields = this.contactForm.querySelectorAll('.field-error');
        errorFields.forEach(error => error.remove());
        
        const inputs = this.contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.classList.remove('error'));
    }
    
    // Méthode pour valider un champ spécifique
    validateSpecificField(fieldName) {
        const field = this.contactForm.querySelector(`[name="${fieldName}"]`);
        if (field) {
            return this.validateField(field);
        }
        return false;
    }
}

// Initialiser la gestion des formulaires quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.formManager = new FormManager();
});
