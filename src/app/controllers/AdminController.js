 const Admin = require('../../models/Admin')

module.exports = {

    index(req, res) {           
        Admin.all(function(recipes) {

            return res.render("admin/recipes/index", {items: recipes })
        })
    },

    create(req, res) {
        return res.render("admin/recipes/create")        
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
             return res.send('Preencha todos os campos!')
            }
        }
      //        fucao    paramet,  paramet
        Admin.create(req.body, function(recipe) { // fuções callback
            console.log(recipe)
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
     
    },

    show(req, res) {
        Admin.find(req.params.id, function(recipes) {
            if(!recipes) return res.send("Recipes not found!")

            return res.render("admin/recipes/show", {items: recipes})
        })
   },

    edit(req, res) {
        Admin.find(req.params.id, function(recipes) {
            if(!recipes) return res.send("Recipes not found!")

            return res.render("admin/recipes/edit", {items: recipes})
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
        Admin.updade(req.body, function() {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },

    delete(req, res) {
        Admin.delete(req.body.id, function() {
            return res.redirect(`/admin/recipes`)
        })

    },
}

















