/* ========================================
   PETTO CINEMATIC SCROLL STORYTELLING
   GSAP ScrollTrigger integration
   ======================================== */

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Set default easing for animations
gsap.defaults({ ease: 'power2.out', duration: 0.8 });

/**
 * Hero Section - Scroll-based fade and reveal
 */
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroContent && scrollIndicator) {
        // Fade out scroll indicator when scrolling
        gsap.to(scrollIndicator, {
            scrollTrigger: {
                trigger: 'body',
                start: 'top+=100',
                end: 'top+=200',
                scrub: 0.5,
                onUpdate: (self) => {
                    scrollIndicator.style.opacity = 1 - (self.progress * 2);
                }
            }
        });
    }
}

/**
 * Section Reveals - Text mask and fade animations
 */
function initSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Add reveal animation to section content
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 0,
                markers: false
            },
            opacity: 0,
            y: 60,
            duration: 0.8
        });
        
        // Animate section title
        const title = section.querySelector('h2, .section-title, .adoption-title');
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 25%',
                    scrub: 0,
                    markers: false
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: 0.1
            });
        }
    });
}

/**
 * Pet Cards - Staggered reveal animations
 */
function initPetCardAnimations() {
    const petCards = document.querySelectorAll('.pet-card');
    
    petCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 0,
                markers: false
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: index * 0.05
        });
        
        // Hover lift effect with momentum
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -12,
                duration: 0.3,
                overwrite: false
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                overwrite: false
            });
        });
    });
}

/**
 * Category Cards - Staggered entrance
 */
function initCategoryAnimations() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.categories-grid',
                start: 'top 75%',
                end: 'top 25%',
                scrub: 0,
                markers: false
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: index * 0.08
        });
    });
}

/**
 * Image Parallax - Subtle depth effect
 */
function initImageParallax() {
    const parallaxImages = document.querySelectorAll('.pet-image-container img, .category-card img');
    
    parallaxImages.forEach((img) => {
        const container = img.parentElement;
        
        gsap.to(img, {
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1,
                markers: false
            },
            y: -20,
            duration: 1
        });
    });
}

/**
 * Horizontal Featured Strip - ScrollTrigger pin and momentum
 */
function initHorizontalFeatured() {
    const strip = document.querySelector('.featured-strip');
    const track = document.querySelector('.featured-track');
    if (!strip || !track) return;

    // Optional GSAP horizontal scroll pin (desktop only)
    if (window.innerWidth > 1024) {
        const totalScroll = track.scrollWidth - strip.clientWidth;
        if (totalScroll > 0) {
            gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth + 80),
                ease: 'none',
                scrollTrigger: {
                    trigger: strip,
                    start: 'top top',
                    end: () => `+=${track.scrollWidth}`,
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    markers: false
                }
            });
        }
    }
}

/**
 * Button Glow Pulse Animation
 */
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-adoption');
    
    buttons.forEach((btn) => {
        // Create a subtle continuous glow pulse
        gsap.to(btn, {
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.15)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

/**
 * Scroll Progress Bar - Dynamic width based on scroll position
 */
function initScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercent = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Sticky Filter/Search - Fade in on scroll
 */
function initStickyFilterAnimations() {
    const stickySearch = document.querySelector('.sticky-search');
    
    if (stickySearch) {
        gsap.to(stickySearch, {
            scrollTrigger: {
                trigger: '.categories-section',
                start: 'top 50%',
                end: 'top 20%',
                scrub: 0,
                onEnter: () => stickySearch.classList.add('visible'),
                onLeaveBack: () => stickySearch.classList.remove('visible'),
                markers: false
            },
            opacity: 1,
            duration: 0.4
        });
    }
}

/**
 * Count-up Numbers - Animated scroll reveal
 */
function initNumberCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2;
        
        gsap.fromTo(counter, 
            { innerText: 0 },
            {
                innerText: target,
                duration: duration,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 0,
                    markers: false
                },
                onUpdate() {
                    counter.innerText = Math.floor(this.targets()[0].innerText).toLocaleString();
                }
            }
        );
    });
}

/**
 * Adoption Banner - Enhanced entrance animation
 */
function initAdoptionBannerAnimation() {
    const adoptionBanner = document.querySelector('.adoption-banner');
    
    if (adoptionBanner) {
        gsap.from(adoptionBanner, {
            scrollTrigger: {
                trigger: adoptionBanner,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 0,
                markers: false
            },
            opacity: 0,
            y: 60,
            duration: 0.8
        });
        
        // Subtle inner glow pulse
        gsap.to(adoptionBanner, {
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 60px rgba(16, 185, 129, 0.15)',
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

/**
 * Smooth Scroll Setup - Easing curves for click-based navigation
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                        autoKill: false
                    },
                    duration: 0.8,
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

/**
 * Background Lighting Shift - Dynamic per section
 */
function initBackgroundLighting() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
        const lightColor = section.getAttribute('data-light-color') || 'rgba(16, 185, 129, 0.05)';
        
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => {
                gsap.to('body', {
                    backgroundColor: lightColor,
                    duration: 0.5,
                    overwrite: false
                });
            },
            onLeaveBack: () => {
                gsap.to('body', {
                    backgroundColor: 'var(--bg)',
                    duration: 0.5,
                    overwrite: false
                });
            },
            markers: false
        });
    });
}

/**
 * Initialize ALL scroll storytelling animations
 */
function initScrollStorytellingAnimations() {
    // Only run on desktop (not mobile for performance)
    if (window.innerWidth > 1024) {
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runAnimations);
        } else {
            runAnimations();
        }
    }
}

function runAnimations() {
    try {
        initHeroAnimations();
        initSectionReveals();
        initPetCardAnimations();
        initCategoryAnimations();
        initImageParallax();
        initHorizontalFeatured();
        initButtonAnimations();
        initScrollProgressBar();
        initAdoptionBannerAnimation();
        initSmoothScroll();
        
        // Optional: only run if elements exist
        const counters = document.querySelectorAll('.counter');
        if (counters.length > 0) {
            initNumberCounters();
        }
        
        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();
        
        console.log('✓ Cinematic scroll storytelling initialized');
    } catch (error) {
        console.warn('Scroll animation setup:', error.message);
    }
}

// Initialize on page load
initScrollStorytellingAnimations();

// Refresh on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
