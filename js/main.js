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
        errorEl.textContent = "Du måste fylla i en sökfras!";
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

/* Visar informationen om receptet på webbsidan */
function displayRecipe(recipe) {
    /* skapar article */
    const article = document.createElement("article");

    /* Rubrik */
    const title = document.createElement("h3");
    title.textContent = recipe.name
    article.appendChild(title);

    /* Bild*/
    const image = document.createElement("img");
    image.src = recipe.image;
    image.src = recipe.name;

    /*Felmeddelande om bilden inte laddades*/
    image.addEventListener("error", function () {
        image.alt = "Bilden kunde inte laddas.";
        image.removeAttribute("src");
    });
    article.appendChild(image);

    /* Skapa ett ställe för informationen om recepten at visas */
    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipe-info");

    /* Antal portioner */
    const servings = document.createElement("p");
    servings.textContent = 'Servings: ${recipe.servings}';
    recipeInfo.appendChild(servings);

    /* Tid */
    const prepTime = document.createElement("p");
    prepTime.textContent = 'Prep rime: ${recipe.prepTimeMinutes} minutes';
    recipeInfo.appendChild(prepRime);

    /* Svårighet*/
    const difficulty = document.createElement("p");
    difficulty.textContent = 'Difficulty: ${recipe.difficulty}';
    recipeInfo.appendChild(difficulty);
    article.appendChild(recipeInfo);

    /*Skapar rubrik och lista för ingredienserna */
    /*Rubrik */
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredients";
    article.appendChild(ingredientsTitle);

    /*Lista */
    const IngredientsList = document.createElement("ul");
    recipe.Ingredients.forEach(function (Ingredient) {
        const listItem = document.createElement("li");
        listItem.textContent = Ingredient;
        IngredientsList.appendChild(listItem);
        });
        article.appendChild(IngredientsList);
}



