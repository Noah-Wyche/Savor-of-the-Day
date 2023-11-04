// Define variables for user and grocery store coordinates
let userCoords = null;
let groceryStoreCoords = null;

// Define the starting and ending coordinates (replace with actual coordinates)
let startCoords = null;
let endCoords = null;

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    userCoords = [position.coords.longitude, position.coords.latitude];
    
    // Call a function to find the nearby grocery store using the user's coordinates
    findNearbyGroceryStore(userCoords);
  });
} else {
  // Geolocation is not available in this browser
  console.error('Geolocation is not available.');
}

function findNearbyGroceryStore(userCoords) {
  const apiKey = 'AIzaSyBafC_HrE87F8TRClLlj8y5pNvfdUXBfM0';
  const radius = 1000; // Define a radius (in meters) for the search

  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userCoords[1]},${userCoords[0]}&radius=${radius}&types=grocery_or_supermarket&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
          if (data.results.length > 0) {
              groceryStoreCoords = [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat];
              // Now, you can use groceryStoreCoords to display the route
              startCoords = userCoords; // Assign user coordinates to startCoords
              endCoords = groceryStoreCoords; // Assign grocery store coordinates to endCoords
              displayRoute();
          } else {
              console.error('No nearby grocery stores found.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

function displayRoute() {
  if (startCoords && endCoords) {
    // Make an API request to Jawg's routing API
    fetch(`https://api.jawg.io/routing/route/v1/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?access-token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            // Extract the route data from the response
            const routeData = data.routes[0].geometry;

            // Add the route to the map
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: routeData,
                    },
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                },
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }
}
