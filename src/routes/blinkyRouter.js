var express = require('express');
var router = express.Router();
var http = require('http');
var uwp = require('uwp');

/* jshint undef: false */
router.get('/', function(req, res, next) {
    uwp.projectNamespace('Windows');
    var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
    var pin = gpioController.openPin(5);
    var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    pin.write(currentValue);
    pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);
    setTimeout(flipLed, 500);

    function flipLed() {
        if (currentValue === Windows.Devices.Gpio.GpioPinValue.high) {
            currentValue = Windows.Devices.Gpio.GpioPinValue.low;
        } else {
            currentValue = Windows.Devices.Gpio.GpioPinValue.high;
        }
        pin.write(currentValue);
        setTimeout(flipLed, 500);
    }
    res.render('blinky', {title: 'Blinky test', gpioPin: 5, timeout: 500});
});
/* jshint undef: true */

module.exports = router;
