const fs = require('fs')
const data = require('../data.json')

exports.index = function (req, res) {
    return res.render("admin/recipes/index", { items: data.recipes })
    
} 

exports.create = function (req, res) {
    return res.render("admin/recipes/create")
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
             return res.send('Preencha todos os campos!')
        }
    }

    let { title, image, ingredient, preparation, information } = req.body

    const id =  Number (data.recipes.length + 1)

    data.recipes.push({ 
        id,
        title, 
        image, 
        ingredient, 
        preparation,
        information 
    }) // pucha as informações que vem do formulario

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file erro!")

        return res.redirect("/admin/recipes/create")
    })
}

// // mostra as informações
exports.show = function (req, res) {
    
    //destruturando o id
    const { id } = req.params

    const foundRecipes = data.recipes.find(function(recipes) {
        return recipes.id == id
        console.log(foundRecipes)
    })
    
    if (!foundRecipes) return res.send("Receita não encontrada")

    const recipe = {
        ...foundRecipes,
    }

    return res.render("admin/recipes/show", { items: foundRecipes })
}

exports.edit = function (req, res) {
    
    //destruturando o id
    const { id } = req.params

    const foundRecipes = data.recipes.find(function(recipes) {
        return recipes.id == id
        // console.log(foundRecipes)
    })
    if (!foundRecipes) return res.send("Receita não encontrada")

    return res.render("admin/recipes/edit", { items: foundRecipes })
}

exports.put = function(req, res) {
    //destruturando o id
    const { id } = req.body
    let index = 0

    const foundRecipes = data.recipes.find(function(recipes, foundIndex) {
        if (id == recipes.id) {
            index = foundIndex
            return true
        }        
    })

    if (!foundRecipes) return res.send("Receita não encontrada")

    const recipe = {
        ...foundRecipes,
        ...req.body
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file erro!")

        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.delete = function(req, res ) {
    const { id } = req.body

    const filteredTeacher = data.recipes.filter(function(recipes) {
        return recipes.id != id
    })
    data.recipes = filteredTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!") 

        return res.redirect("/admin/recipes")
    })
}
















