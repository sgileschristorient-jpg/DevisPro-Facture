/**
 * DevisPro - Gallery Logic (2026 Edition)
 * Handles filtering and lightbox modal for invoice templates.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. FILTERING LOGIC
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const templateCards = document.querySelectorAll('.template-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active UI
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter Animation
            templateCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    gsap.fromTo(card, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ----------------------------------------------------
    // 2. LIGHTBOX MODAL LOGIC
    // ----------------------------------------------------
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        lightboxModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            const src = button.getAttribute('data-src');
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');

            const modalImg = lightboxModal.querySelector('#lightboxImg');
            const modalTitle = lightboxModal.querySelector('#lightboxTitle');
            const modalDesc = lightboxModal.querySelector('#lightboxDesc');

            modalImg.src = src;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;

            // Entrance Animation
            gsap.fromTo(modalImg, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
            gsap.fromTo([modalTitle, modalDesc], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3 });
        });
    }
});
