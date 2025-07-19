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











