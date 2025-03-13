import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// Text splitting and animation
document.querySelectorAll('.split-text').forEach(text => {
    const split = new SplitType(text, { types: 'words, chars' });
    
    gsap.from(split.chars, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.01,
        scrollTrigger: {
            trigger: text,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
});

// Navigation douce
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Three.js background
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#00ff95',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation
const animate = () => {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.001;

    gsap.to(particlesMesh.rotation, {
        x: mouseY * 0.5,
        y: mouseX * 0.5,
        duration: 2
    });

    renderer.render(scene, camera);
};

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation des éléments work simplifiée
const workItems = document.querySelectorAll('.work-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

workItems.forEach(item => {
    observer.observe(item);
});

// Form animations
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const line = group.querySelector('.form-line');

    if (input && line) {
        input.addEventListener('focus', () => {
            gsap.to(line, {
                scaleX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(line, {
                    scaleX: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button');
        const buttonText = button.querySelector('.button-text');
        
        gsap.to(buttonText, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                buttonText.textContent = 'Envoi...';
                gsap.to(buttonText, {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        gsap.to(buttonText, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                buttonText.textContent = 'Envoyé !';
                gsap.to(buttonText, {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        contactForm.reset();
        
        setTimeout(() => {
            gsap.to(buttonText, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    buttonText.textContent = 'Envoyer';
                    gsap.to(buttonText, {
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        }, 2000);
    });
}