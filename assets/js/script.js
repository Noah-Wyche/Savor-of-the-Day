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

var form = $('#userForm');
var ingredientEl = $('#ingredient');

function fetchRecipes (event) {
    event.preventDefault();

    var ingr = ingredientEl.val();
    var queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=' + ingr + '&apiKey=' + spoonKey + '&number=100';
    
    //uncomment the fetch when you need to test
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
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
