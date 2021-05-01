const Recipes = require('../../models/Recipes')
const Chefs = require('../../models/ChefsAdmin')


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
            return res.render("pages/recipes", { items: recipes })   
            }) 
    },

    pagesChefs(req, res) {        
        Chefs.findAllChefsCountRecipes(chefs =>{
             return res.render("pages/chefs", { chefs })   
        })
    }
  

}