var express = require('express');
var router = express.Router();
var http = require('http');
var uwp = require('uwp');
uwp.projectNamespace('Windows');
/* jshint undef: false */
var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var gpioPin = 5;
var timeout = 500;
var pin = gpioController.openPin(gpioPin);

router.get('/', function(req, res, next) {
    var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    pin.write(currentValue);
    pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);
    setTimeout(flipLed, timeout);

    function flipLed() {
        if (currentValue === Windows.Devices.Gpio.GpioPinValue.high) {
            currentValue = Windows.Devices.Gpio.GpioPinValue.low;
        } else {
            currentValue = Windows.Devices.Gpio.GpioPinValue.high;
        }
        pin.write(currentValue);
        setTimeout(flipLed, timeout);
    }
    res.render('blinky', {title: 'Blinky test', gpioPin: gpioPin, timeout: timeout});
});

router.get('/:timeout', function(req, res, next) {
    timeout = req.params.timeout;
    res.render('blinky', {title: 'Blinky test', gpioPin: gpioPin, timeout: timeout});
});
/* jshint undef: true */

module.exports = router;
