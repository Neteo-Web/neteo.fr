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
    const links = document.querySelectorAll('.nav-links li');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            // Toggle nav
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');

            // Animate links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
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
            if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    }
});

// Slider des plans
document.addEventListener('DOMContentLoaded', function() {
    const pricingContainer = document.querySelector('.pricing-container');
    const pricingGrid = document.querySelector('.pricing-grid');
    const prevButton = document.querySelector('.pricing-nav .prev');
    const nextButton = document.querySelector('.pricing-nav .next');
    const dots = document.querySelectorAll('.pricing-dots button');
    
    if (!pricingGrid || !pricingContainer) return;

    let startX;
    let startY;
    let initialX;
    let currentX = 0;
    let isDown = false;
    let currentSlide = 0;
    let isSwiping = false;

    // Obtenir la largeur réelle d'une carte en fonction de la taille de l'écran
    function getCardWidth() {
        return window.innerWidth < 768 ? window.innerWidth * 0.85 : 400;
    }

    // Obtenir l'espacement entre les cartes
    function getGap() {
        return window.innerWidth < 768 ? 16 : 32;
    }

    // Fonction pour mettre à jour la position du slider
    function updateSliderPosition(index, animate = true) {
        const cardWidth = getCardWidth();
        const gap = getGap();
        const offset = index * (cardWidth + gap);
        
        if (animate) {
            pricingGrid.style.transition = 'transform 0.3s ease-out';
        } else {
            pricingGrid.style.transition = 'none';
        }
        
        currentX = -offset;
        pricingGrid.style.transform = `translateX(${currentX}px)`;
        currentSlide = index;

        // Mise à jour des points
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Mise à jour des boutons prev/next
        if (prevButton && nextButton) {
            prevButton.style.opacity = index === 0 ? '0.5' : '1';
            nextButton.style.opacity = index >= dots.length - 1 ? '0.5' : '1';
            prevButton.style.pointerEvents = index === 0 ? 'none' : 'auto';
            nextButton.style.pointerEvents = index >= dots.length - 1 ? 'none' : 'auto';
        }
    }

    // Gestion du tactile et de la souris
    function handleDragStart(e) {
        if (e.type === 'mousedown') {
            startX = e.pageX;
        } else {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        }
        
        isDown = true;
        initialX = currentX;
        pricingGrid.style.transition = 'none';
        pricingGrid.classList.add('active');
    }

    function handleDragEnd() {
        if (!isDown) return;
        isDown = false;
        isSwiping = false;
        pricingGrid.classList.remove('active');

        const cardWidth = getCardWidth();
        const gap = getGap();
        const slideWidth = cardWidth + gap;
        
        // Calculer le slide le plus proche
        const nearestSlide = Math.round(-currentX / slideWidth);
        const maxSlide = dots.length - 1;
        const targetSlide = Math.max(0, Math.min(nearestSlide, maxSlide));
        
        updateSliderPosition(targetSlide);
    }

    function handleDragMove(e) {
        if (!isDown) return;

        e.preventDefault();
        let currentPosition;
        let deltaX;

        if (e.type === 'mousemove') {
            currentPosition = e.pageX;
            deltaX = currentPosition - startX;
        } else {
            currentPosition = e.touches[0].pageX;
            const currentY = e.touches[0].pageY;
            deltaX = currentPosition - startX;

            // Détecter si c'est un swipe horizontal
            if (!isSwiping) {
                const deltaY = Math.abs(currentY - startY);
                const deltaXAbs = Math.abs(deltaX);
                
                if (deltaXAbs > deltaY) {
                    isSwiping = true;
                } else {
                    isDown = false;
                    return;
                }
            }
        }

        currentX = initialX + deltaX;
        pricingGrid.style.transform = `translateX(${currentX}px)`;
    }

    // Événements tactiles
    pricingGrid.addEventListener('touchstart', handleDragStart, { passive: false });
    pricingGrid.addEventListener('touchend', handleDragEnd);
    pricingGrid.addEventListener('touchcancel', handleDragEnd);
    pricingGrid.addEventListener('touchmove', handleDragMove, { passive: false });

    // Événements souris
    pricingGrid.addEventListener('mousedown', handleDragStart);
    pricingGrid.addEventListener('mouseleave', handleDragEnd);
    pricingGrid.addEventListener('mouseup', handleDragEnd);
    pricingGrid.addEventListener('mousemove', handleDragMove);

    // Navigation par points
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSliderPosition(index);
        });
    });

    // Navigation par boutons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                updateSliderPosition(currentSlide - 1);
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentSlide < dots.length - 1) {
                updateSliderPosition(currentSlide + 1);
            }
        });
    }

    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentSlide > 0) {
            updateSliderPosition(currentSlide - 1);
        } else if (e.key === 'ArrowRight' && currentSlide < dots.length - 1) {
            updateSliderPosition(currentSlide + 1);
        }
    });

    // Gestion du redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSliderPosition(currentSlide, false);
        }, 100);
    });

    // Initialisation
    updateSliderPosition(0, false);
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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});