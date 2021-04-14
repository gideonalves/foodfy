 const ChefsAdmin = require('../../models/ChefsAdmin')

module.exports = {

    index(req, res) {           
        ChefsAdmin.all(function(chefs) {
            console.log(chefs)
            return res.render("admin/chefs/index", { chefs })
        })
    },

    create(req, res) {
        return res.render("admin/chefs/create")        
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
             return res.send('Preencha todos os campos!')
            }
        }
        
        ChefsAdmin.create(req.body, function(recipe) {
            return res.redirect(`/admin/chefs/${items.recipes.id}`)
        })
       
    },

    show(req, res) {
        ChefsAdmin.find(req.params.id, function(chef, recipes, totalRecipes) {
            if(!chef) return res.send("Recipes not found!")
            

            return res.render("admin/chefs/show", { chef, recipes, totalRecipes })
        })
   },

    edit(req, res) {
        ChefsAdmin.find(req.params.id, function(recipes) {
            if(!recipes) return res.send("Recipes not found!")

            return res.render("admin/chefs/edit", {items: recipes})
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

    //-----------------------------------------------------------------
    ChefsAdmin.updade(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    delete(req, res) {
        return
    }
}

















