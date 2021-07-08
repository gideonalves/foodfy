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



// UPLOAD DE IMAGE

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5, // quantidade de imgem
    files: [],

    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            // cria uma imagem
            reader.onload = () => {
                const image = new Image() /* <img/> */
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },

    // hasLimit(event) {
    //     const { uploadLimit, input, preview } = PhotosUpload

    //     const { files: fileList } = input

    //     if(fileList.length > uploadLimit) {
    //         alert(`Envie no máximo ${uploadLimit} fotos`)
    //         event.preventDefault()
    //         return true
    //     }

    //     const photosDiv = []
    //     this.preview.childNodes.forEach(item => {
    //         if (item.classList && item.classList.value == "photo")
    //             photosDiv.push(item)
    //     })

    //     const totalPhotos = fileList.length + photosDiv.length
    //     if (totalPhotos > uploadLimit) {
    //         alert("Você atingiu o limite máximo de fotos")
    //         event.preventDefault()
    //         return true
    //     }


    //     return false
    // },

    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false
    },
    
    getContainer(image) {
        const div = document.createElement('div')
                div.classList.add('photo')

                div.onclick = () => alert("remover foto")

                div.appendChild(image)

                return div
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },

}

  