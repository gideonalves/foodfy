const Recipes = require('../../models/Recipes')

module.exports = {

    index(req, res) {
        Recipes.all(function(recipes) {
        return res.render("recipes/index", { recipes })   
        }) 
    }, 
    
    about(req, res) {
        return res.render("recipes/about")
    },    
  
    recipe(req, res) {
        Recipes.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipes not found!") 

            return res.render("recipes/recipe", { items: recipe })        
        })
    }
      
}