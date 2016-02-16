var express = require('express');
var assignedPort = 3000;
var app = express();
var planetdata = require('./fixtures/earthSized.json');
var arduino = require('./arduino_master');
var topthree = require('./lib/uniform');

var ARDUINO_BOOT_TIME = 15000;
var SPINNER_ON = 600000;
var SPINNER_REST = SPINNER_ON/5;

var gravtorpm = function(){
    var planets = topthree.recent();
    var rmpvals = {};

    planets.forEach(function(ele,index){
        //console.log(ele['pl_name']);
        var g = ele['gravity'];
        //console.log("grav = "+g);
        var denominator = parseFloat(111.8);
        //console.log(typeof denominator);
        var remainder = g/denominator;
        //console.log(typeof remainder);
        var rpm = Math.ceil((Math.sqrt(remainder))*1000);
        //console.log("rmp = "+rpm);
        rmpvals[2-index] = rpm;
    });
    return rmpvals;
}

var calibrateStep = function(rpmvalues){
    //console.log(rpmvalues);

    var stepvals = {};

    for(var r in rpmvalues){
        //console.log("iter");
        //console.log(r);

        var rpm = rpmvalues[r];
        //console.log(typeof rpm);
        //console.log(rpm);
    //rpmvalues.forEach(function(ele,index){
        if(rpm >= 95 && rpm <= 120) {
            //console.log(380200);
            stepvals[r] = 380200;
        } else if (rpm >= 121 && rpm <= 150){
            //console.log(440200);
            stepvals[r] = 440200;
        } else if (rpm >= 151 && rpm <= 180){
            //console.log(500200);
            stepvals[r] = 500200;
        }
    //console.log(stepvals);
    }
    return stepvals;
}

app.get('/', function(req,res){
    res.status(200).send('ok\n');
});

app.get('/start', function(req,res){
    res.status(200).send('ok\n');
    //console.log('start motors');
    //arduino.startsteppers(rpmVals,8000);
});

app.get('/ready', function(req,res){
    res.status(200).send('ok\n');
    //console.log(arduino.loop);
});

app.get('/reset', function(req,res){

    if(arduino.steppersRunning()){
        //console.log("condition IF ");
        res.status(503).send('retry\n');
    } else {
        //console.log("condition ELSE ");
        res.status(200).send('ok\n');
        server.close(function() {
            //console.log("Closed out remaining connections.");
            process.exit()
        });
    }
});

var server = app.listen(assignedPort, function(){

    var rpmvals = gravtorpm(topthree.recent());
    console.log("rpm: "+JSON.stringify(rpmvals));

    //console.log(typeof planetdata);
    //fs.appendFileSync(__dirname+"/logs/server.log", "started\n", 'utf8');
    var port = server.address().port;
    console.log('server listening at port %s', port);
    //console.log("planet = "+JSON.stringify(topthree.recent(),null,4));
    setTimeout(function readyBoard() {
        console.log('start time: ');
        console.log(new Date());
        //arduino.startsteppers(rpmvals,steps);
    }, ARDUINO_BOOT_TIME);
    console.log('now start arduino');

    var steps = calibrateStep(rpmvals);
    //console.log("calibrated steps");
    //console.log(steps);
    //console.log(Object.getOwnPropertyNames(arduino));

    // this is the main loop

    arduino.loop(SPINNER_ON, function(){
        arduino.led.on();
        arduino.wait(SPINNER_REST, function() {
            arduino.led.off();
            if(!arduino.steppersRunning()){
                console.log("starting cycle @");
                console.log(new Date());
                arduino.startsteppers(rpmvals,steps);
            } // end check if still running
        }); // end wait
    }); // end loop

});

module.exports = server;