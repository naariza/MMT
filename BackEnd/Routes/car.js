'use strict'

var express = require('express');
var carController = require('../Controllers/carController');
var api = express.Router();
var md_auth = require('../MidellWare/authenticated');

var multipart = require('connect-multiparty');
const car = require('../Models/car');
var md_upload = multipart({uploadDir:'./Uploads/cars'});


api.get('/get-car/:id',md_auth.ensureAuth, carController.getCar);
api.post('/register-car',md_auth.ensureAuth, carController.saveCar);
api.get('/cars/:page?',md_auth.ensureAuth, carController.getCars);
api.put('/update-car/:id',md_auth.ensureAuth, carController.updateCar);
api.delete('/delete-car/:id',md_auth.ensureAuth, carController.deleteCar);
api.post('/upload-image-car/:id',[md_auth.ensureAuth,md_upload],carController.uploadImage)
api.get('/get-image-car/:imageFile',carController.getImageFile);

module.exports = api; 