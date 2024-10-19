/// <reference types ="../@types/jquery" />
let rowData = document.getElementById('data');
let search = document.getElementById('search');
let submitBtn;



// function changeIcon(){
//     $(".closeBtn").addClass("fa-align-justify");
//     $(".closeBtn").removeClass("fa-xmark");
// }
// changeIcon()

$('.closeBtn').on('click', function () {
    $('.tohide').animate({ width: 'toggle' },1000, function() {
        if ($(this).css('display') === 'block') {
            $(this).css('display', 'flex');
         }
    });
    
});

function closeSearchInputs() {
    search.innerHTML = "";
    rowData.innerHTML = "";
}
$(function loading() {
    searchByName("");
    $(".loading").fadeOut(1000,function () {
        $("body").css("overflow", "auto")
    })
    

})
$('.category').on('click', function () {
    closeSearchInputs()
    getCategories()
    console.log('imhere');
})
$('.area').on('click', function () {
    closeSearchInputs()
    getArea()
    console.log('imhere');
})
$('.ingredient').on('click', function () {
    closeSearchInputs()
    getIngredients()
    console.log('imhere');
})
$('.search').on('click', function () {
    closeSearchInputs()
    SearchInputs()
})
$('.contact').on('click', function () {
    closeSearchInputs()
    showContacts()
})
// $('.box').on('click', function () {
//     closeSearchInputs()
//     getCategoryMeals()
// })
function justOpen(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3">
                        <div  onclick="getMealDetails(${arr[i].idMeal})" class="box overflow-hidden rounded-2 position-relative ">
                            <img src="${arr[i].strMealThumb}" alt="" class=" w-100">
                            <div class="layer position-absolute d-flex align-items-center p-2">
                                <h3 class="text-black">${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`
    }
    rowData.innerHTML = cartoona
}
async function getMealDetails(mealID) {
  
    rowData.innerHTML = ""
    // $(".loading").fadeIn(1000,function () {
    //     $("body").css("overflow", "auto")
    // })

    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    data = await respone.json();

    displayMealDetails(data.meals[0])
    console.log(data);
    
    // $(".loading").fadeOut(1000,function () {
    //     $("body").css("overflow", "auto")
    // })

}
function displayMealDetails(meal) {
    
    search.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1 ">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 class="text-white">Instructions</h2>
                <p class="text-white">${meal.strInstructions}</p>
                <h3><span class="fw-bolder text-white">Area : </span ">${meal.strArea}</h3>
                <h3><span class="fw-bolder text-white">Category : </span >${meal.strCategory}</h3>
                <h3 class="text-white">Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3 class="text-white">Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap class="text-white"">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}
async function getCategories() {
    rowData.innerHTML = ""
    try {
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let data = await respone.json()
        displayCategories(data.categories)
    }
    catch (error) {
        console.log('error');

    }
}
function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
       <div class="col-md-3">
                        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="box overflow-hidden rounded-2 position-relative">
                            <img src="${arr[i].strCategoryThumb}" alt="" class=" w-100">
                            <div class="layer position-absolute p-2 text-center ">
                                <h3 class="text-black">${arr[i].strCategory}</h3>
                                 <p class="text-black">${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                            </div>
                        </div>
                        
                    </div>
        `;
    }

    rowData.innerHTML = cartoona;
}
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await response.json()


    justOpen(data.meals.slice(0, 20))

}
async function getArea() {
    rowData.innerHTML = ""
    try {
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await respone.json()
        displayArea(data.meals)
    }
    catch (error) {
        console.log('error');

    }
}
function displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3">
                        <div class="rounded-2 text-center text-light"onclick="getAreaMeals('${arr[i].strArea}')">
                            <i class="fa-solid fa-house-laptop fa-4x "></i>
                            <h3>${arr[i].strArea}</h3>
                        </div>
                    </div>`
    }
    rowData.innerHTML = cartoona
}
async function getAreaMeals(area) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    data = await response.json()


    justOpen(data.meals.slice(0, 20))

}
async function getIngredients() {
    rowData.innerHTML = ""
    try {
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let data = await respone.json()

        displayIngredients(data.meals.slice(0, 20))
    }
    catch (error) {
        console.log('error');

    }
}
function displayIngredients(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-light">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>`
    }
    rowData.innerHTML = cartoona
}
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    data = await response.json()
    justOpen(data.meals.slice(0, 20))
}
function SearchInputs() {
    search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
         <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
        
    </div>`
    rowData.innerHTML = ""
}
async function searchByName(term) {
  
    // rowData.innerHTML = ''

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? justOpen(response.meals) : justOpen([])


}
async function searchByFLetter(term) {
  
    rowData.innerHTML = cartoona
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? justOpen(response.meals) : justOpen([])

}
// getMealDetails('52874')


function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
function inputsValidation() {
    if (nameInputTouched) {
        if (namevali()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (mailvali()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (mobvali()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (agevali()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (namevali() &&
        mailvali() &&
        mobvali() &&
        agevali() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function namevali() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function mailvali() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function mobvali() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function agevali() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}