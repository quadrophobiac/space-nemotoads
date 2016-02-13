//usage from command line = node arduino_master.js repl
var five = require("johnny-five");
var board = new five.Board({repl: false});

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
    });

    this.stepperArray = new Array(stepper1, stepper2, stepper3);

    // daisy chaining
    //if you set speed after RPM rpm resets and wont move
    //RPM after speed is ok

    // passing opts
    // passing RPM and speed will result in no movement

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
});

board.on('data', function(freq, led){

    console.log("data event trigger");
    led.blink(freq);

});
module.exports = board;