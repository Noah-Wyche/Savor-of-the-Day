const apiKey = '91999b4d14f245a8862f6a2e80bfe912';
const recipeID = '4632'; 
const endpoint = "https://api.spoonacular.com/recipes/4632/card";


// After fetching the recipe information
fetch(endpoint + '?apiKey=' + apiKey)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // View the data here
    console.log(data);

    // Save the recipe data to the visitedRecipes array
    visitedRecipes.push({
      title: data.title,
      image: data.image,
      // Add other relevant recipe data you want to save
    });

    // Update local storage with the updated visitedRecipes
    localStorage.setItem('visitedRecipes', JSON.stringify(visitedRecipes));

    // Display the updated visited recipes
    displayVisitedRecipes();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Check if the 'visitedRecipes' data exists in localStorage
const visitedRecipes = JSON.parse(localStorage.getItem('visitedRecipes')) || [];

// Function to fetch recipe information for each visited recipe
function fetchVisitedRecipes() {
  visitedRecipes.forEach((recipe) => {
    const endpoint = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;

    fetch(endpoint)
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

// Call the function to fetch information for visited recipes
fetchVisitedRecipes();




