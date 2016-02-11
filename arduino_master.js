var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    // Create an Led on pin 13
    console.log('Arduino connected\n steppers `one` and `three` available\n use runstepper($name,rpm,steps,speedupdown) to calibrate per stepper values rpm; steps ; accel & decel ');
    var led = new five.Led(13);
    led.off(); // set led off for basic board comms debug enabling

    //Arduino syntax
    //Accelstepper1 stepper11(1,10,9); // stepper1 ( , StepPin, DirectionPin )
    //Object.getOwnPropertyNames();
    var stepper1 = new five.Stepper({

        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 400,
        rpm: 180,
        pins: {
            step: 10,
            dir: 9
        },
        accel: 400,
        decel: 400,
        direction: 1
        // it is better to pass accel and decel as params to a function as they impact speed otherwise
        //eg function stepper.rpm(189).decel(1600).ccw().step(8000, function(){});
    });

    var stepper2 = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 400,
        rpm: 180,
        pins: {
            step: 6,
            dir: 5
        },
        accel: 400,
        decel: 400,
        direction: 1
        // it is better to pass accel and decel as params to a function as they impact speed otherwise
        //eg function stepper.rpm(189).decel(1600).ccw().step(8000, function(){});
    });

    var stepper3 = new five.Stepper({
        id: 'stepper3',
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 400,
        rpm: 180,
        pins: {
            step: 2,
            dir: 1
        },
        accel: 400,
        decel: 400,
        direction: 1
        // it is better to pass accel and decel as params to a function as they impact speed otherwise
        //eg function stepper.rpm(189).decel(1600).ccw().step(8000, function(){});
    });

    var stepperArray = [stepper1, stepper2, stepper3];

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

    var test = function(){
        stepper.step({ steps:16000, accel: 1600, decel: 1600 }, function() {
            console.log("Done stepping!");
        });
    }

    var run = function(rpm,step,slowdown){
        stepper.step( // step is a blocking function, ergo problems for simultaneously running
            {
                rpm: rpm,
                steps:step,
                accel: slowdown,
                decel: slowdown
            }, function() {
                console.log("Done stepping!"); // prints after the step
        });
    }

    var runstepper = function(stepper,rpm,step,slowdown){
        console.log("starting stepper "+(stepper.id+1));
        stepper.step( // step is a blocking function, ergo problems for simultaneously running
            {
                rpm: rpm,
                steps:step,
                accel: slowdown,
                decel: slowdown
            }, function() {
                console.log((stepper.id+1)+" done stepping!"); // prints after the step
            });
    }

    var startsteppers = function(rpm,step,slowdown){
        stepperArray.forEach(function(ele,index){
            runstepper(ele,rpm,step,slowdown);
        })
    }
    
    // make the LED accessible from REPL command line
    this.repl.inject({
        led: led,
        one: stepper1,
        three: stepper3,
        log: stepperState,
        runstepper: runstepper,
        startsteppers: startsteppers
    });

});



board.on('data', function(freq, led){

    console.log("data event trigger");
    led.blink(freq);

});