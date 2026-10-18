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
    return true;
}

/* Hämtar recept från dummyJSON api och skickar en förfråga till api*/
async function fetchRecipe(searchTerm) {
    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`;
    const response = await fetch(url);
    
    /* Kollar om servern kunde ge svaret och ger ett error meddelande om det gick fel */
    if (!response.ok) {
        throw new Error("Det gick inte att hämta recepten.");
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
    title.textContent = recipe.name;
    article.appendChild(title);

    /* Bild*/
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;

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
    servings.textContent = `Servings: ${recipe.servings}`;
    recipeInfo.appendChild(servings);

    /* Förberedelse tid */
    const prepTime = document.createElement("p");
    prepTime.textContent = `Prep time: ${recipe.prepTimeMinutes} minutes`;
    recipeInfo.appendChild(prepTime);

    /* Lagningstid */
    const cookTime = document.createElement("p");
    cookTime.textContent = `Cooking time: ${recipe.cookTimeMinutes} minutes`;
    recipeInfo.appendChild(cookTime);

    /* Svårighet*/
    const difficulty = document.createElement("p");
    difficulty.textContent = `Difficulty: ${recipe.difficulty}`;
    recipeInfo.appendChild(difficulty);
    article.appendChild(recipeInfo);

    /*Skapar rubrik och lista för ingredienserna */
    /*Rubrik */
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredients";
    article.appendChild(ingredientsTitle);

    /*Lista */
    console.log("Ingredienser:", recipe.ingredients);
    const IngredientsList = document.createElement("ul");
    recipe.ingredients.forEach(function (ingredient) {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        IngredientsList.appendChild(listItem);
        });
        article.appendChild(IngredientsList);

        /* Rubrik för intrstruktioner*/
        const instructionsTitle = document.createElement("h4");
        instructionsTitle.textContent = "Instructions";
        article.appendChild(instructionsTitle);

        /* Numerad lista med instruktioner*/
        console.log("Instruktioner:", recipe.instructions);
        const instructionsList = document.createElement("ol");

        recipe.instructions.forEach(function (instruction) {
            const listItem = document.createElement("li");
            listItem.textContent = instruction;
            instructionsList.appendChild(listItem);
        });

        article.appendChild(instructionsList);

        /* Lägger fram det färdiga receptet på webbsidan */
        recipeSection.appendChild(article);
}

/* Hanterar själva sökningen och kopplar ihop funktionerna */
async function handleSearch(event) {

    /* Ser till att förmuläret laddar inte om sidan */
    event.preventDefault();

    /* Läser det som man sökte och tar bort onödiga mellanslag */
    const searchTerm = searchInput.value.trim();

    /* Tar bort gamla fel och API meddelanden */
    errorEl.textContent = "";
    messageSection.textContent = "";

    /* Kollar sökfrasen innan den kontaktar APIt */
    if (!validateSearch(searchTerm)) {
        return;
    }

    /* Tar bort ett tidigare recept nät en ny säkning görs */
    recipeSection.replaceChildren();

    try {
        /* Hämtar sökresultatet från APIt */
        const data = await fetchRecipe(searchTerm);
        /* Kollar om svaret innehåller en receptarray */
        if (!data || !Array.isArray(data.recipes)) {
            throw new Error("APIt ger ett ogiltigt svar.");
        }

        /* Kollar om sökningen gav några recept */
        if (data.recipes.length === 0) {
            messageSection.textContent = "Inget recept hittades. Försök att söka efter något annat.";
            return;
        }

        /* Visar bara det första receptet i resultatet */
        displayRecipe(data.recipes[0]);

    } catch (error) {
        /* Tar bort recept om något gick fel */
        recipeSection.replaceChildren();

        /* Felmedellandet */
        messageSection.textContent = "Ett fel uppstod när receptet skulle hämtas. Kontrollera din internetanslutning och försök igen.";

        // Skriv felet till konsolen.
        console.error("Fel vid receptsökning:", error);
    }
}

/* Kör sökningen när formuläret skickas */
form.addEventListener("submit", handleSearch);