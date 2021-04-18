const ChefsAdmin = require('../../models/ChefsAdmin')
const Admin = require('../../models/Admin')
module.exports = {

    index(req, res) {
        ChefsAdmin.all(function (chefs) {
            return res.render("admin/chefs/index", { chefs })
        })
    },

    create(req, res) {
        return res.render("admin/chefs/create")
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos!')
            }
        }

        ChefsAdmin.create(req.body, function (chef) {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })

    },

    async show(req, res) {
        let results = await ChefsAdmin.find(req.params.id)
        const chef = results.rows[0]

        results = await Admin.findByChef(chef.id)
        const recipes = results.rows

        return res.render("admin/chefs/show", { chef, recipes })
    },

    async edit(req, res) {
        let results = await ChefsAdmin.find(req.params.id)
        const chef = results.rows[0]

        return res.render("admin/chefs/edit", { chef })
    },

    put(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        ChefsAdmin.updade(req.body, function () {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    delete(req, res) {
        ChefsAdmin.delete(req.body.id, function () {
            return res.redirect(`/admin/chefs/`)
        })

    }
}

















