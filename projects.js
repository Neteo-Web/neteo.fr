// Données des projets
const projects = [
    {
        id: 1,
        title: "TomNJerry ($TNJ)",
        description: "Site vitrine d'un projet crypto memecoin",
        image: "./projects/tomnjerry.fans/images/PFP500.png",
        url: "https://tomnjerry.fans"  // Projet externe
    },
    {
        id: 2,
        title: "DMS38",
        description: "Site vitrine d'une société de décapage industriel",
        image: "./projects/dms38.fr/images/logo-DMS38-NOIR.png",
        path: "./projects/dms38.fr/index.html"  // Projet externe
    },
    {
        id: 3,
        title: "PandaFi ($PFT)",
        description: "Site Web3 d'un protocol crypto",
        image: "./projects/pandafi.io/images/panda_logo_square.png",
        path: "./projects/pandafi.io/index.html"  // Projet local
    }
];

// Données des logos
const logos = [
    {
        id: 1,
        title: "Brand Identity",
        description: "Logo minimaliste pour une startup tech",
        image: "./projects/placeholder/poop.jpg"
    },
    {
        id: 2,
        title: "Restaurant Logo",
        description: "Design élégant pour un restaurant gastronomique",
        image: "./projects/placeholder/poop.jpg"
    },
    {
        id: 3,
        title: "E-commerce Brand",
        description: "Logo moderne pour une boutique en ligne",
        image: "./projects/placeholder/poop.jpg"
    }
];

// Afficher les projets
function displayProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        
        projectCard.addEventListener('click', () => openProject(project));
        projectsGrid.appendChild(projectCard);
    });
}

// Afficher les logos
function displayLogos() {
    const logosGrid = document.getElementById('logos-grid');
    if (!logosGrid) return;
    
    logos.forEach(logo => {
        const logoCard = document.createElement('div');
        logoCard.className = 'logo-card';
        logoCard.innerHTML = `
            <img src="${logo.image}" alt="${logo.title}">
            <div class="logo-info">
                <h3>${logo.title}</h3>
                <p>${logo.description}</p>
            </div>
        `;
        
        logoCard.addEventListener('click', () => openLogo(logo));
        logosGrid.appendChild(logoCard);
    });
}

// Gérer la modal des projets
const projectModal = document.getElementById('project-modal');
const projectCloseBtn = projectModal?.querySelector('.close');
const projectFrame = document.getElementById('project-frame');

function openProject(project) {
    if (!projectModal || !projectFrame) return;
    projectModal.style.display = 'block';
    projectFrame.src = project.path || project.url;
}

if (projectCloseBtn) {
    projectCloseBtn.onclick = function() {
        projectModal.style.display = 'none';
        projectFrame.src = '';
    }
}

// Gérer la modal des logos
const logoModal = document.getElementById('logo-modal');
const logoCloseBtn = logoModal?.querySelector('.close');
const logoFrame = document.getElementById('logo-frame');
const logoTitle = logoModal?.querySelector('.logo-modal-info h3');
const logoDescription = logoModal?.querySelector('.logo-modal-info p');

function openLogo(logo) {
    if (!logoModal || !logoFrame || !logoTitle || !logoDescription) return;
    logoModal.style.display = 'block';
    logoFrame.src = logo.image;
    logoTitle.textContent = logo.title;
    logoDescription.textContent = logo.description;
}

if (logoCloseBtn) {
    logoCloseBtn.onclick = function() {
        logoModal.style.display = 'none';
    }
}

// Fermer les modals en cliquant en dehors
window.onclick = function(event) {
    if (event.target === projectModal) {
        projectModal.style.display = 'none';
        projectFrame.src = '';
    }
    if (event.target === logoModal) {
        logoModal.style.display = 'none';
    }
}

// Initialiser l'affichage
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    displayLogos();
});