//usage from command line = node arduino_master.js repl

var REPLcheck = process.argv.pop();

if(REPLcheck === "repl"){
    console.log('command line invocation');
    var five = require("johnny-five");
    var board = new five.Board({repl: true});
} else {
    console.log('cmd args not passed');
    var five = require("johnny-five");
    var board = new five.Board({repl: false}); // passing this arg makes no difference :/
}

board.on("connect", function(event) {
    console.log("connected");
});

board.on("message", function(event) {
    console.log("message = "+event.message+" : "+event.class);
    if(event.class === "Repl"){
        board.REPL = true;
    }
});

board.on("warn", function(event) {
    console.log("%s sent a 'warn' message: %s", event.class, event.message);
})

board.on("fail", function(event) {
    console.log("%s sent a 'fail' message: %s", event.class, event.message);
});

board.on("ready", function() {
    // Create an Led on pin 13

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

    this.stepperArray = new Array(stepper1, stepper2, stepper3);

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

    var test = function(stepper){
        stepper.step({ steps:16000, accel: 1600, decel: 1600 }, function() {
            console.log("Done stepping!");
            console.log(stepperState(stepper));
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

    this.startsteppers = function(rpmValues,step){
        //console.log(this);

        board.stepperArray.forEach(function(ele,index){
            var slowdown = toptailSmoothing(rpmValues[index]);
            console.log("starting motor "+ele.id+" with values - rpm: "
                +rpmValues[index]+", duration of "+step+" steps "+" toptail of "+slowdown);
            runstepper(ele,rpmValues[index],step,slowdown);
        })
    }

    this.steppersRunning = function(){
        // returns true until all steppers return false for isRunning
        var completeHalt = false;
        board.stepperArray.forEach(function(ele,index){
            //console.log(ele.id+" = "+ele.isRunning);
            completeHalt = ele.isRunning;
        });
        return completeHalt;
    }

    var toptailSmoothing = function(rpm){
        // function to account for odd error in stepper motor where RPM & slowdown vals can conflict
        //return(rpm/1.29);
        var smooth = rpm-30;
        smooth < 100 ? smooth = 100 : smooth
        return smooth;
    }

    if (this.REPL === true) {
        console.log("repl available");
        // make the LED accessible from REPL command line
        var attribs = {
            led: led,
            one: stepper1,
            two: stepper2,
            three: stepper3,
            log: stepperState,
            runstepper: runstepper,
            startsteppers: this.startsteppers,
            steppersrunning: this.steppersRunning
        }
        this.repl.inject(attribs);
        console.log('Arduino connected\n steppers `one` `two ` and `three` available\n ' +
            'use runstepper($name,rpm,steps,speedupdown) to calibrate per stepper values rpm; steps ; accel & decel \n' +
            'use startsteppers(rpmJSON,step) to run all three motors at same time. rpmJSON takes an object in following\n' +
            'format `var rpmJSON = {0: 180, 1: 154, 2: 115.8}`. Copy and paste the preceding var into REPL to test');
    } else {
        console.log("no repl support");
    }

});



board.on('data', function(freq, led){

    console.log("data event trigger");
    led.blink(freq);

});
module.exports = board;