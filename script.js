// Navigation hide on scroll
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('hide');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('hide')) {
        nav.classList.add('hide');
    } else if (currentScroll < lastScroll && nav.classList.contains('hide')) {
        nav.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

// Menu burger
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Fonction pour fermer le menu
    function closeMenu() {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Fonction pour ouvrir le menu
    function openMenu() {
        navLinks.classList.add('active');
        burger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Toggle du menu burger
    if (burger && navLinks) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Fermer le menu au clic sur un lien
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !burger.contains(e.target)) {
                closeMenu();
            }
        });
    }
});

// Slider des plans avec défilement libre
document.addEventListener('DOMContentLoaded', function() {
    const pricingContainer = document.querySelector('.pricing-container');
    const pricingGrid = document.querySelector('.pricing-grid');
    
    if (!pricingGrid || !pricingContainer) return;

    let startX;
    let startY;
    let scrollLeft;
    let isDown = false;
    let isDragging = false;
    let isScrollingVertically = false;
    const velocityReadings = [];
    const VELOCITY_HISTORY = 5;
    const SCROLL_THRESHOLD = 5; // Seuil pour déterminer la direction du défilement

    function handleStart(e) {
        isDown = true;
        isDragging = false;
        isScrollingVertically = false;
        pricingContainer.classList.add('active');
        startX = (e.type === 'mousedown') ? e.pageX : e.touches[0].pageX;
        startY = (e.type === 'mousedown') ? e.pageY : e.touches[0].pageY;
        scrollLeft = pricingContainer.scrollLeft;
        velocityReadings.length = 0;
    }

    function handleEnd() {
        if (!isDown) return;
        isDown = false;
        pricingContainer.classList.remove('active');

        if (velocityReadings.length > 0 && isDragging && !isScrollingVertically) {
            const averageVelocity = velocityReadings.reduce((a, b) => a + b, 0) / velocityReadings.length;
            const momentum = averageVelocity * 50;
            
            pricingContainer.scrollTo({
                left: pricingContainer.scrollLeft - momentum,
                behavior: 'smooth'
            });
        }
    }

    function handleMove(e) {
        if (!isDown) return;

        const x = (e.type === 'mousemove') ? e.pageX : e.touches[0].pageX;
        const y = (e.type === 'mousemove') ? e.pageY : e.touches[0].pageY;
        const deltaX = Math.abs(x - startX);
        const deltaY = Math.abs(y - startY);

        // Détermine la direction du défilement au début du mouvement
        if (!isDragging && !isScrollingVertically) {
            if (deltaX > SCROLL_THRESHOLD || deltaY > SCROLL_THRESHOLD) {
                isScrollingVertically = deltaY > deltaX;
                isDragging = !isScrollingVertically;
            }
        }

        // Si on défile verticalement, ne pas empêcher le comportement par défaut
        if (isScrollingVertically) return;

        // Sinon, gérer le défilement horizontal
        if (isDragging) {
            e.preventDefault();
            const walk = (x - startX) * 2;
            const newScrollLeft = scrollLeft - walk;
            const velocity = walk / 100; // Simplifié pour plus de stabilité
            
            velocityReadings.push(velocity);
            if (velocityReadings.length > VELOCITY_HISTORY) {
                velocityReadings.shift();
            }

            pricingContainer.scrollLeft = newScrollLeft;
        }
    }

    // Événements tactiles
    pricingContainer.addEventListener('touchstart', handleStart, { passive: true });
    pricingContainer.addEventListener('touchend', handleEnd);
    pricingContainer.addEventListener('touchcancel', handleEnd);
    pricingContainer.addEventListener('touchmove', handleMove, { passive: false });

    // Événements souris
    pricingContainer.addEventListener('mousedown', handleStart);
    pricingContainer.addEventListener('mouseleave', handleEnd);
    pricingContainer.addEventListener('mouseup', handleEnd);
    pricingContainer.addEventListener('mousemove', handleMove);

    // Désactiver le comportement de glisser-déposer par défaut
    pricingContainer.addEventListener('dragstart', (e) => e.preventDefault());
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fermer tous les items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Ouvrir l'item cliqué s'il n'était pas déjà ouvert
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});