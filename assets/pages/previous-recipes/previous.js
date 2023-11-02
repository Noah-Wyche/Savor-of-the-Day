const apiKey = '91999b4d14f245a8862f6a2e80bfe912';
const recipeID = '4632';
const endpoint = `https://api.spoonacular.com/recipes/${recipeID}/card?apiKey=${apiKey}`;

// Check if the 'visitedRecipes' data exists in localStorage
const visitedRecipes = JSON.parse(localStorage.getItem('visitedRecipes')) || [];

// Function to fetch recipe information for each visited recipe
function fetchVisitedRecipes() {
  visitedRecipes.forEach((recipe) => {
    const recipeID = recipe.id;
    const recipeEndpoint = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}`;

    fetch(recipeEndpoint)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data here
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

// After fetching the recipe information
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    // Check if the 'id' property exists in the response data
    if ('id' in data) {
      // Push the recipe ID to the visitedRecipes array
      visitedRecipes.push({ id: data.id });

      // Update local storage with the updated visitedRecipes
      localStorage.setItem('visitedRecipes', JSON.stringify(visitedRecipes));

      // Display the updated visited recipes
      displayVisitedRecipes();
    } else {
      console.error('Recipe ID not found in response data.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Call the function to fetch information for visited recipes
fetchVisitedRecipes();




