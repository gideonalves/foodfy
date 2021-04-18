const Admin = require('../../models/Admin')

module.exports = {

    index(req, res) {
        Admin.all(function (recipes) {

            return res.render("admin/recipes/index", { items: recipes })
        })
    },

    create(req, res) {
        Admin.chefSelectOptions(function (option) {
            return res.render("admin/recipes/create", { chefOptions: option })

        })

    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos!')
            }
        }
        //        fucao    paramet,  paramet
        Admin.create(req.body, function (recipe) { // fuções callback
            // console.log(recipe)
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })

    },

    show(req, res) {
        Admin.find(req.params.id, function (recipes) {
            if (!recipes) return res.send("Recipes not found!")

            return res.render("admin/recipes/show", { items: recipes })
        })
    },

    edit(req, res) {
        Admin.find(req.params.id, function (recipes) {
            if (!recipes) return res.send("Recipes not found!")
            // console.log(recipes)
            return res.render("admin/recipes/edit", { items: recipes })
        })
    },

    put(req, res) {
        // essa parte verifica se o formulario ta vazio -------------------
        const keys = Object.keys(req.body)

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
        Admin.updade(req.body, function () {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },

    delete(req, res) {
        Admin.delete(req.body.id, function () {
            return res.redirect(`/admin/recipes`)
        })

    },

}

















