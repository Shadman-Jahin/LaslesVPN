
// * ==========
// * LENIS
// * ==========

// 1. Initialize Lenis
function initializeLenis() {
    const lenis = new Lenis({
        duration: 1.5, // Duration of the smooth scroll animation in seconds
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
        direction: 'vertical', // vertical, horizontal
        gestureDirection: 'vertical', // vertical, horizontal, both
        smoothWheel: true, // Enables smooth scrolling for mouse wheel
        wheelMultiplier: 1.5, // Adjust scroll speed for mouse wheel
        smoothTouch: false, // Disables smooth scrolling for touch devices (often better for mobile performance)
        touchMultiplier: 2, // Adjust scroll speed for touch
        infinite: false, // Enables infinite scroll
        autoRaf: true, // Automatically calls lenis.raf(time) using requestAnimationFrame
        // lerp: 0.01, // Lenis uses `duration` for smooth transition, but `lerp` is also an option for interpolation.
        // If you set `duration`, `lerp` will be derived.
        // A lower `lerp` value means a smoother, more "laggy" feel, but Lenis's `duration` handles this better.
    });
}

// Ensure Lenis initializes after the DOM is ready
document.addEventListener('DOMContentLoaded', initializeLenis);

// * ================
// * AOS INITIALIZE
// * ================

AOS.init();

// * =======================
// * SPLITTING.JS INTIALIZE
// * =======================

Splitting();
let speed = .05;

const chars = document.querySelectorAll('.char');
chars.forEach((char, i) => {
    if (char.parentElement.parentElement.dataset.customSpeed) {
        speed = Number(char.parentElement.parentElement.dataset.customSpeed);
    }
    console.log(speed);
    const animatedClass = [];
    char.parentElement.parentElement.classList.forEach(el => {
        if (el.startsWith("animate__")) animatedClass.push(el);
    });
    if (animatedClass.length) char.classList.add(...animatedClass);
    char.style.animationDelay = `${i * speed}s`;
});


// * ========================
// * LIGHT/DARK MODE
// * ========================

// SELECTING
const input = document.querySelector("#dark-mode-check");
const query = window.matchMedia("(prefers-color-scheme: light)");

if (input) {
    //  STORE
    const stored = localStorage.getItem("light");
    const userPref = stored !== null ? JSON.parse(stored) : query.matches;
    input.checked = userPref;

    // UPDATE BY USER
    input.addEventListener("change", () => {
        localStorage.setItem("light", JSON.stringify(input.checked));
    });

    // UPDATE BY THEME
    query.addEventListener("change", e => {
        if (localStorage.getItem("light") === null) {
            input.checked = e.matches;
        }
    });
}


// * =====================
// * SWIPER JS
// * =====================


const swiper = new Swiper('.carousel-custom', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    spaceBetween: 50,

    //  pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        992: {
            slidesPerView: 2,
        },

        1200: {
            slidesPerView: 3
        }
    }
});











