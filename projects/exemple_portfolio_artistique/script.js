document.addEventListener('DOMContentLoaded', function() {
    // Language switching
    const translations = {
        en: {
            home: "Home",
            gallery: "Gallery",
            contact: "Contact",
            hero_title: "Welcome to My Creative World",
            hero_subtitle: "Contemporary Artist & Visual Designer",
            featured_works: "Featured Works",
            get_in_touch: "Get in Touch",
            contact_info: "Contact Information",
            contact_text: "I'd love to hear from you! Whether you're interested in purchasing artwork, commissioning a piece, or just want to say hello, feel free to reach out.",
            email: "Email",
            studio_location: "Studio Location",
            name: "Name",
            subject: "Subject",
            message: "Message",
            send_message: "Send Message",
            thank_you: "Thank you for your message! I will get back to you soon."
        },
        fr: {
            home: "Accueil",
            gallery: "Galerie",
            contact: "Contact",
            hero_title: "Bienvenue dans Mon Univers Créatif",
            hero_subtitle: "Artiste Contemporaine & Designer Visuel",
            featured_works: "Œuvres en Vedette",
            get_in_touch: "Contactez-moi",
            contact_info: "Informations de Contact",
            contact_text: "J'aimerais avoir de vos nouvelles ! Que vous soyez intéressé par l'achat d'une œuvre, une commande personnalisée, ou simplement pour dire bonjour, n'hésitez pas à me contacter.",
            email: "Email",
            studio_location: "Adresse du Studio",
            name: "Nom",
            subject: "Sujet",
            message: "Message",
            send_message: "Envoyer le Message",
            thank_you: "Merci pour votre message ! Je vous répondrai bientôt."
        }
    };

    let currentLang = localStorage.getItem('language') || 'en';

    // Function to update content based on selected language
    function updateContent(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update navigation links
        const homeLink = document.querySelector('a[href="index.html"]');
        const galleryLink = document.querySelector('a[href="gallery.html"]');
        const contactLink = document.querySelector('a[href="contact.html"]');

        if (homeLink) homeLink.textContent = translations[lang].home;
        if (galleryLink) galleryLink.textContent = translations[lang].gallery;
        if (contactLink) contactLink.textContent = translations[lang].contact;

        // Update page specific content for home page
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-content p');
        const featuredWorks = document.querySelector('.featured-works h2');

        if (heroTitle) heroTitle.textContent = translations[lang].hero_title;
        if (heroSubtitle) heroSubtitle.textContent = translations[lang].hero_subtitle;
        if (featuredWorks) featuredWorks.textContent = translations[lang].featured_works;

        // Update page specific content for contact page
        const contactTitle = document.querySelector('.contact h1');
        const contactInfoTitle = document.querySelector('.contact-info h2');
        const contactText = document.querySelector('.contact-info > p');
        const emailLabel = document.querySelector('.info-item:first-child strong');
        const locationLabel = document.querySelector('.info-item:last-child strong');
        
        if (contactTitle) contactTitle.textContent = translations[lang].get_in_touch;
        if (contactInfoTitle) contactInfoTitle.textContent = translations[lang].contact_info;
        if (contactText) contactText.textContent = translations[lang].contact_text;
        if (emailLabel) emailLabel.textContent = translations[lang].email + ':';
        if (locationLabel) locationLabel.textContent = translations[lang].studio_location + ':';
        
        // Update form labels
        const nameLabel = document.querySelector('label[for="name"]');
        const emailFormLabel = document.querySelector('label[for="email"]');
        const subjectLabel = document.querySelector('label[for="subject"]');
        const messageLabel = document.querySelector('label[for="message"]');
        const submitBtn = document.querySelector('.submit-btn');
        
        if (nameLabel) nameLabel.textContent = translations[lang].name;
        if (emailFormLabel) emailFormLabel.textContent = translations[lang].email;
        if (subjectLabel) subjectLabel.textContent = translations[lang].subject;
        if (messageLabel) messageLabel.textContent = translations[lang].message;
        if (submitBtn) submitBtn.textContent = translations[lang].send_message;
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = menuToggle.getElementsByTagName('span');
            spans[0].style.transform = navLinks.classList.contains('active') 
                ? 'rotate(45deg) translate(6px, 6px)' 
                : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') 
                ? '0' 
                : '1';
            spans[2].style.transform = navLinks.classList.contains('active') 
                ? 'rotate(-45deg) translate(6px, -6px)' 
                : 'none';
        });
    }

    // Language switcher click handlers
    const langEn = document.getElementById('langEn');
    const langFr = document.getElementById('langFr');

    if (langEn && langFr) {
        langEn.addEventListener('click', function(e) {
            e.preventDefault();
            updateContent('en');
            langEn.classList.add('active');
            langFr.classList.remove('active');
        });

        langFr.addEventListener('click', function(e) {
            e.preventDefault();
            updateContent('fr');
            langFr.classList.add('active');
            langEn.classList.remove('active');
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show a success message
            console.log('Form submitted:', formData);
            alert(translations[currentLang].thank_you);
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {  // Skip empty anchors
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Initialize content with saved language preference
    updateContent(currentLang);
});