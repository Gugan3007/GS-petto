/* Lightweight decorative background for legacy pages */
(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('background-canvas');
        if (!canvas || reducedMotion) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particles = Array.from({ length: 24 }, (_, index) => ({
            x: Math.random(),
            y: Math.random(),
            r: 2 + (index % 4),
            speed: 0.00025 + Math.random() * 0.00035
        }));

        const resize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
        };

        const draw = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 78, 100, 0.08)';
            particles.forEach((particle) => {
                const x = particle.x * canvas.width;
                const y = ((particle.y + time * particle.speed) % 1) * canvas.height;
                ctx.beginPath();
                ctx.arc(x, y, particle.r * window.devicePixelRatio, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        };

        canvas.setAttribute('aria-hidden', 'true');
        canvas.style.position = 'fixed';
        canvas.style.inset = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        resize();
        window.addEventListener('resize', resize, { passive: true });
        requestAnimationFrame(draw);
    });
})();
