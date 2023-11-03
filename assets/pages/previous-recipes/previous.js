
// Check if local storage contains previous recipe views
var previousViews = localStorage.getItem('recipeViews');
if (previousViews) {
  previousViews = JSON.parse(previousViews);
} else {
  previousViews = [];
}

// Function to fetch and display recipe details from Spoonacular API
function displayRecipe(recipeId) {
  // Make a request to the Spoonacular API to fetch recipe details
  fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=91999b4d14f245a8862f6a2e80bfe912`)
    .then(response => response.json())
    .then(data => {
      // Display recipe details on the page
      var recipeTitle = data.title;
      var recipeSummary = data.summary;

      // Update the HTML with the recipe details
      var recipeDetails = document.getElementById('recipe-details');
      recipeDetails.innerHTML = `
        <h2>${recipeTitle}</h2>
        <p>${recipeSummary}</p>
      `;

      // Store the recipe ID in local storage as a viewed recipe
      previousViews.push(recipeId);
      localStorage.setItem('recipeViews', JSON.stringify(previousViews));
    })
    .catch(error => {
      console.error('Error fetching recipe details:', error);
    });
}


// Display previously viewed recipes
if (previousViews.length > 0) {
  var recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = '<h3>Previously Viewed Recipes:</h3>';

  previousViews.forEach(recipeId => {
    displayRecipe(recipeId);
  });
}






