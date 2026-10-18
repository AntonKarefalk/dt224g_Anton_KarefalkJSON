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

/* Hämtar recept från dummyJSON api och skickar en förfråga till api*/
async function fetchRecipe(searchTerm) {
    const url = 'https://dummyjson.com/recipes/search?q=${(searchTerm)}';
    const response = await fetch(url);
    
    /* Kollar om servern kunde ge svaret och ger ett error meddelande om det gick fel */
    if (!response.ok) {
        throw new Error("Det gick inte att hämta recepten.")
    }

    /* Gör så att svaret från JSON blir ett JavaScript objekt */
    const data = await response.json();
    return data;
    
}
