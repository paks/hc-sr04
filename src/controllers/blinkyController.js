var uwp = require('uwp');
uwp.projectNamespace('Windows');

/* jshint undef: false */
var controller = function(pgpioPin, speed) {
    var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
    var _timeout = speed;
    var _gpioPin = pgpioPin;
    var _pin = gpioController.openPin(_gpioPin);

    var setBlinkSpeed = function(req, res) {
        _timeout = req.params.speed;
        res.render('blinky', {title: 'Blinky test', gpioPin: _gpioPin, timeout: _timeout});
    };

    var get = function(req, res) {
        var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
        _pin.write(currentValue);
        _pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);
        setTimeout(flipLed, _timeout);

        function flipLed() {
            if (currentValue === Windows.Devices.Gpio.GpioPinValue.high) {
                currentValue = Windows.Devices.Gpio.GpioPinValue.low;
            } else {
                currentValue = Windows.Devices.Gpio.GpioPinValue.high;
            }
            _pin.write(currentValue);
            setTimeout(flipLed, _timeout);
        }
        res.render('blinky', {title: 'Blinky test', gpioPin: _gpioPin, timeout: _timeout});
    };

    return {
        get: get,
        setBlinkSpeed: setBlinkSpeed
    };
};

module.exports = controller;
