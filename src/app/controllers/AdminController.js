const RecipesAdmin = require('../../models/RecipesAdmin')
const Files = require('../../models/File')
const RecipesFile = require('../../models/RecipesFile')

module.exports = {
    // Home
    indexRecipe(req, res) {
        RecipesAdmin.all(function (recipes) {
            return res.render("admin/recipes/indexRecipe", { recipes })
        })
    },
    // Criar
    createRecipe(req, res) {
        RecipesAdmin.chefSelectOptions(function (options) {
            return res.render("admin/recipes/createRecipe", { chefOptions: options })
        })
    },

    // Enviar
    async post(req, res) {
        // verifica se todos os campos esta preenchido **********
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos!')
            }
        }
        //********************************************************
        if (req.files.length == 0)
            return res.send('Envie pelomenos uma imagem')
        try {

            // Cadastra Um recipe que vem do POST  na tabela recipes do Banco de dados
            const result = await RecipesAdmin.create(req.body)
            // Recebe o retorno do id do recipe criado no banco;
            const idRecipe = result.rows[0].id
            // if (idRecipes)
            //     return res.send('Error on create Recipes')

            const files = req.files
            let idFile = 0
            files.forEach(async (file) => {
                const resultFile = await Files.create(file.filename, file.path);
                idFile = resultFile.rows[0].id
                await RecipesFile.create(idRecipe, idFile)
            });

            return res.redirect(`/admin/recipes/${idRecipe}`)

        } catch (error) {
            return res.send(error)
        }

        //        fucao    paramet,  paramet
        RecipesAdmin.create(req.body, function (recipe) { // fuções callback
            // console.log(recipe)
        })
    },

    // showRecipe(req, res) {
    //     RecipesAdmin.find(req.params.id, function (recipes) {

    //         if (!recipes) return res.send("Recipes not found!")

    //         return res.render("admin/recipes/showRecipe", { items: recipes })
    //     })
    // },
    async showRecipe(req, res) {
        const { id } = req.params
        // faz a consulta das receitas e dos files
        const result = await RecipesAdmin.find(id)

        if (!result) return res.send("Recipes not found!")

        // desistruturação recipe
        const { recipe } = result
        // desistruturação files
        const { files } = result

        return res.render("admin/recipes/showRecipe", { items: recipe, files })
    },

    editRecipe(req, res) {
        RecipesAdmin.find(req.params.id, function (recipes) {
            if (!recipes) return res.send("Recipes not found!")

            RecipesAdmin.chefSelectOptions(function (options) {
                // return res.render("admin/recipes/editRecipe", { items: recipes, chefOptions: options })

            })

            return res.render("admin/recipes/editRecipe", { items: recipes })
        })
    },

    // async editRecipe(req, res) {

    //     //  RecipesAdmin.find(req.params.id, function (recipes) {
    //     let results = await RecipesAdmin.find(req.params.id)
    //     const recipes = results.rows       

    //     results = await RecipesAdmin.chefSelectOptions(options)

    //     if (!recipes) return res.send("Recipes not found!")       

    //     // get images
    //     results = await Files.findFileForId(files.id)
    //     let files = results.rows
    //            // Caminho das imagens do banco 
    //     files = files.map(file => ({
    //         ...file,
    //         src: `${req.protoco}://${req.headers.host}${file.path.replace("plublic", "")}`
    //     }))

    //     return res.render("admin/recipes/editRecipe", { items: recipes, chefOptions: options, items: files })
    // },

    put(req, res) {
        // essa parte verifica se o formulario ta vazio -------------------
        const keys = Object.keys(req.body)
        // return res.send(keys)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }
        // filtro do array ingredites para remover item vazio
        req.body.ingredients = req.body.ingredients.filter(function (item) { // filter precisa retornar boolean se o boolean for verdadeiro ele mantem o item no array  se for false ele tira o item do array                     
            // console.log(item != "")
            return item != ""

            // if(item == "") // aqui to falando que o item ta vazio
            // {
            //     return false // essa linha tira o item do arrey 
            // }
            // return true // essa linha mantem o item no arrey
        })

        // console.log(req.body.ingredients)
        //-----------------------------------------------------------------
        RecipesAdmin.updade(req.body, function () {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },

    delete(req, res) {
        RecipesAdmin.delete(req.body.id, function () {
            return res.redirect(`/admin/recipes`)
        })

    },

}

















