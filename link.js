// Fonction pour obtenir le chemin actuel sans l'extension .html
function getCurrentPath() {
    try {
        return window.location.pathname || '/';
    } catch (error) {
        console.error('Erreur lors de la récupération du chemin:', error);
        return '/';
    }
}

// Fonction pour vérifier si l'URL est valide
function isValidUrl(url) {
    if (!url || typeof url !== 'string') return false;
    try {
        new URL(url, window.location.origin);
        return true;
    } catch {
        return false;
    }
}

// Fonction pour rediriger vers la nouvelle URL
function redirect(from, to) {
    if (!window || !window.location || !history || !document) {
        console.error('Environnement du navigateur non disponible');
        return;
    }

    try {
        if (!from || !to) return;
        
        const currentPath = getCurrentPath();
        if (currentPath === from && isValidUrl(to)) {
            const newUrl = `${window.location.origin}${to}`;
            history.replaceState({ path: to }, '', newUrl);
            
            // Mettre à jour le titre de la page de manière sécurisée
            updatePageTitle(to);
        }
    } catch (error) {
        console.error('Erreur lors de la redirection:', error);
    }
}

// Liste des redirections
const redirections = [
    { from: '/index.html', to: '/accueil' },
    { from: '/', to: '/accueil' },
    { from: '/qui-sommes-nous.html', to: '/qui-sommes-nous' },
    { from: '/services.html', to: '/services' },
    { from: '/projets.html', to: '/creations' },
    { from: '/plans.html', to: '/plans' },
    { from: '/contact.html', to: '/contact' },
    { from: '/politique-confidentialite.html', to: '/politique-confidentialite' },
    { from: '/conditions-generales-vente.html', to: '/conditions-generales-vente' },
    { from: '/mentions-legales.html', to: '/mentions-legales' }
];

// Fonction d'initialisation sécurisée
function init() {
    try {
        // Appliquer toutes les redirections
        if (Array.isArray(redirections)) {
            redirections.forEach(({ from, to }) => {
                if (from && to) {
                    redirect(from, to);
                }
            });
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

// Attendre que le DOM soit chargé de manière sécurisée
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Gérer le retour en arrière du navigateur de manière sécurisée
window.addEventListener('popstate', function(event) {
    try {
        if (event && event.state && event.state.path) {
            updatePageTitle(event.state.path);
        } else {
            window.location.reload();
        }
    } catch (error) {
        console.error('Erreur lors de la gestion du popstate:', error);
        window.location.reload();
    }
});