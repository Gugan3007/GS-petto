/* ========================================
   PETTO CINEMATIC PREMIUM MICROINTERACTIONS
   Advanced hover states, feedback, and transitions
   ======================================== */

/**
 * Search Input - Focus state with glow
 */
class SearchInput {
    constructor(selector) {
        this.input = document.querySelector(selector);
        if (!this.input) return;
        
        this.input.addEventListener('focus', () => this.onFocus());
        this.input.addEventListener('blur', () => this.onBlur());
    }
    
    onFocus() {
        gsap.to(this.input, {
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            duration: 0.3,
            overwrite: false
        });
    }
    
    onBlur() {
        gsap.to(this.input, {
            boxShadow: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            duration: 0.3,
            overwrite: false
        });
    }
}

/**
 * Filter Button Toggle - Glow on select
 */
class FilterButton {
    constructor(selector) {
        this.buttons = document.querySelectorAll(selector);
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleFilter(e.target));
        });
    }
    
    toggleFilter(btn) {
        this.buttons.forEach(b => {
            if (b !== btn) {
                gsap.to(b, {
                    boxShadow: 'none',
                    background: 'transparent',
                    duration: 0.2
                });
            }
        });
        
        if (btn.classList.contains('active')) {
            gsap.to(btn, {
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                background: 'rgba(16, 185, 129, 0.15)',
                duration: 0.2
            });
        }
    }
}

/**
 * Favorite Button - Heart pulse animation
 */
class FavoriteButton {
    constructor(selector) {
        this.buttons = document.querySelectorAll(selector);
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleFavorite(e.target));
        });
    }
    
    toggleFavorite(btn) {
        const isFavorited = btn.classList.toggle('favorited');
        
        if (isFavorited) {
            // Heart beat animation
            gsap.timeline()
                .to(btn, {
                    scale: 1.3,
                    duration: 0.1
                }, 0)
                .to(btn, {
                    scale: 1.1,
                    duration: 0.15
                })
                .to(btn, {
                    scale: 1.2,
                    duration: 0.1
                })
                .to(btn, {
                    scale: 1,
                    duration: 0.15
                });
            
            // Particle effect
            this.createPulseParticle(btn);
        } else {
            gsap.to(btn, {
                scale: 0.9,
                duration: 0.1,
                onComplete: () => {
                    gsap.to(btn, {
                        scale: 1,
                        duration: 0.1
                    });
                }
            });
        }
    }
    
    createPulseParticle(btn) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';
        particle.style.width = '20px';
        particle.style.height = '20px';
        particle.style.left = btn.offsetLeft + 'px';
        particle.style.top = btn.offsetTop + 'px';
        particle.style.background = 'rgba(16, 185, 129, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '1';
        
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            x: Math.cos(Math.random() * Math.PI * 2) * 40,
            y: Math.sin(Math.random() * Math.PI * 2) * 40,
            opacity: 0,
            scale: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

/**
 * Modal Animations - Smooth entrance and exit
 */
class Modal {
    constructor(selector) {
        this.modal = document.querySelector(selector);
        this.closeBtn = this.modal?.querySelector('.close-modal');
        
        if (this.modal) {
            this.closeBtn?.addEventListener('click', () => this.close());
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
        }
    }
    
    open() {
        if (!this.modal) return;
        
        this.modal.style.display = 'flex';
        
        // Background fade
        gsap.from(this.modal, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            duration: 0.3
        });
        
        // Content scale and fade
        const content = this.modal.querySelector('.modal-content');
        if (content) {
            gsap.from(content, {
                scale: 0.95,
                opacity: 0,
                duration: 0.3,
                ease: 'back.out'
            });
        }
    }
    
    close() {
        if (!this.modal) return;
        
        const content = this.modal.querySelector('.modal-content');
        
        gsap.timeline()
            .to(content, {
                scale: 0.95,
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            }, 0)
            .to(this.modal, {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                duration: 0.2,
                onComplete: () => {
                    this.modal.style.display = 'none';
                }
            }, 0);
    }
}

/**
 * Tab Navigation - Smooth content transitions
 */
