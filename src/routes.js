const express = require('express')
const routes = express.Router()

const RecipesController = require('./app/controllers/RecipesController')
const AdminController = require('./app/controllers/AdminController')
const ChefsController = require('./app/controllers/ChefsController')


// Rotas Recipes Principais
routes.get("/", RecipesController.index ) //ROTA INDEX
routes.get("/about", RecipesController.about) // ROTA SOBRE
routes.get("/recipes", RecipesController.recipes ) // ROTA DE RECEITAS
routes.get("/recipe/:id", RecipesController.recipe) //  ROTA DE RECIPES
routes.get("/recipes/chefs", RecipesController.chefs); // Mostrar a lista de Chefs


// Rotas Administração
routes.get("/admin/recipes", AdminController.indexRecipe); // Mostrar a lista de receitas
routes.get("/admin/recipes/createRecipe", AdminController.createRecipe); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", AdminController.showRecipe); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/editRecipe", AdminController.editRecipe); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", AdminController.post); // Cadastrar nova receita
routes.put("/admin/recipes",  AdminController.put); // Editar uma receita
routes.delete("/admin/recipes", AdminController.delete); // Deletar uma receita

// Rotas Chefs
routes.get("/admin/chefs", ChefsController.indexChef); // Mostrar a lista de receitas
routes.get("/admin/chefs/createChef", ChefsController.createChef); // Mostrar formulário de nova receita
routes.get("/admin/chefs/:id", ChefsController.showChef); // Exibir detalhes de uma receita
routes.get("/admin/chefs/:id/editChef", ChefsController.editChef); // Mostrar formulário de edição de receita
routes.post("/admin/chefs", ChefsController.post); // Cadastrar nova receita
routes.put("/admin/chefs",  ChefsController.put); // Editar uma receita
// routes.delete("/admin/chefs", ChefsController.delete); // Deletar uma receita

module.exports = routes


