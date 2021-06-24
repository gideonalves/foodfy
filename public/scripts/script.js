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



// Paginação
const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}


function paginate(selectedPage, totalPages) {
        
    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 1


        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
                
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)

            }

                pages.push(currentPage)

                oldPage = currentPage
        }
    }   
    return pages
}


function createPagination(pagination) {
    

    const filter =  pagination.dataset.filter
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if(String(page).includes("...")) {
            elements += `<span>${page}"</span>`

        } else {
            if ( filter ) {            
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }

        }    
}

pagination.innerHTML = elements

}

const pagination =  document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}


