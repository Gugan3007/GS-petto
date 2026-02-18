// ========================================
// PETTO - Main JavaScript
// Core functionality and interactions
// ========================================

// ========================================
// GLOBAL STATE
// ========================================

let currentUser = null;
let favorites = [];
let cart = [];

// ========================================
// DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadFeaturedPets();
    setupEventListeners();
    setupMobileMenu();
    setupModals();
    loadUserData();
});

// ========================================
// INITIALIZATION
// ========================================

function initializeApp() {
    console.log('Petto - Pet Marketplace Initialized');
    
    // Check if user is logged in
    const savedUser = localStorage.getItem('pettoUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
    
    // Load favorites
    const savedFavorites = localStorage.getItem('pettoFavorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
}

// ========================================
// LOAD FEATURED PETS
// ========================================

function loadFeaturedPets() {
    const petsGrid = document.getElementById('featured-pets');
    const track = document.getElementById('featured-track');
    
    // Grid population
    if (petsGrid) {
        petsGrid.innerHTML = '';
        petData.featured.forEach(pet => {
            const petCard = createPetCard(pet);
            petsGrid.appendChild(petCard);
        });
    }
    
    // Horizontal track population
    if (track) {
        track.innerHTML = '';
        petData.featured.slice(0, 12).forEach(pet => {
            const petCard = createPetCard(pet);
            petCard.classList.add('pet-card--strip');
            track.appendChild(petCard);
        });
    }
}

// ========================================
// CREATE PET CARD
// ========================================

function createPetCard(pet) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.dataset.petId = pet.id;
    
    const isFavorite = favorites.includes(pet.id);
    const favoriteIcon = isFavorite
        ? '<svg class="icon-heart" viewBox="0 0 24 24" width="20" height="20"><path d="M12 21s-6.6-4.35-9.4-7.15C1.2 12.4 1 10.9 1.8 9.7 2.6 8.5 4 8 5.3 8.4c1 .3 1.9 1 2.4 2 .5-1 1.4-1.7 2.4-2 1.3-.4 2.7.1 3.5 1.3.8 1.2.6 2.8-.8 4.2C18.6 16.65 12 21 12 21z" fill="currentColor"/></svg>'
        : '<svg class="icon-heart" viewBox="0 0 24 24" width="20" height="20"><path d="M12.1 8.64l-.1.1-.1-.1C9.24 6 5.11 6.61 3.1 9.39 1.08 12.17 2.08 15.91 5.2 18.02L12 22l6.8-3.98c3.12-2.11 4.12-5.85 2.1-8.63-2.01-2.78-6.14-3.39-8.9-1.75z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
    
    const priceDisplay = pet.price === 0 ? 'Free Adoption' : `₹${pet.price.toLocaleString('en-IN')}`;
    const adoptionBadge = pet.adoption ? '<span class="adoption-badge"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C15.46 5.99 16.96 5 18.5 5 20.58 5 22 6.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" fill="currentColor"/></svg> Good Heart</span>' : '';
    
    card.innerHTML = `
        <div class="pet-image-container image-zoom">
            <img src="${pet.image}" alt="${pet.name}" class="pet-image" loading="lazy">
            ${adoptionBadge}
        </div>
        <div class="pet-info">
            <div class="pet-header">
                <h3 class="pet-name">${pet.name}</h3>
                <span class="pet-favorite" data-pet-id="${pet.id}">${favoriteIcon}</span>
            </div>
            <div class="pet-details">
                <p class="pet-detail"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M9 6c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2 0.9 2 2 2zm6 0c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2 0.9 2 2 2zm3 13c0-2-1.8-4-4-4s-4 2-4 4h-2c0-3.3 2.7-6 6-6s6 2.7 6 6h-2z" fill="currentColor"/></svg> ${pet.breed}</p>
                <p class="pet-detail"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 4h10v2H7V7zm0 4h10v2H7v-2zm0 4h10v2H7v-2z" fill="currentColor"/></svg> ${pet.age}</p>
                <p class="pet-detail"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 2a7 7 0 017 7v5a5 5 0 01-10 0V9a7 7 0 017-7z" fill="currentColor"/></svg> ${pet.gender}</p>
                ${pet.vaccination ? '<p class="pet-detail"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M21 5l-2-2-7 7-3-3-2 2 5 5 9-9z" fill="currentColor"/></svg> Vaccinated</p>' : ''}
            </div>
            <div class="pet-footer">
                <div>
                    <p class="pet-price">${priceDisplay}</p>
                    <p class="pet-location"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor"/></svg> ${pet.location}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to view details
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('pet-favorite')) {
            viewPetDetails(pet.id);
        }
    });
    
    return card;
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Navigation links
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('login-modal');
        });
    }
    
    // Favorite buttons (event delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('pet-favorite')) {
            e.stopPropagation();
            const petId = parseInt(e.target.dataset.petId);
            toggleFavorite(petId, e.target);
        }
    });
    
    // Hero buttons
    const explorePetsBtn = document.querySelector('.btn-primary');
    const adoptNowBtn = document.querySelector('.btn-secondary');
    
    if (explorePetsBtn) {
        explorePetsBtn.addEventListener('click', () => {
            scrollToSection('.featured-section');
        });
    }
    
    if (adoptNowBtn) {
        adoptNowBtn.addEventListener('click', () => {
            window.location.href = 'adoption.html';
        });
    }
    
    // Adoption banner button
    const adoptionBtn = document.querySelector('.btn-adoption');
    if (adoptionBtn) {
        adoptionBtn.addEventListener('click', () => {
            window.location.href = 'adoption.html';
        });
    }
}

// ========================================
// MOBILE MENU
// ========================================

function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate icon with SVGs
            const iconClose = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M18.3 5.71L12 12.01 5.7 5.71 4.29 7.12 10.59 13.42 4.29 19.72 5.7 21.13 12 14.83 18.3 21.13 19.71 19.72 13.41 13.42 19.71 7.12z" fill="currentColor"/></svg>';
            const iconMenu = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor"/></svg>';
            menuToggle.innerHTML = navLinks.classList.contains('active') ? iconClose : iconMenu;
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const iconMenu = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor"/></svg>';
                menuToggle.innerHTML = iconMenu;
            }
        });
    }
}

// ========================================
// MODAL FUNCTIONALITY
// ========================================

function setupModals() {
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });
    
    // Close modal on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal.id);
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                hideModal(activeModal.id);
            }
        }
    });
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    console.log('Searching for:', query);
    // In production, this would filter pets and navigate to results page
    alert(`Searching for: "${query}"\n\nThis feature will show filtered results!`);
}

// ========================================
// CATEGORY FILTER
// ========================================

function filterByCategory(category) {
    console.log('Filtering by category:', category);
    // In production, navigate to category page
    alert(`Viewing ${category}\n\nThis will show all pets in this category!`);
}

// ========================================
// FAVORITE FUNCTIONALITY
// ========================================

function toggleFavorite(petId, element) {
    const index = favorites.indexOf(petId);
    
    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        element.innerHTML = '<svg class="icon-heart" viewBox="0 0 24 24" width="20" height="20"><path d="M12.1 8.64l-.1.1-.1-.1C9.24 6 5.11 6.61 3.1 9.39 1.08 12.17 2.08 15.91 5.2 18.02L12 22l6.8-3.98c3.12-2.11 4.12-5.85 2.1-8.63-2.01-2.78-6.14-3.39-8.9-1.75z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
        showNotification('Removed from favorites', 'info');
    } else {
        // Add to favorites
        favorites.push(petId);
        element.innerHTML = '<svg class="icon-heart" viewBox="0 0 24 24" width="20" height="20"><path d="M12 21s-6.6-4.35-9.4-7.15C1.2 12.4 1 10.9 1.8 9.7 2.6 8.5 4 8 5.3 8.4c1 .3 1.9 1 2.4 2 .5-1 1.4-1.7 2.4-2 1.3-.4 2.7.1 3.5 1.3.8 1.2.6 2.8-.8 4.2C18.6 16.65 12 21 12 21z" fill="currentColor"/></svg>';
        showNotification('Added to favorites!', 'success');
        
        // High-contrast highlight without bounce
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
    
    // Save to localStorage
    localStorage.setItem('pettoFavorites', JSON.stringify(favorites));
}

// ========================================
// PET DETAILS VIEW
// ========================================

function viewPetDetails(petId) {
    console.log('Viewing pet details for ID:', petId);
    // In production, navigate to pet detail page
    const pet = [...petData.featured, ...petData.adoption].find(p => p.id === petId);
    
    if (pet) {
        alert(`${pet.name}\n\n${pet.description}\n\nPrice: ${pet.price === 0 ? 'Free Adoption' : '₹' + pet.price.toLocaleString('en-IN')}\nLocation: ${pet.location}\n\nThis will open the detailed pet page!`);
    }
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: #17181A;
        color: #F5F7FA;
        padding: 14px 20px;
        border-radius: 6px;
        border-left: 3px solid ${type === 'success' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.2)'};
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.45);
        z-index: 10000;
        font-weight: 700;
        transition: opacity 0.2s ease, transform 0.2s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// ========================================
// USER DATA
// ========================================

function loadUserData() {
    // Load user preferences, saved searches, etc.
    const theme = localStorage.getItem('pettoTheme') || 'light';
    document.body.setAttribute('data-theme', theme);
}

function updateUIForLoggedInUser() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn && currentUser) {
        loginBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" style="margin-right:8px"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 3-9 6v2h18v-2c0-3-4-6-9-6z" fill="currentColor"/></svg>${currentUser.name}`;
        loginBtn.href = '#profile';
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// LAZY LOADING IMAGES
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    // In production, send to error tracking service
});

// ========================================
// EXPORT FUNCTIONS
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadFeaturedPets,
        createPetCard,
        toggleFavorite,
        viewPetDetails,
        showNotification
    };
}

console.log('Petto is ready! Welcome to the pet marketplace.');
