// Variables globales
let currentAmount = 50;
let paypalFees = 0;

// Éléments DOM
const amountInput = document.getElementById('payment-amount');
const serviceDescription = document.getElementById('service-description');
const summaryAmount = document.getElementById('summary-amount');
const summaryFees = document.getElementById('summary-fees');
const summaryTotal = document.getElementById('summary-total');

// Calcul des frais PayPal (2.9% + 0.35€)
function calculatePayPalFees(amount) {
    return (amount * 0.029) + 0.35;
}

// Mise à jour du résumé
function updateSummary() {
    const amount = parseFloat(amountInput.value);
    const fees = calculatePayPalFees(amount);
    const total = amount + fees;
    
    summaryAmount.textContent = amount.toFixed(2) + '€';
    summaryFees.textContent = fees.toFixed(2) + '€';
    summaryTotal.textContent = total.toFixed(2) + '€';
    
    currentAmount = amount;
    paypalFees = fees;
}

// Écouteur sur l'input de montant
amountInput.addEventListener('input', updateSummary);

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateSummary();
    
    // Configuration PayPal flexible
    paypal.Buttons({
        createOrder: function(data, actions) {
            const amount = parseFloat(amountInput.value);
            const description = serviceDescription.value || 'Service TDI CHAUVEAU THIERRY';
            
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: amount.toFixed(2)
                    },
                    description: description
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Paiement réussi
                const successMessage = `
                    ✅ Paiement réussi !
                    
                    Référence: ${details.id}
                    Montant: ${currentAmount.toFixed(2)}€
                    Service: ${serviceDescription.value || 'Non spécifié'}
                    
                    contacter nous , apres votre reglement afin de gerer ensemble notre intervention en details sous moins de 24h ,
                    pour organiser l'intervention au plus vite.
                `;
                
                alert(successMessage);
                
                // Redirection vers la page de contact
                window.location.href = '#contact';
            });
        },
        onError: function(err) {
            console.error('Erreur PayPal:', err);
            alert('Une erreur est survenue lors du paiement. Veuillez réessayer.');
        }
    }).render('#paypal-button-flexible');
});

// Validation du montant
amountInput.addEventListener('blur', function() {
    const amount = parseFloat(this.value);
    if (amount < 20) {
        this.value = 20;
        alert('Le montant minimum est de 20€');
    } else if (amount > 500) {
        this.value = 500;
        alert('Le montant maximum est de 500€');
    }
    updateSummary();
});
