const toggleBar = document.querySelector('.toggle-icon')
const toggle = document.querySelector('.toggle')
const nav = document.querySelector('nav');
const foods = document.querySelector('.foods')
const foodContainer = document.querySelector('#foods')
const foodSearchContainer = document.querySelector('#food-search');
const foodItemPage = document.querySelector('#food-item')
const contactUs = document.querySelector('.contact-us')

const SearchName = document.querySelector('#searchName');
const SearchLetter = document.querySelector('#searchLetter');

const SearchPage = document.querySelector('#Search');
const CategoriesPage = document.querySelector('#categories');
const AreaPage = document.querySelector('#area');
const IngrediantsPage = document.querySelector('#ingrediants');
const ContactusPage = document.querySelector('#contactus');

const api = 'https://www.themealdb.com/api/json/v1/1/search.php?'
const searchByName = 's=';
const searchByFirstLetter = 'f=';
const searchById = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
let data = null;
let foodItemData = null;


// show and hide side nav bar
toggleBar.addEventListener('click', () => {
    if (nav.style.transform === 'translateX(0px)') {
        nav.style.transform = "translateX(-80%)";
        toggle.src = './imgs/menu-lines-svgrepo-com.svg'
    } else {
        nav.style.transform = "translateX(0px)";
        toggle.src = './imgs/close-svgrepo-com.svg'
    }
})

// Show Item Data page

function itemDataPage(data) {

    foodContainer.style.display = 'none';
    foodSearchContainer.style.display = 'none';
    contactUs.style.display = 'none'
    foodItemPage.style.display = 'flex'

    foodItemPage.innerHTML = `
    <div class="left-side">
    <img src="${data.strMealThumb}" alt="">
    <div>${data.strMeal}</div>
</div>
<div class="right-side">
    <h3>Instructions</h3>
    <p class="des">
    ${data.strInstructions}
    </p>
    <div class="area">Area : <span>${data.strArea}</span></div>
    <div class="categories">Categories : <span>${data.strCategory}</span></div>
    <p class="receipts-head">Receipts</p>
    <div class="receipts-items">
        <div>${data.strMeasure1} ${data.strIngredient1}</div>
        <div>${data.strMeasure2} ${data.strIngredient2}</div>
        <div>${data.strMeasure3} ${data.strIngredient3}</div>
        <div>${data.strMeasure4} ${data.strIngredient4}</div>
        <div>${data.strMeasure5} ${data.strIngredient5}</div>
        <div>${data.strMeasure6} ${data.strIngredient6}</div>
        <div>${data.strMeasure7} ${data.strIngredient7}</div>
        <div>${data.strMeasure8} ${data.strIngredient8}</div>
        <div>${data.strMeasure9} ${data.strIngredient9}</div>
        <div>${data.strMeasure10} ${data.strIngredient10}</div>
        <div>${data.strMeasure11} ${data.strIngredient11}</div>
        <div>${data.strMeasure12} ${data.strIngredient12}</div>
    </div>
    <p class="tags-head">Tags</p>
    <div class="tags-items">
       ${data.strTags === null ? "" : data.strTags.split(',').map((tag) => {
        return `<div>${tag}</div>`
    })}
    </div>
    <div class="links">
        <button><a href="${data.strSource === "" ? '#' : data.strSource}">Source</a></button>
        <button><a href="${data.strYoutube}">Youtube</a></button>
    </div>
    `;
    foodItemPage.style.display = 'flex'
}

function print(id) {
    getMealDetails(searchById + id);
}


// show data in food list 
function showData(data) {
    data.map((item) => {
        foods.innerHTML += `
        <div onclick="print('${item.idMeal}')" class="food-item">
        <img src="${item.strMealThumb}" alt="">
        <div>
            ${item.strMeal}
        </div>
    </div>
        `
    })
}

