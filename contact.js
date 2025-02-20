// Sélection des éléments du DOM
const form = document.getElementById('contact-form');
const submitButton = form.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoader = submitButton.querySelector('.button-loader');
const toast = document.getElementById('toast');

// Fonction pour afficher le toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toastIcon.className = `toast-icon fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Gestion de l'envoi du formulaire
form.addEventListener('submit', async (e) => {
    // Afficher le loader
    submitButton.disabled = true;
    buttonText.style.opacity = '0';
    buttonLoader.style.display = 'block';

    try {
        // Le formulaire sera géré par Formspree
        // Pas besoin d'empêcher le comportement par défaut
        
        // Afficher le message de succès
        showToast('Message envoyé avec succès !', 'success');
        
        // Le formulaire sera réinitialisé automatiquement après la redirection

    } catch (error) {
        e.preventDefault(); // Empêcher l'envoi en cas d'erreur
        console.error('Erreur:', error);
        showToast('Erreur lors de l\'envoi du message.', 'error');
        
        // Réactiver le bouton
        submitButton.disabled = false;
        buttonText.style.opacity = '1';
        buttonLoader.style.display = 'none';
    }
});