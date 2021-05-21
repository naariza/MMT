'use strict'

var express = require('express');
var formController = require('../Controllers/formController');
var api = express.Router();
var md_auth = require('../MidellWare/authenticated');

api.post('/create-form',md_auth.ensureAuth, formController.saveForm);
api.get('/get-form/:id',md_auth.ensureAuth,formController.getForm);
module.exports = api;

