/* ========================================
   GS-PETTO   GS-Swipe (Tinder-style cards)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('swipe-container');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.swipe-card'));
    const loveBtn = document.getElementById('swipe-love');
    const passBtn = document.getElementById('swipe-pass');

    let startX = 0, startY = 0, currentX = 0, isDragging = false;
    let activeCard = null;
    const SWIPE_THRESHOLD = 100;

    function getTopCard() {
        const remaining = container.querySelectorAll('.swipe-card:not(.swiped)');
        return remaining.length > 0 ? remaining[remaining.length - 1] : null;
    }

    function updateStack() {
        const remaining = Array.from(container.querySelectorAll('.swipe-card:not(.swiped)'));
        remaining.forEach((card, index) => {
            const fromTop = remaining.length - 1 - index;
            if (fromTop === 0) {
                card.style.transform = '';
                card.style.opacity = '1';
                card.style.zIndex = '3';
            } else if (fromTop === 1) {
                card.style.transform = 'scale(0.95) translateY(8px)';
                card.style.opacity = '0.7';
                card.style.zIndex = '2';
            } else {
                card.style.transform = 'scale(0.9) translateY(16px)';
                card.style.opacity = '0.5';
                card.style.zIndex = '1';
            }
        });
    }

    function showOverlay(card, direction) {
        const likeOverlay = card.querySelector('.swipe-overlay.like');
        const nopeOverlay = card.querySelector('.swipe-overlay.nope');
        if (likeOverlay) likeOverlay.style.opacity = direction > 0 ? Math.min(Math.abs(currentX) / SWIPE_THRESHOLD, 1) : 0;
        if (nopeOverlay) nopeOverlay.style.opacity = direction < 0 ? Math.min(Math.abs(currentX) / SWIPE_THRESHOLD, 1) : 0;
    }

    function resetOverlays(card) {
        const overlays = card.querySelectorAll('.swipe-overlay');
        overlays.forEach(o => o.style.opacity = '0');
    }

    function swipeCard(direction) {
        const card = getTopCard();
        if (!card) return;

        card.classList.add('swiped');
        const flyX = direction * window.innerWidth * 1.5;
        const rotation = direction * 30;

        card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s';
        card.style.transform = `translateX(${flyX}px) rotate(${rotation}deg)`;
        card.style.opacity = '0';

        if (direction > 0) {
            // LOVE   trigger confetti
            if (typeof spawnConfetti === 'function') {
                const rect = card.getBoundingClientRect();
                spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        }

        setTimeout(() => {
            card.style.display = 'none';
            updateStack();

            // Reset if all cards gone
            const remaining = container.querySelectorAll('.swipe-card:not(.swiped)');
            if (remaining.length === 0) {
                setTimeout(resetDeck, 1000);
            }
        }, 600);
    }

    function resetDeck() {
        cards.forEach(card => {
            card.classList.remove('swiped');
            card.style.display = '';
            card.style.transition = '';
            card.style.transform = '';
            card.style.opacity = '';
            resetOverlays(card);
        });
        updateStack();
    }

    //    Touch/Mouse Events   
    function onStart(e) {
        activeCard = getTopCard();
        if (!activeCard) return;

        isDragging = true;
        const point = e.touches ? e.touches[0] : e;
        startX = point.clientX;
        startY = point.clientY;
        currentX = 0;

        activeCard.style.transition = 'none';
        activeCard.style.cursor = 'grabbing';
    }

    function onMove(e) {
        if (!isDragging || !activeCard) return;
        e.preventDefault();

        const point = e.touches ? e.touches[0] : e;
        currentX = point.clientX - startX;
        const rotation = currentX * 0.08;

        activeCard.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
        showOverlay(activeCard, currentX);
    }

    function onEnd() {
        if (!isDragging || !activeCard) return;
        isDragging = false;

        activeCard.style.cursor = 'grab';

        if (Math.abs(currentX) > SWIPE_THRESHOLD) {
            swipeCard(currentX > 0 ? 1 : -1);
        } else {
            // Snap back
            activeCard.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            activeCard.style.transform = '';
            resetOverlays(activeCard);
        }

        activeCard = null;
        currentX = 0;
    }

    // Bind events
    container.addEventListener('mousedown', onStart);
    container.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);

    // Button controls
    if (loveBtn) loveBtn.addEventListener('click', () => swipeCard(1));
    if (passBtn) passBtn.addEventListener('click', () => swipeCard(-1));

    // Init stack
    updateStack();
});
