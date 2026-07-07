/* GS-Petto shared product interactions */

(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const icons = {
        menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v2H4V7Zm0 4h16v2H4v-2Zm0 4h16v2H4v-2Z" fill="currentColor"/></svg>',
        moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.7A8 8 0 0 1 8.3 4a7 7 0 1 0 11.7 11.7Z" fill="currentColor"/></svg>',
        sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0-5h2v3h-2V2Zm0 17h2v3h-2v-3ZM2 11h3v2H2v-2Zm17 0h3v2h-3v-2ZM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4-2.1-2.1Zm12.1 12.1 1.4-1.4 2.1 2.1-1.4 1.4-2.1-2.1Zm2.1-13.5 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1ZM6.3 16.3l1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1Z" fill="currentColor"/></svg>',
        heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.6 10.7 19.5C5.9 15.2 3 12.6 3 8.9 3 5.9 5.3 3.6 8.3 3.6c1.7 0 3.3.8 4.3 2.1 1-1.3 2.6-2.1 4.3-2.1 3 0 5.3 2.3 5.3 5.3 0 3.7-2.9 6.3-7.7 10.6L12 20.6Zm0-2.7.2-.2c4.4-4 7.8-7 7.8-8.8 0-1.8-1.3-3.1-3.1-3.1-1.4 0-2.7.9-3.2 2.2h-2.2C11 6.7 9.7 5.8 8.3 5.8 6.5 5.8 5.2 7.1 5.2 8.9c0 1.8 3.4 4.8 6.8 8.9Z" fill="currentColor"/></svg>',
        heartFilled: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.6 10.7 19.5C5.9 15.2 3 12.6 3 8.9 3 5.9 5.3 3.6 8.3 3.6c1.7 0 3.3.8 4.3 2.1 1-1.3 2.6-2.1 4.3-2.1 3 0 5.3 2.3 5.3 5.3 0 3.7-2.9 6.3-7.7 10.6L12 20.6Z" fill="currentColor"/></svg>'
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('product-ready');
        normalizeIconButtons();
        initCursor();
        initReveal();
        initCounters();
        initFavoriteButtons();
    });

    function normalizeIconButtons() {
        document.querySelectorAll('.mobile-menu-toggle').forEach((button) => {
            button.setAttribute('aria-label', button.getAttribute('aria-label') || 'Open menu');
            button.innerHTML = icons.menu;
        });

        document.querySelectorAll('.theme-toggle').forEach((button) => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            button.innerHTML = isDark ? icons.sun : icons.moon;
            button.addEventListener('click', () => {
                window.setTimeout(() => {
                    const nowDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    button.innerHTML = nowDark ? icons.sun : icons.moon;
                }, 0);
            });
        });

        document.querySelectorAll('.pet-card-fav, .favorite-btn').forEach((button) => {
            button.setAttribute('aria-label', button.getAttribute('aria-label') || 'Save listing');
            if (!button.querySelector('svg')) button.innerHTML = icons.heart;
        });
    }

    function initCursor() {
        if (reducedMotion || !finePointer) return;

        const ring = document.createElement('div');
        const dot = document.createElement('div');
        ring.className = 'cursor-ring';
        dot.className = 'cursor-dot';
        document.body.append(ring, dot);

        let targetX = 0;
        let targetY = 0;
        let ringX = 0;
        let ringY = 0;
        let dotX = 0;
        let dotY = 0;

        window.addEventListener('mousemove', (event) => {
            targetX = event.clientX;
            targetY = event.clientY;
            document.body.classList.add('cursor-active');
        }, { passive: true });

        document.addEventListener('mouseover', (event) => {
            if (event.target.closest('a, button, [role="button"], input, select, textarea, .card, .pet-card, .category-card')) {
                document.body.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (event) => {
            if (event.target.closest('a, button, [role="button"], input, select, textarea, .card, .pet-card, .category-card')) {
                document.body.classList.remove('cursor-hover');
            }
        });

        const animate = () => {
            ringX += (targetX - ringX) * 0.18;
            ringY += (targetY - ringY) * 0.18;
            dotX += (targetX - dotX) * 0.42;
            dotY += (targetY - dotY) * 0.42;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(animate);
        };
        animate();
    }

    function initReveal() {
        const elements = document.querySelectorAll('.reveal, .reveal-stagger > *, [data-reveal], section, .card, .pet-card, .feature-card, .dashboard-card, .notification-item');
        if (reducedMotion || !('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('visible'));
            return;
        }

        elements.forEach((element) => {
            if (!element.classList.contains('reveal') && !element.closest('.reveal-stagger')) {
                element.setAttribute('data-reveal', '');
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

        elements.forEach((element) => observer.observe(element));
    }

    function initCounters() {
        if (reducedMotion || !('IntersectionObserver' in window)) return;

        const candidates = [...document.querySelectorAll('[data-count], .metric-value, .hero-stat strong, .proof-item strong')];
        const counters = candidates.filter((element) => /^\s*[\d,.]+/.test(element.textContent || ''));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.65 });

        counters.forEach((counter) => observer.observe(counter));
    }

    function animateCounter(element) {
        const original = element.textContent.trim();
        const match = original.match(/^([\d,.]+)(.*)$/);
        if (!match) return;

        const target = Number(match[1].replace(/,/g, ''));
        if (!Number.isFinite(target)) return;

        const suffix = match[2] || '';
        const duration = 900;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            element.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else element.textContent = original;
        };

        requestAnimationFrame(step);
    }

    function initFavoriteButtons() {
        document.querySelectorAll('.pet-card-fav, .favorite-btn').forEach((button) => {
            button.addEventListener('click', () => {
                window.setTimeout(() => {
                    button.innerHTML = button.classList.contains('liked') ? icons.heartFilled : icons.heart;
                }, 0);
            });
        });
    }
})();
