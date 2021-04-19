'use strict'

var express=require('express');
var userController = require('../Controllers/userController');
var api=express.Router();

api.get('/probando-controlador',userController.pruebas);
api.post('/register',userController.UserSave);
api.post('/login',userController.loginUser);
module.exports = api;