var express = require('express');
var router = express.Router();
var http = require('http');
var pin = 5;
var initialSpeed = 500; // ms
var blinkyController = require('../controllers/blinkyController')(pin, initialSpeed);

router.get('/', blinkyController.get);

router.get('/:speed', blinkyController.setBlinkSpeed);
/* jshint undef: true */

module.exports = router;
