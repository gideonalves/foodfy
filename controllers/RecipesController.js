const data = require('../data.json')

exports.index = function (req, res) {
    return res.render("recipes/index", { items: data.recipes })
    
}                                      

exports.about = function (req, res) {
    return res.render("recipes/about")
}

exports.recipes = function (req, res) {
    return res.render("recipes/recipes", { items: data.recipes })
}

exports.recipe = function (req, res) {
    const recipeIndex = req.params.index;
    data[recipeIndex]
    const recipe = data.recipes[recipeIndex]
    console.log(recipe)

    return res.render("recipes/recipe", { items: recipe })
}