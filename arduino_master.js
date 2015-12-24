var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    // Create an Led on pin 13
    console.log('Arduino connected');
    var led = new five.Led(13);
    // Blink every half second
    //led.blink(500);
    led.off();

    var motor = new five.Motor({
        id: "motor1",
        pins: {
            pwm: 9,
            dir: 8
        }
    });

    var step = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 200,
        pins: [ 11, 12 ]
    });


    var motorReporter = function(err, stamp){
        console.log("logging callback func");

        if(!this.isOn){
            console.log("someone has halted motor: "+this.id+" and speed = "+this.currentSpeed);
        } else {
            console.log(this.id+", running = "+this.isOn+", current speed = "+this.currentSpeed);
        }
    }
    console.log(Object.getOwnPropertyNames(motor));

    motor.on("forward", motorReporter);
    motor.on("stop", motorReporter);
    motor.on("start", motorReporter);

    // make the LED accessible from REPL command line
    this.repl.inject({
        led: led,
        motor: motor,
        stepper: step
    });

});



//board.on('data', function(freq, led){
//
//    led.blink(freq);
//
//});