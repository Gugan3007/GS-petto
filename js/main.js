/* ========================================
   GS-PETTO   Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    //    Dark Mode Toggle   
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('gs-petto-theme');
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.add('theme-transitioning');
            const isDark = html.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                html.removeAttribute('data-theme');
                localStorage.setItem('gs-petto-theme', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('gs-petto-theme', 'dark');
            }

            setTimeout(() => html.classList.remove('theme-transitioning'), 500);
        });
    }

    //    Mobile Menu Toggle   
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('open');
            }
        });
    }

    //    Navbar Scroll Effect   
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    //    Favorite Button Toggle   
    document.querySelectorAll('.pet-card-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('liked');
        });
    });

    //    Scroll Reveal Animation   
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger > *');
    
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    //    Button Scale Effect (global)   
    document.querySelectorAll('.btn, .category-card, .pet-card').forEach(el => {
        el.addEventListener('mousedown', () => {
            el.style.transform = 'scale(0.95)';
            el.style.transition = 'transform 80ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        el.addEventListener('mouseup', () => {
            el.style.transform = '';
            el.style.transition = '';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.transition = '';
        });
    });

    //    Category Card Click   
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = 'browse.html';
        });
    });
});

//    Subtle feedback particles, intentionally text-free   
function spawnConfetti(x, y) {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('span');
        particle.className = 'confetti-paw';
        particle.style.left = (x + (Math.random() - 0.5) * 80) + 'px';
        particle.style.top = (y - 20) + 'px';
        particle.style.width = particle.style.height = (6 + Math.random() * 8) + 'px';
        particle.style.borderRadius = '999px';
        particle.style.background = Math.random() > 0.5 ? 'var(--coral)' : 'var(--teal)';
        particle.style.animationDuration = (1 + Math.random() * 1) + 's';
        particle.style.animationDelay = (Math.random() * 0.3) + 's';
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2500);
    }
}
