/**
 * CREDIT https://gist.github.com/debugish/102970675a949a58abcf
 * Hardware tested:
 *
 *  Arduino Mega 2560 (microcontroller)
 *
 *  Big Easy Driver (stepper motor controller)
 *
 *  42HS4013A4 (4 wire stepper motor)
 *
 * This is an example of basic stepper motor functionality for a four wire stepper
 * motor using johnny-five. Of course you should be using the proper Stepper
 * class from johnny-five.
 *
 **/

var five = require("johnny-five");
var board = new five.Board();
var NanoTimer = require('nanotimer');

var LOW = 0;
var HIGH = 1;
var INPUT = 0;
var OUTPUT = 1;

board.on("ready", function() {

    // This pin controls direction it should be going
    //
    // HIGH for one direction, LOW for the other.
    var dirPin = 8;

    // set to HIGH then LOW to trigger one steppermotor step
    var stepPin = 9;

    // Let the board know we will be writing to these pins (Digital HIGH/LOW)
    board.pinMode(dirPin, OUTPUT);
    board.pinMode(stepPin, OUTPUT);

    // Set a default direction
    board.digitalWrite(dirPin, HIGH);

    // high resolution timer, this will allow us to alternate digital high / lows
    // at a microsecond scale.
    var timer = new NanoTimer();

    var highOrLow = HIGH;

    timer.setInterval(function() {

        board.digitalWrite(stepPin, highOrLow);

        // Alternate between 0/1
        highOrLow = ~~!highOrLow

    }, [], '250u'); // 250 microseconds delay between HIGH/LOW's

    // After this amount of time stop.
    setTimeout(function () {
        timer.clearInterval();
    }, 5000);

});