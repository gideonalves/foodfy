const ChefsAdmin = require('../../models/ChefsAdmin')
const Recipes = require('../../models/Recipes')

module.exports = {

    indexChef(req, res) {
        ChefsAdmin.all(function (chefs) {
            return res.render("admin/chefs/indexChef", { chefs })
        })
    },

    createChef(req, res) {
        return res.render("admin/chefs/createChef")
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos!')
            }
        }

        ChefsAdmin.create(req.body, function (chef) {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },


    showChef(req, res) {

        ChefsAdmin.find(req.params.id, function (chef) {
            if (!chef) return res.send("Recipes not found!")

            ChefsAdmin.findRecipes(req.params.id, function (recipes) {
                if (!recipes) return res.send("Recipes not found!")

                res.render("admin/chefs/showChef", { chef, recipes, msgError: '' })
            })

        })

    },

    editChef(req, res) {
        ChefsAdmin.findById(req.params.id, function (chef) {
            if (!chef) return res.send("Chef not found!")

            return res.render("admin/chefs/editChef", { chef })
        })
    },

    put(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        ChefsAdmin.updade(req.body, function () {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    delete(req, res) {
        Recipes.findOneByChef(req.body.id, recipes => {

            if (recipes.length == 0) {
                ChefsAdmin.delete(req.body.id, function () {
                    ChefsAdmin.all(function (chefs) {
                        return res.render("admin/chefs/indexChef", { chefs, msgError: "" })
                    })
                })

            } else {
                ChefsAdmin.findById(req.body.id, chef => {
                    ChefsAdmin.findRecipes(req.body.id, recipes => {
                        res.render("admin/chefs/showChef", { chef, recipes, msgError: 'Impossivel deletar o chef com receitas cadastradas, "exclua suas receitas depois delete o chef!"' })
                    })
                })
            }
        })

    }
}

















