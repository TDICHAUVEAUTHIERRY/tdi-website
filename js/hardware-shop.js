// Gestion de la boutique matériel informatique
class HardwareShop {
    constructor() {
        this.currentSlot = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadProductData();
    }

    bindEvents() {
        // Gestion des boutons d'achat
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('buy-now')) {
                this.handlePurchase(e.target);
            }
        });
    }

    // Édition d'un slot
    editSlot(category, slotNumber) {
        this.currentSlot = { category, slotNumber };
        this.showEditModal();
        this.populateEditForm();
    }

    // Affichage du modal d'édition
    showEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Fermeture du modal
    closeEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.currentSlot = null;
    }

    // Remplissage du formulaire d'édition
    populateEditForm() {
        if (!this.currentSlot) return;

        const slot = document.querySelector(`[data-category="${this.currentSlot.category}"][data-slot="${this.currentSlot.slotNumber}"]`);
        if (!slot) return;

        const title = slot.querySelector('h4').textContent;
        const price = slot.querySelector('.price').textContent.replace('€', '');
        const description = slot.querySelector('.description').textContent;

        document.getElementById('edit-title').value = title;
        document.getElementById('edit-price').value = price;
        document.getElementById('edit-description').value = description;
    }

    // Sauvegarde des modifications
    saveSlot() {
        if (!this.currentSlot) return;

        const title = document.getElementById('edit-title').value;
        const price = document.getElementById('edit-price').value;
        const description = document.getElementById('edit-description').value;

        if (!title || !price || !description) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        this.updateSlotContent(title, price, description);
        this.closeEditModal();
        this.saveToLocalStorage();
    }

    // Mise à jour du contenu du slot
    updateSlotContent(title, price, description) {
        if (!this.currentSlot) return;

        const slot = document.querySelector(`[data-category="${this.currentSlot.category}"][data-slot="${this.currentSlot.slotNumber}"]`);
        if (!slot) return;

        slot.querySelector('h4').textContent = title;
        slot.querySelector('.price').textContent = price + '€';
        slot.querySelector('.description').textContent = description;
    }

    // Gestion des achats
    handlePurchase(button) {
        const slot = button.closest('.product-slot');
        const title = slot.querySelector('h4').textContent;
        const price = slot.querySelector('.price').textContent;
        const category = slot.dataset.category;

        const confirmPurchase = confirm(`
            Confirmer l'achat ?
            
            Produit: ${title}
            Prix: ${price}
            Catégorie: ${category}
            
            Voulez-vous procéder au paiement ?
        `);

        if (confirmPurchase) {
            // Redirection vers la section paiement
            window.location.href = '#paiement';
            
            // Pré-remplir le formulaire de paiement
            setTimeout(() => {
                const paymentAmount = document.getElementById('payment-amount');
                const serviceDescription = document.getElementById('service-description');
                
                if (paymentAmount && serviceDescription) {
                    paymentAmount.value = price.replace('€', '');
                    serviceDescription.value = `Achat: ${title} (${category})`;
                }
            }, 500);
        }
    }

    // Sauvegarde en localStorage
    saveToLocalStorage() {
        const slots = {};
        document.querySelectorAll('.product-slot').forEach(slot => {
            const category = slot.dataset.category;
            const slotNumber = slot.dataset.slot;
            const title = slot.querySelector('h4').textContent;
            const price = slot.querySelector('.price').textContent;
            const description = slot.querySelector('.description').textContent;

            if (!slots[category]) slots[category] = {};
            slots[category][slotNumber] = { title, price, description };
        });

        localStorage.setItem('hardwareShopData', JSON.stringify(slots));
    }

    // Chargement depuis localStorage
    loadProductData() {
        const savedData = localStorage.getItem('hardwareShopData');
        if (savedData) {
            const slots = JSON.parse(savedData);
            Object.keys(slots).forEach(category => {
                Object.keys(slots[category]).forEach(slotNumber => {
                    const slot = document.querySelector(`[data-category="${category}"][data-slot="${slotNumber}"]`);
                    if (slot) {
                        const data = slots[category][slotNumber];
                        slot.querySelector('h4').textContent = data.title;
                        slot.querySelector('.price').textContent = data.price;
                        slot.querySelector('.description').textContent = data.description;
                    }
                });
            });
        }
    }
}

// Initialisation de la boutique
document.addEventListener('DOMContentLoaded', function() {
    window.hardwareShop = new HardwareShop();
});

// Fonctions globales pour les onclick
function editSlot(category, slotNumber) {
    if (window.hardwareShop) {
        window.hardwareShop.editSlot(category, slotNumber);
    }
}

function saveSlot() {
    if (window.hardwareShop) {
        window.hardwareShop.saveSlot();
    }
}

function closeEditModal() {
    if (window.hardwareShop) {
        window.hardwareShop.closeEditModal();
    }
}
