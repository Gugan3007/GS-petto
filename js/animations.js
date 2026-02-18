// ========================================
// PETTO - GSAP Animations
// ========================================

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// ========================================
// SPLASH SCREEN ANIMATION
// ========================================

window.addEventListener('load', () => {
    // Animate splash screen elements
    const tl = gsap.timeline();
    
    tl.from('.logo-text', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    })
    .from('.logo-tagline', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
    }, '-=0.2')
    .from('.loading-bar', {
        scaleX: 0,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.2');

    // Hide splash screen after animation (resilient fallback)
    setTimeout(() => {
        try {
            if (typeof gsap !== 'undefined') {
                gsap.to('#splash-screen', {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        document.getElementById('splash-screen').style.display = 'none';
                        initPageAnimations();
                    }
                });
            } else {
                // Fallback if GSAP is unavailable
                const splash = document.getElementById('splash-screen');
                if (splash) {
                    splash.style.transition = 'opacity 0.5s ease';
                    splash.style.opacity = 0;
                    setTimeout(() => {
                        splash.style.display = 'none';
                        initPageAnimations();
                    }, 500);
                } else {
                    initPageAnimations();
                }
            }
        } catch (err) {
            // Ensure the splash does not block the UI on unexpected errors
            const splash = document.getElementById('splash-screen');
            if (splash) {
                splash.style.opacity = 0;
                splash.style.display = 'none';
            }
            initPageAnimations();
        }
    }, 3000);

    // Force-hide splash after a longer timeout as a final safety net
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash && splash.style.display !== 'none') {
            splash.style.opacity = 0;
            splash.style.display = 'none';
            try { initPageAnimations(); } catch (e) { /* ignore */ }
        }
    }, 6000);
});

// ========================================
// PAGE ANIMATIONS
// ========================================

function initPageAnimations() {
    // Navbar entrance
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    });

    // Hero content stagger
    gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Floating pets removed for editorial tone

    // Category cards animation
    ScrollTrigger.batch('.category-card', {
        onEnter: (elements) => {
            gsap.from(elements, {
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        },
        start: 'top 80%'
    });

    // Pet cards animation
    ScrollTrigger.batch('.pet-card', {
        onEnter: (elements) => {
            gsap.from(elements, {
                y: 40,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out'
            });
        },
        start: 'top 85%'
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Adoption banner animation
    gsap.from('.adoption-banner', {
        scrollTrigger: {
            trigger: '.adoption-banner',
            start: 'top 80%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Hearts floating removed for serious tone

    // Footer entrance
    gsap.from('.footer-section', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    });
}

// ========================================
// INTERACTIVE ANIMATIONS
// ========================================

// Category card hover effect
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.category-icon'), {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.category-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Pet card hover effect
    const petCards = document.querySelectorAll('.pet-card');
    
    petCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -6,
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.35)',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
});

// ========================================
// MODAL ANIMATIONS
// ========================================

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        gsap.from(modal.querySelector('.modal-content'), {
            scale: 0.7,
            opacity: 0,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        gsap.to(modal.querySelector('.modal-content'), {
            scale: 0.7,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
            }
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    });
});

// ========================================
// PARALLAX EFFECTS
// ========================================

// Subtle hero parallax on scroll (background canvas opacity)
if (document.getElementById('background-canvas')) {
    gsap.to('#background-canvas', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        opacity: 0.04,
        ease: 'none'
    });
}

// ========================================
// PAGE TRANSITION EFFECTS
// ========================================

function createPageTransition() {
    const tl = gsap.timeline();
    
    tl.to('body', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
    })
    .set('body', { opacity: 1 })
    .from('body > *', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    return tl;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Animate element on scroll
function animateOnScroll(selector, animation) {
    gsap.utils.toArray(selector).forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            ...animation
        });
    });
}

// Stagger animation
function staggerAnimation(selector, animation, staggerAmount = 0.1) {
    gsap.from(selector, {
        ...animation,
        stagger: staggerAmount
    });
}

// Scroll progress indicator & sticky search pin
window.addEventListener('DOMContentLoaded', () => {
    const progress = document.getElementById('scroll-progress');
    if (progress) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progress.style.width = percent + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    if (typeof gsap !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.create({
            trigger: '#sticky-search',
            start: 'top top+=80',
            end: '+=600',
            pin: true,
            pinSpacing: true
        });

        // Generic section reveals
        gsap.utils.toArray('.reveal').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            });
        });
    }
});

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showModal,
        hideModal,
        createPageTransition,
        animateOnScroll,
        staggerAnimation
    };
}
