var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    // Create an Led on pin 13
    console.log('Arduino connected');
    var led = new five.Led(13);
    led.off(); // set led off for basic board comms debug enabling
    var motor = new five.Motor([3, 8, 11]);

    //Arduino syntax
    //Accelstepper1 stepper11(1,10,9); // stepper1 ( , StepPin, DirectionPin )
    //Object.getOwnPropertyNames();
    var stepper = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 400,
        rpm: 180,
        pins: {
            step: 10,
            dir: 9
        },
        accel: 400,
        decel: 400
        // it is better to pass accel and decel as params to a function as they impact speed otherwise
        //eg function stepper.rpm(189).decel(1600).ccw().step(8000, function(){});
    });

    // daisy chaining
    //if you set speed after RPM rpm resets and wont move
    //RPM after speed is ok

    // passing opts
    // passing RPM and speed will result in no movement

    //EG FUNCTIONS
    //stepper.step({ steps:16000, direction: 1, accel: 1600, decel: 1600 }, function() { console.log("Done stepping!");});

    var stepperState = function(stepObj){
        return {
            hello: "world",
            rpm: stepObj.rpm(),
            speed: stepObj.speed(),
            acceleration: stepObj.accel(),
            deceleration: stepObj.decel()
        }
    }

    function test(){
        stepper.step({ steps:16000, direction: 1, accel: 1600, decel: 1600 }, function() { console.log("Done stepping!");})();
    }

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
        stepper: stepper,
        log: stepperState,
        test: test
    });

});



//board.on('data', function(freq, led){
//
//    led.blink(freq);
//
//});