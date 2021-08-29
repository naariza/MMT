'use strict'

var express = require('express');
var preoController = require('../Controllers/preoController');
var api = express.Router();
var md_auth = require('../MidellWare/authenticated');

api.post('/create-preoperacional',md_auth.ensureAuth, preoController.savePreo);
api.get('/preoperacionales/:id',md_auth.ensureAuth, preoController.getPreoperacionales);
api.get('/preoperacionales-driver/:id',md_auth.ensureAuth, preoController.getPreoperacionalDriver);
module.exports = api;