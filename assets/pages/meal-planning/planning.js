const planningID = '2310a4b1';
const planningKey = 'f3d8324e6c28c96307fc09f4cfc04894';
const apiUrl = 'https://api.edamam.com/api/meal-planner/v1';

fetch(`${apiUrl}?user=${planningID}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${planningKey}`,
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => {
    // Process and use the recipe data
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });