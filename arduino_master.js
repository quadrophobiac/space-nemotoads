var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    // Create an Led on pin 13
    console.log('Arduino connected');
    var led = new five.Led(13);
    // Blink every half second
    //led.blink(500);
    led.off();

    var stepper = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 200,
        pins: {
            step: 11,
            dir: 12
        }
    });

    var motor = new five.Motor({
        pins: {
            pwm: 3,
            dir: 4
        }
    });

    // make the LED accessible from REPL command line
    this.repl.inject({
        led: led,
        stepper: stepper,
        motor: motor
    });
});



//board.on('data', function(freq, led){
//
//    led.blink(freq);
//
//});