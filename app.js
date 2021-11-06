const search = document.getElementById("search"),
    submit = document.getElementById("submit"),
    resultHeading = document.getElementById("result-heading"),
    meal = document.getElementById("meals"),
    single_meal = document.getElementById("single-meal"),
    random = document.getElementById("random"),
    youtube = document.getElementById("youtube")


//function to fetch data from api

searchMeals = (e) => {
    e.preventDefault();
    single_meal.innerHTML = null;
    const term = search.value;
    console.log(term);
    //check for empty string
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Results for : "${term}" :</h2>`;
                if (data.meals === null) {
                    result_heading.innerHTML = ` <p>Sorry no results found</p>`
                }
                else {
                    meal.innerHTML = data.meals.map(meal =>
                        `<div class="meal">
                            <img src="${meal.strMealThumb}" />
                            <div class="milo" data-mealId="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>

                            </div>
                        </div>
                   ` ).join('');
                }

            })
        search.value = "";


    } else {
        alert("Please provide input");
    }
}


getMealById = ((mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const meal = data.meals[0];
            addMealsToDom(meal);

        }
        )
});
addMealsToDom = (meal) => {
    // const ingredients = [];
    // for (let i = 1; i <= 20; i++) {
    //     if (meal[`strIngredients${i}`]) {
    //         ingredients.push(`${meal[`strIngredients${i}`]}-${meal[`strMeasure${i}`]}`);

    //     } else {
    //         break;
    //     }

    // }
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }
    single_meal.innerHTML = `
    <div class="single-meal">
    <h1>${meal.strMeal} </h1>
    <img src="${meal.strMealThumb}"/>
        <div class="single-meal-info">
        ${meal.strArea ? `<h3>${meal.strArea}</h3>` : ""}
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(items =>
        `<li>${items}</li>`
    ).join('')}</ul>
    </div>
    

    </div>`
}
async function getRandom(e) {
    // const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    // const response = await fetch(url);
    // response.ok;
    // response.status;
    // if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    //     addMealsToDom(data);
    // }
    meal.innerHTML = null;
    resultHeading.innerHTML = null;

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const meal = data.meals[0];
            addMealsToDom(meal);

        }
        )

}

//event-listeners

submit.addEventListener('submit', searchMeals);
random.addEventListener('click', getRandom);



meal.addEventListener('click', (event) => {
    //console.log("Clicked");
    const mealInfo = event.path.find(item => {
        if (item.classList) {
            return item.classList.contains('milo')
            // console.log(item);

        }
        else {
            return false;
        }
    });
    if (mealInfo) {
        var mealId = mealInfo.getAttribute('data-mealId');
        //console.log(mealId);
        getMealById(mealId);
    }
});


