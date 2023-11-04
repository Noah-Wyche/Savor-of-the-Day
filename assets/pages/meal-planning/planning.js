const planningID = '2310a4b1';
const planningKey = 'f3d8324e6c28c96307fc09f4cfc04894';
const apiUrl = 'https://api.edamam.com/api/meal-planner/v1';

// Define the parameters for the two-week meal plan
const start = '2023-11-01'; // Replace with the start date of your two-week plan
const end = '2023-11-14';   // Replace with the end date of your two-week plan

const requestBody = {
  size: 2,
  plan: {
    accept: {
      all: [
        {
          health: ['VEGAN'],
        },
        {
          cuisine: ['Mediterranean'],
        },
      ],
    },
    fit: {
      ENERC_KCAL: {
        min: 1800,
        max: 2200,
      },
      PROCNT: {
        min: 50,
        max: 300,
      },
    },
    sections: {
      Breakfast: {},
      Lunch: {
        exclude: [
          'http://www.edamam.com/ontologies/edamam.owl#recipe_x',
          'http://www.edamam.com/ontologies/edamam.owl#recipe_y',
          'http://www.edamam.com/ontologies/edamam.owl#recipe_z',
        ],
        sections: {
          Starter: {},
          Main: {},
          Dessert: {},
        },
      },
      Dinner: {
        exclude: [
          'http://www.edamam.com/ontologies/edamam.owl#recipe_a',
          'http://www.edamam.com/ontologies/edamam.owl#recipe_b',
          'http://www.edamam.com/ontologies/edamam.owl#recipe_c',
        ],
        sections: {
          Main: {},
          Dessert: {},
        },
      },
    },
  },
};

fetch(requestBody, {
  method: 'POST', // Use POST to send the request body
  headers: {
    'Content-Type': 'application/json', // Set the content type to JSON
  },
  body: JSON.stringify(requestBody), // Convert the request body to a JSON string
})
  .then(response => response.json())
  .then(data => {
    // Process and use the meal plan data
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });