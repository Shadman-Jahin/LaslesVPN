
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


// AOS.init();

// // Get all elements that use AOS and have a data-animation-class attribute
// const aosAnimatedElements = document.querySelectorAll('[data-aos][data-animation-class]');

// aosAnimatedElements.forEach(element => {
//     // Observe changes to the element's class list
//     const observer = new MutationObserver((mutations) => {
//         mutations.forEach((mutation) => {
//             if (mutation.attributeName === 'class' && element.classList.contains('aos-animate')) {
//                 const animationClass = element.dataset.animationClass;
//                 // Add Animate.css classes only when aos-animate is present
//                 element.classList.add('animate__animated', animationClass);

//                 // Optional: Remove the animation classes after the animation completes
//                 // This prevents the animation from re-playing if the element goes out of view and comes back
//                 element.addEventListener('animationend', () => {
//                     element.classList.remove('animate__animated', animationClass);
//                 }, { once: true }); // Use { once: true } to remove the listener after it fires
//             }
//         });
//     });

//     // Start observing the 'class' attribute for changes
//     observer.observe(element, { attributes: true });
// });

// * =======================
// * SPLITTING.JS INITIALIZE
// * =======================


// // Initialize Splitting
// Splitting();
// let speed = .05; // Default speed

// const parent = document.querySelectorAll("[data-splitting]");
// parent.forEach(prt => {
//     const chars = prt.querySelectorAll('.char');
//     chars.forEach((char, i) => {
//         const originalElement = char.closest('[data-splitting]');

//         if (originalElement && originalElement.dataset.customSpeed) {
//             speed = Number(originalElement.dataset.customSpeed);
//         } else {
//             speed = .05;
//         }
//         const animatedClass = originalElement.dataset.animateClass.trim().split(" ");
//         if (animatedClass.length) {
//             char.classList.add(...animatedClass, "animate__animated");
//         }

//         char.style.animationDelay = `${i * speed}s`;
//     });
// })

// ! CHAT GPT START
// ✅ Run Splitting first
Splitting();

// ✅ AOS Init
AOS.init({
    once: false // To allow repeated animation
});

const elements = document.querySelectorAll('[data-splitting][data-aos][data-animate-class]');

elements.forEach(parent => {
    const chars = parent.querySelectorAll('.char');
    const animateClass = parent.dataset.animateClass.trim().split(" ");
    const speed = Number(parent.dataset.customSpeed) || 0.05;

    // ✅ Keep a flag to check current state
    let isAnimated = false;

    // Watch class changes with MutationObserver
    const observer = new MutationObserver(() => {
        if (parent.classList.contains('aos-animate')) {
            if (!isAnimated) {
                chars.forEach((char, i) => {
                    char.classList.remove("animate__animated", ...animateClass); // Reset
                    void char.offsetWidth; // Force reflow
                    char.classList.add("animate__animated", ...animateClass);
                    char.style.animationDelay = `${i * speed}s`;
                });
                isAnimated = true;
            }
        } else {
            // Reset on scroll out
            chars.forEach(char => {
                char.classList.remove("animate__animated", ...animateClass);
                char.style.animationDelay = '0s';
            });
            isAnimated = false;
        }
    });

    observer.observe(parent, {
        attributes: true,
        attributeFilter: ['class'],
    });
});


// ! CHAT GPT END


// !AI generated code START
// // Initialize Splitting.js
// // Splitting();
// // AOS.init();

// const aosSplittingElements = document.querySelectorAll("[data-splitting][data-aos][data-animate-class]");

// aosSplittingElements.forEach(prt => {
//     const chars = prt.querySelectorAll('.char'); // Get the characters for the current parent

//     // Observe changes to the parent element's class list (where aos-animate will be added)
//     const observer = new MutationObserver((mutations) => {
//         mutations.forEach((mutation) => {
//             if (mutation.attributeName === 'class' && prt.classList.contains('aos-animate')) {
//                 // AOS has triggered, now apply Animate.css and delays to the chars
//                 const speed = Number(prt.dataset.customSpeed || 0.05); // Use default if not set
//                 const animatedClasses = prt.dataset.animateClass.trim().split(" ");

//                 if (animatedClasses.length) {
//                     chars.forEach((char, i) => {
//                         // Add initial Animate.css classes
//                         char.classList.add('animate__animated', ...animatedClasses);
//                         char.style.animationDelay = `${i * speed}s`;

