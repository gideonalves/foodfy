cards = document.querySelectorAll(".card")

// GRUPO DE REPETIÇÃO
for (let card of cards) {
    card.addEventListener("click", function () {
        let recipeIndex = card.getAttribute("id")

        console.log(recipeIndex);
        window.location.href = `/recipe/${recipeIndex}`
    })
}

const hideShow = document.querySelectorAll(".hideShow")
const detailsContent = document.querySelectorAll(".details-content")

for (let i = 0; i < hideShow.length; i++) {
    hideShow[i].addEventListener('click', function () {
        if (hideShow[i].innerHTML == 'ESCONDER') {
               detailsContent[i].setAttribute("hidden", true)
            hideShow[i].innerHTML = 'MOSTRAR'
        } else {
            hideShow[i].innerHTML = 'ESCONDER'
            detailsContent[i].removeAttribute('hidden', true)
        }
    })
}

// adicionando ingredientes

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");
  
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
  }
  
  document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient);


// adicionando Preparação

function addPreparation() {
    const preparations = document.querySelector("#preparations");
    const fieldContainer = document.querySelectorAll(".preparation");
  
    // Realiza um clone do último preparation adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    preparations.appendChild(newField);
  }
  
  document
    .querySelector(".add-preparation")
    .addEventListener("click", addPreparation);    





