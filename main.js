const searchForm = document.querySelector("form");
const searchResult = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = '';
const APP_ID = '1696371b';
const APP_key = 'ed8b8e626f03de2908da52b6db3a8c95';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
            `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Label: ${result.recipe.dietLabels.length>0 ?result.recipe.dietLabels:"No data found" }</p>
            <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>

        </div>
        `
    });
    document.querySelector(".search-result").innerHTML=generatedHTML;
}