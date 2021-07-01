const Recipes = require('../../models/Recipes')
const Chefs = require('../../models/ChefsAdmin')


module.exports = {
    index(req, res) {
      // res.send("ok")
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {

                const pagination = {
                   total: Math.ceil(recipes[0].totapages/limit),
                    page
                }
                return res.render("pages/index", { recipes, pagination,filter })
            }            
        }
       
                Recipes.paginate(params)       

    },

    about(req, res) {
        return res.render("pages/about")
    },

    recipe(req, res) {
        Recipes.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Recipes not found!")

            return res.render("pages/recipe", { items: recipe })
        })
    },

    recipes(req, res) {
        Recipes.all(function (recipes) {
            return res.render("pages/recipes", { items: recipes })
        })
    },

    pagesChefs(req, res) {
        Chefs.findAllChefsCountRecipes(chefs => {
            return res.render("pages/chefs", { chefs })
        })
    },

    filterRecipesByTitle(req, res) {
        const { filter } = req.query
        Recipes.findAllByTitle(filter, recipes => {

            return res.render("pages/filter", { recipes, filter })
        })
    }

}