class TabNavigation {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.tabs = this.container.querySelectorAll('[role="tab"]');
        this.panels = this.container.querySelectorAll('[role="tabpanel"]');
        
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.selectTab(tab));
        });
    }
    
    selectTab(selectedTab) {
        // Deactivate all tabs
        this.tabs.forEach(tab => {
            gsap.to(tab, {
                opacity: 0.6,
                duration: 0.2
            });
            tab.setAttribute('aria-selected', 'false');
        });
        
        // Activate selected tab
        selectedTab.setAttribute('aria-selected', 'true');
        gsap.to(selectedTab, {
            opacity: 1,
            duration: 0.2
        });
        
        // Hide all panels
        this.panels.forEach(panel => {
            gsap.to(panel, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.2,
                onStart: () => {
                    panel.style.pointerEvents = 'none';
                }
            });
        });
        
        // Show selected panel
        const panelId = selectedTab.getAttribute('aria-controls');
        const selectedPanel = document.getElementById(panelId);
        if (selectedPanel) {
            gsap.to(selectedPanel, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3,
                onStart: () => {
                    selectedPanel.style.pointerEvents = 'auto';
                }
            });
        }
    }
}

/**
 * Notification System - Toast messages with animations
 */
class Notification {
    static show(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '16px 24px';
        notification.style.background = type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)';
        notification.style.color = '#fff';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
        notification.style.fontSize = '14px';
        notification.style.fontWeight = '500';
        notification.style.zIndex = '10000';
        notification.style.maxWidth = '400px';
        
        document.body.appendChild(notification);
        
        // Entrance animation
        gsap.from(notification, {
            x: 400,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Auto-dismiss
        gsap.to(notification, {
            delay: duration / 1000,
            x: 400,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }
}

/**
 * Smooth Number Animation for stats/counters
 */
class NumberCounter {
    static animate(element, start, end, duration = 1, format = (n) => n.toLocaleString()) {
        gsap.fromTo(element, 
            { innerText: start },
            {
                innerText: end,
                duration: duration,
                ease: 'power2.out',
                onUpdate() {
                    element.innerText = format(Math.floor(this.targets()[0].innerText));
                }
            }
        );
    }
}

/**
 * Image Lazy Load with fade-in
 */
class LazyLoadImage {
    constructor(selector) {
        this.images = document.querySelectorAll(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        this.images.forEach(img => observer.observe(img));
    }
    
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;
        
        img.src = src;
        gsap.from(img, {
            opacity: 0,
            duration: 0.4,
            onStart: () => {
                img.style.opacity = '0';
            }
        });
        
        gsap.to(img, {
            opacity: 1,
            duration: 0.4
        });
    }
}

/**
 * Floating Label Input
 */
class FloatingLabel {
    constructor(containerSelector) {
        this.inputs = document.querySelectorAll(`${containerSelector} input, ${containerSelector} textarea`);
        
        this.inputs.forEach(input => {
            input.addEventListener('focus', () => this.floatLabel(input));
            input.addEventListener('blur', () => this.unfloatLabel(input));
            input.addEventListener('input', () => {
                if (input.value) this.floatLabel(input);
                else this.unfloatLabel(input);
            });
        });
    }
    
    floatLabel(input) {
        const label = input.parentElement.querySelector('label');
        if (!label) return;
        
        gsap.to(label, {
            y: -24,
            fontSize: '12px',
            color: 'var(--accent)',
            duration: 0.2
        });
    }
    
    unfloatLabel(input) {
        if (input.value) return;
        
        const label = input.parentElement.querySelector('label');
        if (!label) return;
        
        gsap.to(label, {
            y: 0,
            fontSize: '14px',
            color: 'var(--text-muted)',
            duration: 0.2
        });
    }
}

/**
 * Initialize All Microinteractions
 */
function initMicrointeractions() {
    // Search inputs
    new SearchInput('input[type="text"][placeholder*="Search"]');
    
    // Favorite buttons
    new FavoriteButton('.pet-favorite, [data-action="favorite"]');
    
    // Filter buttons
    new FilterButton('[data-action="filter"], .filter-btn');
    
    // Modals
    const loginModal = new Modal('#login-modal');
    const signupModal = new Modal('#signup-modal');
    
    // Tab navigation
    new TabNavigation('[role="tablist"]');
    
    // Lazy load images
    new LazyLoadImage('img[data-src]');
    
    // Floating labels
    new FloatingLabel('.form-group');
    
    // Expose utilities globally for use in HTML onclick handlers
    window.openModal = (id) => new Modal(`#${id}`).open();
    window.showNotification = (msg, type = 'success') => Notification.show(msg, type);
    window.animateNumber = (elem, start, end, duration) => NumberCounter.animate(elem, start, end, duration);
    
    console.log('✓ Premium microinteractions initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMicrointeractions);
} else {
    initMicrointeractions();
}
