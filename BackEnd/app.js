'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var app = express();

//cargar Rutas
var user_routes = require('./Routes/user');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Configurar Cabeceras
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
    next();
});
//rutas Base
app.use('/api',user_routes);
module.exports =app;