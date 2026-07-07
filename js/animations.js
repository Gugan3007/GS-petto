/* ========================================
   GS-PETTO   Animations (GSAP + ScrollTrigger)
   Uses GSAP for parallax and scroll reveals
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Only run if GSAP is loaded
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger
    if (gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    //    Hero Text Stagger Animation   
    const heroText = document.querySelector('.hero-headline');
    const heroSub = document.querySelector('.hero-subtitle');
    const heroCtas = document.querySelector('.hero-ctas');

    if (heroText) {
        gsap.from(heroText, {
            y: 40, opacity: 0, duration: 0.8,
            ease: 'power3.out'
        });
    }
    if (heroSub) {
        gsap.from(heroSub, {
            y: 30, opacity: 0, duration: 0.8,
            delay: 0.2, ease: 'power3.out'
        });
    }
    if (heroCtas) {
        gsap.from(heroCtas, {
            y: 20, opacity: 0, duration: 0.6,
            delay: 0.4, ease: 'power3.out'
        });
    }

    //    Section Titles   
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.from(title, {
            y: 30, opacity: 0, duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                once: true
            }
        });
    });

    //    Masonry Cards Stagger   
    const masonryCards = document.querySelectorAll('.masonry-grid > .pet-card');
    if (masonryCards.length > 0) {
        gsap.from(masonryCards, {
            y: 50, opacity: 0, duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.masonry-grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    //    Bento Items Pop In   
    const bentoItems = document.querySelectorAll('.bento-item');
    if (bentoItems.length > 0) {
        gsap.from(bentoItems, {
            scale: 0.8, opacity: 0, duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.bento-grid',
                start: 'top 85%',
                once: true
            }
        });
    }

    //    Category Cards   
    const catCards = document.querySelectorAll('.category-card');
    if (catCards.length > 0) {
        gsap.from(catCards, {
            y: 30, opacity: 0, duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.categories-bento',
                start: 'top 85%',
                once: true
            }
        });
    }

    //    Stories Slide In   
    const stories = document.querySelectorAll('.story-item');
    if (stories.length > 0) {
        gsap.from(stories, {
            x: 30, opacity: 0, duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.stories-row',
                start: 'top 90%',
                once: true
            }
        });
    }

    //    Parallax Hero on Pet Details   
    const parallaxHero = document.querySelector('.parallax-hero');
    const heroImage = parallaxHero?.querySelector('img');

    if (parallaxHero && heroImage && typeof ScrollTrigger !== 'undefined') {
        gsap.to(heroImage, {
            scale: 1.15,
            filter: 'blur(6px)',
            scrollTrigger: {
                trigger: parallaxHero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5
            }
        });

        // Fade out overlay
        const overlay = parallaxHero.querySelector('.parallax-hero-overlay');
        if (overlay) {
            gsap.to(overlay, {
                opacity: 0.7,
                scrollTrigger: {
                    trigger: parallaxHero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });
        }
    }

    //    Adoption Grid Stagger   
    const adoptCards = document.querySelectorAll('.adopt-grid > .pet-card');
    if (adoptCards.length > 0) {
        gsap.from(adoptCards, {
            y: 40, opacity: 0, duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.adopt-grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    //    Loading Animation (Dog Chasing Tail)   
    function showLoading() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.display = 'flex';
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    loader.style.opacity = '1';
                }, 300);
            }, 1200);
        }
    }
    showLoading();
});
