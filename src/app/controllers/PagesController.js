const Recipes = require('../../models/Recipes')


module.exports = {

    index(req, res) {
        Recipes.all(function( recipes ) {
        return res.render("pages/index", { recipes })   
        }) 
    }, 
    
    about(req, res) {
        return res.render("pages/about")
    },    
  
    recipe(req, res) {
        Recipes.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipes not found!") 

            return res.render("pages/recipe", { items: recipe })        
        })
    },

    recipes(req, res) {
        Recipes.all(function(recipes) {
            return res.render("recipes/recipes", { items: recipes })   
            }) 
    },

    chefs(req, res) {
        Recipes.allChefs(function (chefs) {
            return res.render("recipes/chefs", { chefs })
        })
    }

}