// Function to fetch a recipe from the Spoonacular API
async function fetchRecipes(recipeId) {
  const apiKey = '2cb22fa15c84434b9cf613d3cd6c02ac';
  const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=2cb22fa15c84434b9cf613d3cd6c02ac`);
  const data = await response.json();
  return data;
}

// Function to store a visited recipe
async function storeVisitedRecipes(recipeId) {
  const recipeData = await fetchRecipes(recipeId);
  if (recipeData) {
    const recipeName = recipeData.title;

    // Check if there are any previously stored recipes
    let storedRecipes = localStorage.getItem('favorites') || [];

    // Add the current recipe to the array of visited recipes
    storedRecipes.push({ id: recipeId, name: recipeName });

    // Store the updated array back in Local Storage
    localStorage.setItem('favorites',(storedRecipes));
  }
}

// Function to display visited recipes
async function displayVisitedRecipes() {
  const container = document.getElementById('recipe-container');
  container.innerHTML = ''; // Clear the container

  // Get the visited recipes from Local Storage
  const storedRecipes = localStorage.getItem('favorites') || [];

  // Loop through the stored recipes and create HTML elements to display them
  for (const recipe of storedRecipes) {
    const card = document.createElement('div');
    card.className = 'card';

    const recipeData = await fetchRecipes(recipe.id);

    if (recipeData) {
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${recipeData.title}</h5>
          <p class="card-text">${recipeData.instructions}</p>
          <a href="${recipeData.sourceUrl}" class="btn btn-primary">View Recipe</a>
        </div>
      `;

      container.appendChild(card);
    }
  }
}

// Example of storing a visited recipe
storeVisitedRecipes(); 

// Example of displaying visited recipes
displayVisitedRecipes();
