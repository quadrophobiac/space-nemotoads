/**
 * Created by stephenfortune on 13/02/2016.
 */
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    this.led = new five.Led(13);

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

    var attribs = {
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

    var SPINNER_ON = 600000;
    var SPINNER_REST = SPINNER_ON/5;

    this.loop(SPINNER_ON, function(){
        arduino.led.on();
        arduino.wait(SPINNER_REST, function() {
            //        arduino.led.off();
            if(!arduino.steppersRunning()){
                console.log("starting cycle @");
                console.log(new Date());
                arduino.startsteppers(rpmvals,SPINNER_REST);
            } // end check if still running
        }); // end wait
    }); // end loop

});