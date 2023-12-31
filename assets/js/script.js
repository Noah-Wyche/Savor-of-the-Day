//nutrition analysis API key and ID
const nutritionID = '626c5774';
const nutritionKey = '31ca3151631eb9c640167e3a235d26e8';

//food database API key and ID
const foodID = '671888ac';
const foodKey = '48ecad7c78ad31e904e7013325ca3f51';

//recipe database API key and ID
const recipeID = '8ee84adc';
const recipeKey = 'ae51fef401e2e4f76673a641e62528d0';

//spoonacular key
const spoonKey = '3a9936fadce343adb4de42101c9338d6';

const spoonJkey = '6e7f94a950624d98afbabe809e668a25';

var featuredEl = $("#featured");
var featuredButton = $("#featuredRecipe");
var modalTitle = $("#recipeModalBody");
var modalBody = $("#recipeModalBody");

//fetching data from api 
function fetchAndDisplayFeatured() {
    var queryURL = 'https://api.spoonacular.com/recipes/random?number=1&apiKey=' + spoonKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var recipeId = data.recipes[0].id;
            var recipeTitle = data.recipes[0].title;
            var imgSrc = data.recipes[0].image;
            var ingrExtended = data.recipes[0].extendedIngredients;

            var recipeElement = $("#featured");
            recipeElement.html(`
                <h2>${recipeTitle}</h2>
                <img src="${imgSrc}"><img>
                <button type="button" id="featuredRecipe">Recipe</button>

            `);
            featuredEl.append(recipeElement);

            featuredButton = $("#featuredRecipe");
            featuredButton.on("click", function () {
                openRecipeModal(recipeId, recipeTitle, ingrExtended);
            });
        })
}
    
function openRecipeModal(recipeID, recipeTitle, ingrExtended) {
    console.log(">>> RecipeID: " + recipeID);
    console.log(">>> Ingredients " + ingrExtended);
//clearing content from/if previous recipe
    modalTitle.empty();
    modalBody.empty();
//setting modal title to the recipe title
    modalTitle.text(recipeTitle);

    var ingredientsList = $('<ul>');
//this loop goes into the array and pulls the ingredients info and creates an ul 
    ingrExtended.forEach(function (ingredient) {
        var ingredientItem = $('<li>');
        ingredientItem.text(ingredient.name + " " + ingredient.amount + " " + ingredient.unit);
        ingredientsList.append(ingredientItem);
    })
//apending to the modal 
    modalBody.append(ingredientsList);

    $('#recipeModal').modal('show');
}

fetchAndDisplayFeatured();


var form = $('#userForm');
var ingredientEl = $('#ingredient');
var mealsEl = $('#todaysMeals');

//modal elements
var modalTitle = $('#recipeModalLabel');
var modalBody = $('#recipeModalBody');


