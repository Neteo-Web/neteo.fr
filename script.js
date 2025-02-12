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

// Menu burger amélioré
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

if (burger && navLinks) {
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Fermer le menu au clic sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        }
    });
}

// Slider tactile pour les plans
document.addEventListener('DOMContentLoaded', function() {
    const pricingGrid = document.querySelector('.pricing-grid');
    if (!pricingGrid) return;

    let startX;
    let scrollLeft;
    let isDown = false;
    let walkMultiplier = 1.5;

    // Gestion du tactile
    pricingGrid.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - pricingGrid.offsetLeft;
        scrollLeft = pricingGrid.scrollLeft;
    });

    pricingGrid.addEventListener('touchend', () => {
        isDown = false;
    });

    pricingGrid.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - pricingGrid.offsetLeft;
        const walk = (x - startX) * walkMultiplier;
        pricingGrid.scrollLeft = scrollLeft - walk;
    });

    // Gestion de la souris
    pricingGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - pricingGrid.offsetLeft;
        scrollLeft = pricingGrid.scrollLeft;
        pricingGrid.style.cursor = 'grabbing';
    });

    pricingGrid.addEventListener('mouseleave', () => {
        isDown = false;
        pricingGrid.style.cursor = 'grab';
    });

    pricingGrid.addEventListener('mouseup', () => {
        isDown = false;
        pricingGrid.style.cursor = 'grab';
    });

    pricingGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - pricingGrid.offsetLeft;
        const walk = (x - startX) * walkMultiplier;
        pricingGrid.scrollLeft = scrollLeft - walk;
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(faqItem => {
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
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

// Slider des prix
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si les éléments du slider existent
    const pricingGrid = document.querySelector('.pricing-grid');
    const prevButton = document.querySelector('.pricing-nav .prev');
    const nextButton = document.querySelector('.pricing-nav .next');
    const dots = document.querySelectorAll('.pricing-dots button');

    // Ne continuer que si les éléments du slider existent
    if (pricingGrid && prevButton && nextButton && dots.length > 0) {
        let currentSlide = 0;
        const slidesCount = document.querySelectorAll('.price-card').length;

        // Fonction pour calculer le nombre de slides visibles
        function getVisibleSlides() {
            const containerWidth = document.querySelector('.pricing-container').clientWidth - 120;
            return Math.max(1, Math.floor(containerWidth / 432));
        }

        // Fonction pour mettre à jour le slider
        function updateSlider() {
            const visibleSlides = getVisibleSlides();
            const cardWidth = 432;
            const maxSlides = Math.min(2, slidesCount - visibleSlides); // Limiter à 2 pour 3 positions
            
            currentSlide = Math.min(currentSlide, maxSlides);
            
            const offset = currentSlide * cardWidth;
            pricingGrid.style.transform = `translateX(-${offset}px)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });

            prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentSlide >= maxSlides ? '0.5' : '1';
            prevButton.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
            nextButton.style.pointerEvents = currentSlide >= maxSlides ? 'none' : 'auto';
        }

        // Navigation par boutons
        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });

        nextButton.addEventListener('click', () => {
            const visibleSlides = getVisibleSlides();
            const maxSlides = Math.min(2, slidesCount - visibleSlides); // Limiter à 2 pour 3 positions
            if (currentSlide < maxSlides) {
                currentSlide++;
                updateSlider();
            }
        });

        // Navigation par points
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // Navigation par clavier
        document.addEventListener('keydown', (e) => {
            const visibleSlides = getVisibleSlides();
            const maxSlides = Math.min(2, slidesCount - visibleSlides); // Limiter à 2 pour 3 positions
            if (e.key === 'ArrowLeft' && currentSlide > 0) {
                currentSlide--;
                updateSlider();
            } else if (e.key === 'ArrowRight' && currentSlide < maxSlides) {
                currentSlide++;
                updateSlider();
            }
        });

        // Mise à jour lors du redimensionnement
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateSlider, 100);
        });

        // Configuration initiale
        updateSlider();
    }

    // Gestion du menu burger
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }
});