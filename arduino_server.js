var express = require('express');
var assignedPort = 3000;
var app = express();
var planetdata = require('./fixtures/earthSized.json');
var arduino = require('./arduino_master');
var topthree = require('./lib/uniform');

var ARDUINO_BOOT_TIME = 5000;

var gravtorpm = function(){
    var planets = topthree.recent();
}

var rpmVals = {
    0: 170,
    1: 154,
    2: 115.8
}

var retrieveGravity = function(){
    // TODO function from lib that screen and arduino share
}

app.get('/start', function(req,res){
    res.status(200).send('ok\n');
    console.log('start motors');
    arduino.startsteppers(rpmVals,8000);
});

app.get('/ready', function(req,res){
    res.status(200).send('ok\n');
    //console.log(arduino.loop);
});


app.get('/reset', function(req,res){

    if(arduino.steppersRunning()){
        console.log("condition IF ");
        res.status(503).send('retry\n');
    } else {
        console.log("condition ELSE ");
        res.status(200).send('ok\n');
        server.close(function() {
            console.log("Closed out remaining connections.");
            process.exit()
        });
    }
});

var server = app.listen(assignedPort, function(){

    console.log(typeof planetdata);
    //fs.appendFileSync(__dirname+"/logs/server.log", "started\n", 'utf8');
    var port = server.address().port;
    console.log('server listening at port %s', port);
    console.log("planet = "+JSON.stringify(topthree.recent(),null,4));
    setTimeout(function readyBoard() {
        console.log("check avail functions");
        console.log(Object.getOwnPropertyNames(arduino));
        console.log(typeof arduino.loop);


        var state = 0;
        arduino.pinMode(13, arduino.MODES.OUTPUT);



        arduino.loop(11000, function(){

            arduino.wait(11000, function() {
                // Turn it off...
                arduino.digitalWrite(13, (state ^= 1));
                console.log(state);
                if(!arduino.steppersRunning()){
                    arduino.startsteppers(rpmVals,20000);
                }
            });


        })
    }, ARDUINO_BOOT_TIME);
    //logger.log('info', 'server started');
});

module.exports = server;