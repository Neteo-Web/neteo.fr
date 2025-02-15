import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_PUBLIC_KEY = 'VOTRE_CLE_PUBLIQUE';
const EMAILJS_SERVICE_ID = 'VOTRE_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';

// Initialisation d'EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

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
    e.preventDefault();

    // Afficher le loader
    submitButton.disabled = true;
    buttonText.style.opacity = '0';
    buttonLoader.style.display = 'block';

    try {
        // Récupération des données du formulaire
        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };

        // Envoi de l'email via EmailJS
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formData
        );

        // Afficher le message de succès
        showToast('Message envoyé avec succès !', 'success');
        form.reset();

    } catch (error) {
        console.error('Erreur:', error);
        showToast('Erreur lors de l\'envoi du message.', 'error');
    } finally {
        // Cacher le loader
        submitButton.disabled = false;
        buttonText.style.opacity = '1';
        buttonLoader.style.display = 'none';
    }
});