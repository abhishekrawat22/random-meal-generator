let generateBtn = document.querySelector('.generate-btn');
let mealWrapper = document.querySelector('.meal-wrapper');
let count = 0;

generateBtn.addEventListener('click', () => {
  count += 1;
  if(count>1){
    let randomMeal = document.querySelector('.random-meal');
    randomMeal.remove();
  }
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(data => {
    let ingredients = [];
    for(let i=1; i<=20; i++) {
      if(`${data.meals[0][`strIngredient${i}`]}`) {
        ingredients.push(
          `${data.meals[0][`strIngredient${i}`]} - ${data.meals[0][`strMeasure${i}`]}`
        )
      }
      else break;
    }
    data = `
      <div class="random-meal">
        <h2>${data.meals[0].strMeal}</h2>
        <div class="meal-summary">
          <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}" height="400" width="400" />
          <p><strong>Category: </strong>${data.meals[0].strCategory}</p>
          <p><strong>Ingredients:</strong></p>
          <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
        <div class="meal-description">
          <h3>Method</h3>
          <p>${data.meals[0].strInstructions}</p>
          <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/${data.meals[0].strYoutube.slice(-11)}"></iframe>
          </div>   
        </div>
      </div>
    `
    mealWrapper.insertAdjacentHTML("beforeend", data);
  })
})