function fetchRecipes (event) {
    event.preventDefault();
    mealsEl.empty();

    var results = 100;
    var ingr = ingredientEl.val();

    var queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=' + ingr + '&apiKey=' + spoonKey + '&number=100';

    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        

            for (var i=0;i<3;i++) {
                var rand = Math.floor(Math.random() * results+1);
                var recipeID = data.results[rand].id;
                var recipeName = data.results[rand].title;

                var mealDiv = $('<div>');
                var titleDiv = $('<div>');
                var imgDiv = $('<div>');
                var optionsDiv = $('<div>');

                var mealImg = $('<img>');
                var mealTitle = $('<h3>');
                var recipeBtn = $('<button>');
                var saveBtn = $('<button>');

                mealDiv.addClass("grid-x grid-margin-x grid-margin-y");

                mealImg.attr("src",data.results[rand].image);
                mealImg.attr("style", "width:150px;height:auto;border-radius:10px;");
                imgDiv.addClass("cell medium-3");
                mealTitle.text(recipeName);
                mealTitle.attr("style", "margin-top: 1em;");
                titleDiv.addClass("cell medium-6");
                optionsDiv.addClass("cell medium-3");
                recipeBtn.addClass("button");
                recipeBtn.attr("type","button");
                recipeBtn.attr("style", "margin:2px;");
                recipeBtn.attr("data-toggle", "modal");
                recipeBtn.attr("data-target", "#recipeModal");
                recipeBtn.text("Recipe");
                saveBtn.addClass("button");
                saveBtn.attr("type","button");
                saveBtn.attr("style", "margin:2px;");
                saveBtn.text("Save");

                imgDiv.append(mealImg);
                titleDiv.append(mealTitle);
                optionsDiv.append(recipeBtn);
                optionsDiv.append(saveBtn);

                mealDiv.append(imgDiv);
                mealDiv.append(titleDiv);
                mealDiv.append(optionsDiv);

                mealsEl.append(mealDiv);

                //recipeBtn.on('click', function() {getRecipeDetails(recipeID, recipeName)});
                recipeBtn.get(0).recipeId = data.results[rand].id;
                recipeBtn.get(0).recipeName = data.results[rand].title;
                recipeBtn.get(0).addEventListener("click", function(e) {
                    getRecipeDetails(e.target.recipeId, e.target.recipeName);
                });

                saveBtn.get(0).recipeId = data.results[rand].id;
                saveBtn.on('click', function (e) {saveRecipeID(e.target.recipeId)});
            }
        });
    
}

var favorites = [];

//loadRecipeID();
function loadRecipeID () {
    favoritesString = localStorage.getItem("favorites");
    if (favoritesString) {
        favorites = favoritesString.split(',');
    }
    
}

function saveRecipeID (recipeID) {

    var favorite = recipeID;

    if (!favorites.includes(recipeID)) {
        favorites.push(favorite);
    }
    
    console.log(favorites);

    localStorage.setItem("favorites", favorites);
}

function getRecipeDetails (recipeID, recipeName) {
    console.log(">>> RecipeID: " + recipeID);
    stepsQueryURL = 'https://api.spoonacular.com/recipes/'+ recipeID +'/analyzedInstructions?apiKey=' + spoonKey;
    ingrQueryURL = 'https://api.spoonacular.com/recipes/' + recipeID + '/ingredientWidget.json?apiKey=' + spoonKey;

    modalTitle.empty();
    modalBody.empty();

    modalTitle.append(recipeName);
    var steps = $('<ul>');
    var ingredients = $('<ul>');

    fetch(ingrQueryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var ingrLength = data.ingredients.length;
            for (var i=0;i<ingrLength;i++) {
                var ingr = $('<li>');
                ingr.text(data.ingredients[i].name + "  " + data.ingredients[i].amount.us.value + " " + data.ingredients[i].amount.us.unit);
                ingredients.append(ingr);
            }
            modalBody.append(ingredients);
        });

    fetch (stepsQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var stepsLength = data[0].steps.length;
            for (var i=0;i<stepsLength;i++) {
                var step = $('<li>');
                step.text(data[0].steps[i].step);
                steps.append(step);
            }
            modalBody.append(steps);
        });
}

form.on('submit', fetchRecipes);



// Image box
// Function to choose a random recipe image and name when the page loads or is refreshes
// The name should be displayed along with the appropriate image

// Modify your meals bar
// Function to change the search results based on user choices
    // Logic to determine if the breakfast button has been clicked and update the search results based on that
    // Logic to determine if the Lunch button has been clicked and adjust the search results based on that
    // Logic to determine if the Dinner button has been clicked and adjust the search results based on that
// Function to modify search results by Dietary Restrictions
    // Gluten Free
    // Vegan
    // Dairy free
    // Nut free
    // Soy free
    // Egg free
    // Fish free
// Function to search for ingredients and request they be used in the recipes

// Todays meals
// Here each meal will be layed out in a column with breakfast on top descending to dinner
// Each meal should display a name, a brief description, and an estimated cook time
