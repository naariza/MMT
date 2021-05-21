'use strict'

var express = require('express');
var preoController = require('../Controllers/preoController');
var api = express.Router();
var md_auth = require('../MidellWare/authenticated');

api.post('/create-preoperacional',md_auth.ensureAuth, preoController.savePreo);
module.exports = api;