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
            pwm: 3,
            dir: 4
        }
    });

    var motorReporter = function(err, stamp){
        console.log("logging callback func");

        if(!this.isOn){
            console.log("someone has halted motor: "+this.id+" and speed = "+this.currentSpeed);
        } else {
            console.log(this.id+", running = "+this.isOn+", current speed = "+this.currentSpeed);
        }
    }
    //console.log(Object.getOwnPropertyNames(motor));
    //
    //motor.on("forward", motorReporter);
    //motor.on("stop", motorReporter);
    //motor.on("start", motorReporter);

    //stepper1s

    //Arduino syntax
    //Accelstepper1 stepper11(1,10,9); // stepper1 ( , StepPin, DirectionPin )



    var stepper1 = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 200,
        rpm: 180,
        pins: {
            step: 10,
            dir: 9
        }
        // it is better to pass accel and decel as params to a function as they impact speed otherwise
        //eg function stepper1.rpm(189).decel(1600).ccw().step(8000, function(){});
    });
    var stepper2 = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 200,
        rpm: 180,
        pins: {
            step: 2,
            dir: 1
        },
        //speed: 0.75400, increasing this from 0 slows the motor
        accel: 1600,
        decel: 1600
    });
    console.log(Object.getOwnPropertyNames(stepper1));
    var stepperReporter = function(err,stamp){
        console.log(this);
    }
    //
    stepper1.on("step", stepperReporter);
    //console.log(Object.getOwnPropertyNames(stepper2));
    //console.log(stepper2.speed());


    //stepper1.rpm(180).ccw().accel(1600).decel(1600).step(2000, function() {
    //
    //    console.log("Done moving CCW");
    //
    //    // once first movement is done, make 10 revolutions clockwise at previously
    //    //      defined speed, accel, and decel by passing an object into stepper1.step
    //    stepper1.step({
    //        steps: 2000,
    //        direction: five.stepper1.DIRECTION.CW
    //    }, function() {
    //        console.log("Done moving CW");
    //    });
    //});

    // make the LED accessible from REPL command line
    this.repl.inject({
        led: led,
        motor: motor,
        stepper1: stepper1,
        stepper2: stepper2
    });

});



//board.on('data', function(freq, led){
//
//    led.blink(freq);
//
//});