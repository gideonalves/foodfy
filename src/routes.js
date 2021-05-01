const express = require('express')
const routes = express.Router()

const PagesController = require('./app/controllers/PagesController')
const AdminController = require('./app/controllers/AdminController')
const ChefsController = require('./app/controllers/ChefsController')


// Rotas Recipes Principais
routes.get("/", PagesController.index ) //ROTA INDEX
routes.get("/about", PagesController.about) // ROTA SOBRE
routes.get("/recipes", PagesController.recipes ) // ROTA DE RECEITAS
routes.get("/recipe/:id", PagesController.recipe) //  ROTA DE RECIPES
routes.get('/chefs', PagesController.pagesChefs)
routes.get('/recipes/search', PagesController.filterRecipesByTitle)


// Rotas Administração
routes.get("/admin/recipes", AdminController.indexRecipe); // Mostrar a lista de receitas
routes.get("/admin/recipes/createRecipe", AdminController.createRecipe); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", AdminController.showRecipe); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/editRecipe", AdminController.editRecipe); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", AdminController.post); // Cadastrar nova receita
routes.put("/admin/recipes",  AdminController.put); // Editar uma receita
routes.delete("/admin/recipes", AdminController.delete); // Deletar uma receita

// Rotas Chefs
routes.get("/admin/chefs", ChefsController.indexChef); // Mostrar a lista de chefs
routes.get("/admin/chefs/createChef", ChefsController.createChef); // Mostrar formulário de nova chefs
routes.get("/admin/chefs/:id", ChefsController.showChef); // Exibir detalhes de uma chefs
routes.get("/admin/chefs/:id/editChef", ChefsController.editChef); // Mostrar formulário de edição de chefs
routes.post("/admin/chefs", ChefsController.post); // Cadastrar nova chefs
routes.put("/admin/chefs",  ChefsController.put); // Editar uma chefs
routes.delete("/admin/chefs", ChefsController.delete); // Deletar uma chefs

module.exports = routes


