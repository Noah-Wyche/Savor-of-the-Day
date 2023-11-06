// Setting Monday, Tuesday, and Wednesday to be open by default
const button = document.querySelector('.collapsible-button');
const startOpenElements = document.querySelectorAll('.day-box.start-open');

startOpenElements.forEach(element => {
  element.style.display = 'block';
});

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// Function to save input values to local storage
function saveToLocalStorage() {
  const inputs = document.querySelectorAll('.meal-input');
  inputs.forEach(input => {
    localStorage.setItem(input.id, input.value);
  });
}

// Function to load values from local storage and populate the input elements
function loadFromLocalStorage() {
  const inputs = document.querySelectorAll('.meal-input');
  inputs.forEach(input => {
    input.value = localStorage.getItem(input.id);
  });
}

// Save input values to local storage when they change
const inputs = document.querySelectorAll('.meal-input');
inputs.forEach(input => {
  input.addEventListener("input", saveToLocalStorage);
});

// Load values from local storage on page load
window.addEventListener("load", loadFromLocalStorage);