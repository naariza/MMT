'use strict'

var express=require('express');
var userController = require('../Controllers/userController');
var api=express.Router();
var md_auth= require('../MidellWare/authenticated')
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./Uploads/users'});

api.get('/probando-controlador',md_auth.ensureAuth,userController.prueba);
api.post('/register',userController.UserSave);
api.post('/login-Admin',userController.loginAdmin);
api.post('/login-User',userController.loginUser);
api.post('/upload-image/:id',[md_auth.ensureAuth,md_upload],userController.uploadImage);
api.get('/get-image-user/:imageFile',userController.getImageFile);
api.put('/update-User/:id',md_auth.ensureAuth,userController.updateUser);

module.exports = api;