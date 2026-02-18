// ========================================
// PETTO - Canvas Background Animation
// Floating paws, pets, and particles
// ========================================

class CanvasBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.paws = [];
        this.pets = [];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.body.scrollHeight;
    }

    init() {
        // Create paw particles
        const pawCount = Math.floor((this.canvas.width * this.canvas.height) / 50000);
        for (let i = 0; i < pawCount; i++) {
            this.paws.push(new PawParticle(this.canvas));
        }

        // Create floating particles
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 30000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new FloatingParticle(this.canvas));
        }

        // Create pet emojis
        const petCount = Math.floor((this.canvas.width * this.canvas.height) / 100000);
        for (let i = 0; i < petCount; i++) {
            this.pets.push(new PetEmoji(this.canvas));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        // Update and draw paws
        this.paws.forEach(paw => {
            paw.update();
            paw.draw(this.ctx);
        });

        // Update and draw pets
        this.pets.forEach(pet => {
            pet.update();
            pet.draw(this.ctx);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// FLOATING PARTICLE CLASS
// ========================================

class FloatingParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        
        // Color variations (soft pastels)
        const colors = [
            'rgba(255, 107, 157, ',  // Pink
            'rgba(78, 205, 196, ',   // Teal
            'rgba(255, 230, 109, ',  // Yellow
            'rgba(149, 225, 211, ',  // Mint
            'rgba(243, 129, 129, '   // Coral
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;

        // Gentle pulsing effect
        this.opacity += Math.sin(Date.now() * 0.001) * 0.01;
        if (this.opacity > 0.7) this.opacity = 0.7;
        if (this.opacity < 0.2) this.opacity = 0.2;
    }

    draw(ctx) {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ========================================
// PAW PARTICLE CLASS
// ========================================

class PawParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 20 + 15;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset when goes off screen
        if (this.y > this.canvas.height + 50) {
            this.y = -50;
            this.x = Math.random() * this.canvas.width;
        }
        if (this.x > this.canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = this.canvas.width + 50;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.font = `${this.size}px Arial`;
        ctx.globalAlpha = this.opacity;
        ctx.fillText('🐾', -this.size / 2, this.size / 2);
        ctx.restore();
    }
}

// ========================================
// PET EMOJI CLASS
// ========================================

class PetEmoji {
    constructor(canvas) {
        this.canvas = canvas;
        this.emojis = ['🐶', '🐱', '🐦', '🐠', '🐰', '🐹', '🐨', '🦊'];
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 25 + 20;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.2 + 0.1;
        this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
        // Floating movement with wobble
        this.wobble += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobble) * 0.5;
        this.y += this.speedY + Math.cos(this.wobble) * 0.5;

        // Wrap around screen
        if (this.x > this.canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = this.canvas.width + 50;
        if (this.y > this.canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = this.canvas.height + 50;
    }

    draw(ctx) {
        ctx.save();
        ctx.font = `${this.size}px Arial`;
        ctx.globalAlpha = this.opacity;
        
        // Add slight rotation based on wobble
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.sin(this.wobble) * 0.2);
        ctx.fillText(this.emoji, -this.size / 2, this.size / 2);
        
        ctx.restore();
    }
}

// ========================================
// INITIALIZE BACKGROUND
// ========================================

let backgroundAnimation;

window.addEventListener('load', () => {
    // Small delay to ensure canvas is ready
    setTimeout(() => {
        backgroundAnimation = new CanvasBackground('background-canvas');
    }, 100);
});

// Update canvas height on scroll
let resizeTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (backgroundAnimation) {
            backgroundAnimation.resize();
        }
    }, 100);
}, { passive: true });
