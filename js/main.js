/**
 * ----------------------------------------------------
 * JAVASCRIPT: LUXURY UX / GSAP & THREE.JS
 * ----------------------------------------------------
 */

// ----------------------------------------------------
// 1. CUSTOM CURSOR
// ----------------------------------------------------
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = window.innerWidth / 2;
let followerY = window.innerHeight / 2;

// Smooth follow
function animateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    if(cursorFollower) {
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
    }
    
    requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    }
});

// Cursor active states on interactive elements
const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .magnetic-text');
hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.style.opacity = '0'; // Hide dot when hovered
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.style.opacity = '1';
    });
});

// Hide completely on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    if(cursor) cursor.style.display = 'none';
    if(cursorFollower) cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// ----------------------------------------------------
// 2. MAGNETIC BUTTONS (LUXURY UX)
// ----------------------------------------------------
const magneticButtons = document.querySelectorAll('.magnetic-btn, .magnetic-wrap');

magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', function(e) {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    btn.addEventListener('mouseout', function() {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// ----------------------------------------------------
// 3. GSAP & SCROLLTRIGGER ANIMATIONS
// ----------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Reveal Text (Fades and Slides up)
gsap.utils.toArray('.gs-reveal').forEach((elem) => {
    gsap.fromTo(elem, 
        { autoAlpha: 0, y: 50 }, 
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power4.out", scrollTrigger: {
            trigger: elem,
            start: "top 85%"
        }
    });
});

// Staggered Reveals
gsap.utils.toArray('.gs-reveal-up').forEach((elem) => {
    gsap.fromTo(elem, 
        { autoAlpha: 0, y: 30 }, 
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: {
            trigger: elem,
            start: "top 85%"
        }
    });
    // Features Reveal
    gsap.utils.toArray('.feature-card').forEach(function(card, i) {
        ScrollTrigger.create({
            trigger: card,
            start: "top 90%",
            onEnter: function() {
                gsap.fromTo(card, {y: 50, autoAlpha: 0}, {
                    duration: 0.8, y: 0, autoAlpha: 1, ease: "back.out(1.7)", delay: (i % 3) * 0.1, overwrite: "auto"
                });
            }
        });
    });

    // Custom Counters Trigger
    gsap.utils.toArray('.counter-val').forEach(function(counter) {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: function() {
                let target = parseInt(counter.getAttribute('data-target'));
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 3,
                    snap: { innerHTML: 1 },
                    ease: "power2.out",
                    onUpdate: function() {
                        counter.innerHTML = Math.round(counter.innerHTML).toLocaleString('fr-FR');
                    }
                });
            }
        });
    });
}); // End DOMContentLoaded

// Staggered list items
const staggerContainers = document.querySelectorAll('.stagger-container');
staggerContainers.forEach(container => {
    gsap.fromTo(container.querySelectorAll('.stagger-item'), 
        { autoAlpha: 0, x: -30 }, 
        { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", scrollTrigger: {
            trigger: container,
            start: "top 80%"
        }
    });
});

// Parallax Hero Image mapping mouse scroll
// Mouse Interactive Parallax for Hero Image (Desktop Only)
if (window.innerWidth > 991) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        gsap.to('.parallax-hero-img', {
            rotationY: x,
            rotationX: -y,
            duration: 2,
            ease: "power2.out"
        });
    });
}

if (window.innerWidth > 991) {
    gsap.to('.parallax-hero-img', {
        y: 100,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

// Feature Grid (Scale in)
gsap.fromTo('.feature-card', 
    { autoAlpha: 0, scale: 0.9 }, 
    { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)", scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%"
    }
});

// Dashboard Image cinematic zoom on scroll
gsap.fromTo('.parallax-dashboard',
    { scale: 0.9, y: 50 },
    { scale: 1.05, y: -20, ease: "none", scrollTrigger: {
        trigger: "#merchant-value",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// Pricing Cards Sequential Reveal
gsap.fromTo('.price-card-item',
    { autoAlpha: 0, y: 50 },
    { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: {
        trigger: ".pricing-grid",
        start: "top 80%"
    }
});



// ----------------------------------------------------
// 4. THREE.JS BACKGROUND ANIMATION
// ----------------------------------------------------
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x020408, 0.0012);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

const colorPrimary = new THREE.Color(0x6366F1); // Indigo
const colorPurple = new THREE.Color(0xE2E8F0);  // Platinum

for(let i = 0; i < particlesCount * 3; i+=3) {
    posArray[i] = (Math.random() - 0.5) * 100;     
    posArray[i+1] = (Math.random() - 0.5) * 100;   
    posArray[i+2] = (Math.random() - 0.5) * 100;   
    
    const mixColor = colorPrimary.clone().lerp(colorPurple, Math.random());
    colorsArray[i] = mixColor.r;
    colorsArray[i+1] = mixColor.g;
    colorsArray[i+2] = mixColor.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Clock for internal rotation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.03;
    particlesMesh.rotation.x = elapsedTime * 0.01;

    // Fluid mouse rotation mapped to Custom Cursor coords
    targetX = (mouseX - windowHalfX) * 0.001;
    targetY = (mouseY - windowHalfY) * 0.001;
    
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    renderer.render(scene, camera);
}
animate();

// ----------------------------------------------------
// 5. INTERACTIVE CALCULATOR LOGIC
// ----------------------------------------------------
const invoiceRange = document.getElementById('invoiceRange');
const rangeVal = document.getElementById('rangeVal');
const timeSaved = document.getElementById('timeSaved');

if(invoiceRange) {
    invoiceRange.addEventListener('input', (e) => {
        const val = e.target.value;
        rangeVal.textContent = val;
        
        // Logic: 10 mins (paper) - 2 mins (DevisPro) = 8 mins saved per invoice
        // 8 mins * val invoices * 30 days / 60 mins = Hours saved per month
        const hoursSaved = Math.round((8 * val * 30) / 60);
        timeSaved.textContent = hoursSaved;
        
        // GSAP Punch effect on value change
        gsap.fromTo('#timeSaved', { scale: 1.2, color: "#fff" }, { scale: 1, color: "inherit", duration: 0.4 });
    });
}

// ----------------------------------------------------
// 6. SCROLL PROGRESS BAR
// ----------------------------------------------------
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if(scrollProgress) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercent + "%";
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
});
