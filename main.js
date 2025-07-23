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

// * ============================================
// * AOS INITIALIZE AND TEXT ANIMATION 
// * ============================================

Splitting();
AOS.init({ once: false });

const elements = document.querySelectorAll('[data-splitting][data-aos][data-animate-class]');

elements.forEach(parent => {
    const chars = parent.querySelectorAll('.char');
    const animateClass = parent.dataset.animateClass.trim().split(" ");
    const speed = Number(parent.dataset.customSpeed) || 0.05;
    let isAnimated = false;

    const runAnimation = () => {
        chars.forEach((char, i) => {
            char.classList.remove("animate__animated", ...animateClass); // reset
            void char.offsetWidth; // force reflow
            char.classList.add("animate__animated", ...animateClass);
            char.style.animationDelay = `${i * speed}s`;
        });
        isAnimated = true;
    };

    const resetAnimation = () => {
        chars.forEach(char => {
            char.classList.remove("animate__animated", ...animateClass);
            char.style.animationDelay = '0s';
        });
        isAnimated = false;
    };

    const observer = new MutationObserver(() => {
        if (parent.classList.contains('aos-animate')) {
            if (!isAnimated) runAnimation();
        } else {
            resetAnimation();
        }
    });

    observer.observe(parent, {
        attributes: true,
        attributeFilter: ['class'],
    });

    // ✅ NEW: Trigger immediately if already visible (for header)
    window.addEventListener('load', () => {
        AOS.refresh(); // Step 1
        if (parent.classList.contains('aos-animate')) {
            runAnimation(); // Step 2
        }
    });
});



// * ===========================
// * COUNTER INCREMENT ANIMATION
// * ===========================

const counters = document.querySelectorAll('[data-custom-counter]');

counters.forEach(counter => {
    const target = +counter.getAttribute('data-custom-counter');
    let count = 0;
    const speed = 50; // lower = faster

    const updateCount = () => {
        const increment = Math.ceil(target / 100); // adjust smoothness

        if (count < target) {
            count += increment;
            counter.innerText = count > target ? target : count;
            setTimeout(updateCount, speed);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
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



// * =============
// * LOADER
// * =============

window.addEventListener("load", () => {
    console.log("loading");
    document.documentElement.style.setProperty("--scrollbar-width", ".5rem");
    const loader = document.querySelector(".loader-container").remove();
})







