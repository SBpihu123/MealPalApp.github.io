const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeading = document.querySelector(".result-heading");
const single_mealEl = document.getElementById("single-meal");

// Search meal
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search Result for ${term}</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>There Are No Results For ${term}</h2>`;
        } else {
          mealEl.innerHTML = data.meals
            .map(
              (meal) => `
                            <div class="meal">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                <div class="meal-info" data-mealID=${meal.idMeal}>
                                    <h3>${meal.strMeal}</h3>
                                </div>
                            </div>
                            `,
            )
            .join("");
        }
      });
  } else {
    alert("Please insert a value in the search.");
  }
}

// Fetch meal by id
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

// Random Meal
function randomMeal() {
  mealEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

// Add meal to DOM
function addMealToDom(meal) {
  // ... Your existing code for adding meal details to the DOM
}

// Event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", randomMeal);

mealEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    getMealById(mealID);
  }
});
