var express = require('express');
var router = express.Router();
var http = require('http');
var triggerPin = 23;
var echoPin = 24;
var hcsr04Controller = require('../controllers/hcsr04Controller')(triggerPin, echoPin);

router.get('/', hcsr04Controller.get);

module.exports = router;
