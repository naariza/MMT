'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var app = express();
//Configurar Cabeceras
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
    next();
});
//cargar Rutas
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
var user_routes = require('./Routes/user');
var car_routes = require('./Routes/car');
var form_routes = require('./Routes/form');
var preo_routes = require('./Routes/preoperacional')



//rutas Base
app.use('/api',user_routes);
app.use('/api',car_routes);
app.use('/api',form_routes);
app.use('/api',preo_routes);

module.exports =app;