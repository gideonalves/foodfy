const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes") // chama o arquivo routes.js
const methodOverride = require('method-override')


const server = express() // recipes guarda todos as informações que ta dentro o arquivo data.js

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public')) // server.use(express.static('public/css'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function () {
    console.log("server is running")
})





