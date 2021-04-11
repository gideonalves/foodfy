const Recipes = require('../../models/Recipes')

module.exports = {

    index(req, res) {
        Recipes.all(function(recipes) {
        return res.render("recipes/index", { items: recipes })   
        }) 
    }, 

    
    about(req, res) {
        return res.render("recipes/about")
    },
    
    // exports.recipes = function (req, res) {
    //     return res.render("recipes/recipes", { items: data.recipes })
    // }

    recipe(req, res) {
        Recipes.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipes not found!")

            return res.render("recipes/recipe", { items: recipe })
        })
   },

    // recipe(req, res) {
    //     const recipeIndex = req.params.index;
    //     data[recipeIndex]
    //     const recipe = data.recipes[recipeIndex]
    //     console.log(recipe)
    
    //     return res.render("recipes/recipe", { items: recipe })
    // }
    
    // exports.recipe = function (req, res) {
        //     const recipeIndex = req.params.index;
        //     data[recipeIndex]
        //     const recipe = data.recipes[recipeIndex]
        //     console.log(recipe)
        
        //     return res.render("recipes/recipe", { items: recipe })
        // }
}