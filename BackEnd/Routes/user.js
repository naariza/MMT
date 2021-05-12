'use strict'

var express=require('express');
var userController = require('../Controllers/userController');
var api=express.Router();
var md_auth= require('../MidellWare/authenticated')
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./Uploads/users'});


api.post('/register',userController.UserSave);
api.post('/login-Admin',userController.loginAdmin);
api.post('/login-User',userController.loginUser);
api.post('/upload-image/:id',[md_auth.ensureAuth,md_upload],userController.uploadImage);
api.get('/get-image-user/:imageFile',userController.getImageFile);
api.get('/get-users/:page?',md_auth.ensureAuth,userController.getUsers);
api.get('/get-driver/:id?',md_auth.ensureAuth,userController.getDriver);
api.get('/get-drivers/:car?',md_auth.ensureAuth,userController.getDrivers);
api.get('/get-user/:id',md_auth.ensureAuth,userController.getUser);
api.put('/update-User/:id',md_auth.ensureAuth,userController.updateUser);
api.delete('/user-delete/:id',md_auth.ensureAuth,userController.deleteUser);
module.exports = api;