function filterByCategories(id) {
    foods.innerHTML = '';
    getMealCategoryItems('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + id)
}

function showCategoris(data) {
    foods.innerHTML = '';
    data.map((item) => {
        foods.innerHTML += `
        <div onclick="filterByCategories('${item.strCategory}')" class="food-item">
        <img src="${item.strCategoryThumb}" alt="">
        <div>
            ${item.strCategory}
        </div>
    </div>
        `
    })
}

function filterByArea(id) {
    foods.innerHTML = '';
    getMealAreasItems('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + id)
}

function showAreas(data) {
    foods.innerHTML = '';
    data.map((item) => {
        foods.innerHTML += `
        <div onclick="filterByArea('${item.strArea}')"  class="food-item">
        <img src="./imgs/map.png" alt="">
        <div>
            ${item.strArea}
        </div>
    </div>
        `
    })
}

function filterByIngrdiants(id) {
    foods.innerHTML = '';
    getMealIngrediantsItems("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + id)
}

function showIngrdiants(data) {
    foods.innerHTML = '';
    data.map((item) => {
        foods.innerHTML += `
        <div onclick="filterByIngrdiants('${item.strIngredient}')"  class="food-item">
        <img src="./imgs/ingredients-mix-svgrepo-com.svg" alt="">
        <div>
        ${item.strIngredient}
        </div>
        
    </div>
        `
    })
}

// fetch data from api
async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.json();
    data = myText.meals
    console.log(data);
    showData(data)
}
async function getMealDetails(api) {
    let myObject = await fetch(api);
    let mydata = await myObject.json();
    foodItemData = mydata;
    console.log(foodItemData.meals[0]);
    itemDataPage(foodItemData.meals[0])
}

async function getMealCategories(api) {
    let myObject = await fetch(api);
    let mydata = await myObject.json();
    console.log(mydata.categories);
    showCategoris(mydata.categories)
}
async function getMealCategoryItems(api) {
    let myObject = await fetch(api);
    let mydata = await myObject.json();
    console.log(mydata.meals);
    showData(mydata.meals)
}

async function getMealAreas(api) {
    let myObject = await fetch(api);
    let mydata = await myObject.json();
    console.log(mydata.meals);
    showAreas(mydata.meals)
}
async function getMealAreasItems(api) {
    let myObject = await fetch(api);
    let mydata = await myObject.json();
    console.log(mydata.meals);
    showData(mydata.meals)
}

async function getMealIngrediants(api) {
    let myObject = await fetch(api);
    let mydata = await myObject.json();
    showIngrdiants(mydata.meals.slice(0, 20))
    console.log(mydata.meals.slice(0, 20));
}
async function getMealIngrediantsItems(api) {
    let myObject = await fetch(api);
    let mydata = await myObject.json();
    console.log(mydata.meals);
    showData(mydata.meals)
}

getText(api + searchByName)

// navigate between modules

SearchPage.addEventListener('click', () => {
    foodContainer.style.display = 'none';
    foodSearchContainer.style.display = 'flex';
    nav.style.transform = "translateX(-80%)";
    toggle.src = './imgs/menu-lines-svgrepo-com.svg'
    foodItemPage.style.display = 'none'
    contactUs.style.display = 'none'
})

CategoriesPage.addEventListener('click', () => {
    foodContainer.style.display = 'none';
    foodSearchContainer.style.display = 'none';
    nav.style.transform = "translateX(-80%)";
    toggle.src = './imgs/menu-lines-svgrepo-com.svg'
    foodItemPage.style.display = 'none'
    foodSearchContainer.style.display = 'none';
    contactUs.style.display = 'none'
    foodContainer.style.display = 'grid';
    getMealCategories('https://www.themealdb.com/api/json/v1/1/categories.php')
})
AreaPage.addEventListener('click', () => {
    foodContainer.style.display = 'none';
    foodSearchContainer.style.display = 'none';
    nav.style.transform = "translateX(-80%)";
    toggle.src = './imgs/menu-lines-svgrepo-com.svg'
    foodItemPage.style.display = 'none'
    foodSearchContainer.style.display = 'none';
    foodContainer.style.display = 'grid';
    contactUs.style.display = 'none'
    getMealAreas('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
})

IngrediantsPage.addEventListener('click', () => {
    foodContainer.style.display = 'none'
    contactUs.style.display = 'none'

    foodSearchContainer.style.display = 'none';
    nav.style.transform = "translateX(-80%)";
    toggle.src = './imgs/menu-lines-svgrepo-com.svg'
    foodItemPage.style.display = 'none'
    foodSearchContainer.style.display = 'none';
    foodContainer.style.display = 'grid';
    getMealIngrediants('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
})

ContactusPage.addEventListener('click', () => {
    foodContainer.style.display = 'none';
    foodSearchContainer.style.display = 'none';
    nav.style.transform = "translateX(-80%)";
    toggle.src = './imgs/menu-lines-svgrepo-com.svg'
    foodItemPage.style.display = 'none'
    foodSearchContainer.style.display = 'none';
    foodContainer.style.display = 'none';
    contactUs.style.display = 'flex'
})


// Search 

SearchName.addEventListener('keyup', (e) => {
    foodContainer.style.display = 'grid';
    foods.innerHTML = '';
    getText(api + searchByName + e.target.value)
})
SearchLetter.addEventListener('keyup', (e) => {
    foodContainer.style.display = 'grid';
    foods.innerHTML = '';
    getText(api + searchByFirstLetter + e.target.value)
})



// Contact us

const Name = document.querySelector('#name')
const Email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const age = document.querySelector('#age')
const pass = document.querySelector('#pass')
const repass = document.querySelector('#repass')

