const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const fileUpload = require('express-fileupload');
const routes = require('./routes.js')
var bodyParser = require('body-parser')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))
server.use(fileUpload({ debug: true }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Home Route

server.get('/', (req, res) => {
 
    res.render('home',)

})

//Routes 

server.use('/', routes)



module.exports = server