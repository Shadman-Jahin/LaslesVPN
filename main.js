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













