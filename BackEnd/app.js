'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var app = express();

//cargar Rutas
var user_routes = require('./Routes/user');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Configurar Cabeceras

//rutas Base
app.use('/api',user_routes);
module.exports =app;