//                         // Optional: Remove classes after animation completes
//                         // This allows the animation to re-play if the element goes out of view and comes back
//                         char.addEventListener('animationend', function handler() {
//                             char.classList.remove('animate__animated', ...animatedClasses);
//                             char.style.animationDelay = ''; // Clear delay
//                             char.removeEventListener('animationend', handler); // Remove listener
//                         }, { once: true });
//                     });
//                 }
//                 // Disconnect observer after the animation is triggered
//                 // If you want the animation to re-trigger every time it enters view,
//                 // you might need to re-attach the observer or handle the 'aos:out' event.
//                 // For a simple 'animate once on scroll in', disconnecting is fine.
//                 // observer.disconnect(); // Uncomment if you only want it to animate once per page load
//             }
//             else if (mutation.attributeName === 'class' && !prt.classList.contains('aos-animate')) {
//                 console.warn("working");

//                 // If element scrolls out of view, reset characters for re-animation
//                 chars.forEach(char => {
//                     char.classList.remove('animate__animated', ...(prt.dataset.animateClass.trim().split(" ")));
//                     char.style.animationDelay = '';
//                 });
//             }
//         });
//     });

//     // Start observing the 'class' attribute for changes on the parent element
//     observer.observe(prt, { attributes: true });
// });
// !AI generated code END

// !next code

// // Ensure Splitting.js is initialized. It's usually called like this:

// Splitting(); // Uncomment this line if Splitting() is not called elsewhere at the start.
// AOS.init(); // Initialize AOS

// const aosSplittingElements = document.querySelectorAll("[data-splitting][data-aos][data-animate-class]");

// aosSplittingElements.forEach(prt => {
//     const chars = prt.querySelectorAll('.char'); // Get the characters for the current parent
//     let animationPlayedForElement = false; // Flag to track if this specific element has animated

//     // Observe changes to the parent element's class list (where aos-animate will be added)
//     const observer = new MutationObserver((mutations) => {
//         mutations.forEach((mutation) => {
//             // Check if 'class' attribute changed, 'aos-animate' is present, AND animation hasn't played yet
//             if (mutation.attributeName === 'class' && prt.classList.contains('aos-animate') && !animationPlayedForElement) {
//                 // AOS has triggered and animation hasn't played for this element yet
//                 const speed = Number(prt.dataset.customSpeed || 0.05); // Use default if not set
//                 const animatedClasses = prt.dataset.animateClass.trim().split(" ");

//                 if (animatedClasses.length) {
//                     chars.forEach((char, i) => {
//                         // Ensure a clean slate before adding animation classes (defensive)
//                         char.classList.remove('animate__animated', ...animatedClasses);
//                         char.style.animationDelay = '';

//                         // Add Animate.css classes and set staggered delay
//                         char.classList.add('animate__animated', ...animatedClasses);
//                         char.style.animationDelay = `${i * speed}s`;

//                         // Optional: Clean up Animate.css classes AFTER the animation completes.
//                         // This prevents the element from retaining animation properties,
//                         // but it will remain visible if your CSS doesn't hide it by default.
//                         char.addEventListener('animationend', function handler() {
//                             char.classList.remove('animate__animated', ...animatedClasses);
//                             char.style.animationDelay = ''; // Clear delay
//                             char.removeEventListener('animationend', handler); // Remove this specific listener
//                         }, { once: true }); // This animationend listener runs only once per char
//                     });

//                     // Mark that the animation has played for this parent element
//                     animationPlayedForElement = true;

//                     // *** CRITICAL FIX: Disconnect the observer for this element ***
//                     // This stops monitoring this element, so the animation will NOT re-trigger
//                     // even if it scrolls out of view and comes back in.
//                     observer.disconnect();
//                     console.log(`Animation for element "${prt.textContent.trim().substring(0, 25)}..." triggered and observer disconnected. Will not re-run.`);
//                 }
//             }
//             // The 'else if' block that previously reset the characters is REMOVED.
//             // This means the characters will stay in their final animated state after they play once.
//         });
//     });

//     // Start observing the 'class' attribute for changes on the parent element
//     observer.observe(prt, { attributes: true });
// });




// * ===========================
// * COUNTER INCREMENT ANIMATION
// * ===========================

const counters = document.querySelectorAll('[data-custom-counter]');

counters.forEach(counter => {
    const target = +counter.getAttribute('data-custom-counter');
    let count = 0;
    const speed = 25; // lower = faster

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











