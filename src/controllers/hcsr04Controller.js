var NanoTimer = require('nanotimer');

/* jshint undef: false */
var controller = function(gpioTriggerPin, gpioEchoPin) {
    var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
    var _gpioTriggerPin = gpioTriggerPin;
    var _gpioEchoPin = gpioEchoPin;
    var _triggerPin = gpioController.openPin(_gpioTriggerPin);
    var _echoPin = gpioController.openPin(_gpioEchoPin);
    var _timer = new NanoTimer();

    _triggerPin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);
    _triggerPin.write(Windows.Devices.Gpio.GpioPinValue.low);
    _echoPin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.input);

    var get = function(req, res) {

        var timeOutTimer = new NanoTimer();
        var time;// = process.hrtime();
        _echoPin.addEventListener('valuechanged', onValueChanged);
        _triggerPin.write(Windows.Devices.Gpio.GpioPinValue.high);
        _timer.setTimeout(stopTrigger, '', '15u');
        timeOutTimer.setTimeout(timeout, '', '5s');

        function stopTrigger() {
            _triggerPin.write(Windows.Devices.Gpio.GpioPinValue.low);
        }

        function onValueChanged(eventArgs) {
            if (eventArgs.edge === Windows.Devices.Gpio.GpioPinEdge.risingEdge)
            {
                time = process.hrtime(); // start time count
            }
            else
            {
                var diff = process.hrtime(time);
                var timeSpan = diff[0] * 1e6 + (diff[1] / 1000); // microseconds
                timeOutTimer.clearTimeout();
                _echoPin.removeEventListener('valuechanged', onValueChanged);
                var distance = timeSpan / 58; //(3.4029e-6 * timeSpan) / 2.0; // cm
                res.render('hcsr04', {title: 'HC-SR04 Test', gpioTriggerPin: _gpioTriggerPin, gpioEchoPin: _gpioEchoPin, distance: distance, echo: timeSpan, status: 'OK'});
            }
        }

        function timeout() {
            _echoPin.removeEventListener('valuechanged', onValueChanged);
            res.render('hcsr04', {title: 'HC-SR04 Test', gpioTriggerPin: _gpioTriggerPin, gpioEchoPin: _gpioEchoPin, distance: 'N/A', echo: 'N/A', status: 'Error, timeout reached'});
        }
    };

    return {
        get: get
    };
};

module.exports = controller;
