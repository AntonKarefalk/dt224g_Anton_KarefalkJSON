"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Anton Kårefalk
 */
/* Elementen som hämtas from HTML filen some kommer då senare användas för functionerna */

const form = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorEl = document.querySelector("#error");
const messageSection = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");

/* Kollar om någon har skrivit in en sökfras och rensar gamla felmeddelanden */
function validateSearch(searchTerm) {
    errorEl.textContent = "";

    /* Kollar om sökfältet är tomt och ger ett passande felmedellande */
    if (searchTerm.trim() === "") {
        errorEl.textContent = "Skriv in ett recept att söka efter.";
        return false;
    }
}
