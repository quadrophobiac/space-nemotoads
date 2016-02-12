var express = require('express');
var assignedPort = 3000;
var app = express();
var planetdata = require('./fixtures/earthSized.json');
var arduino = require('./arduino_master');

var rpmVals = {
    0: 180,
    1: 154,
    2: 115.8
}
//var rpmVals = {0: 180, 1: 154, 2: 115.8}
//1.18 1.28 1.41 avg = 1.29

var retrieveGravity = function(){
    // TODO function from source-libs that screen and arduino share
}

app.get('/start', function(req,res){
    res.status(200).send('ok\n');
    console.log('start motors');
    arduino.startsteppers(rpmVals,20000);
});

app.get('/pause', function(req,res){
    // pause server and motors
    res.status(200).send('ok\n');
    console.log('begin pausing');
});

app.get('/reset', function(req,res){
    // pause server and motors
    res.status(200).send('ok\n');
    console.log('motors halt, reboot');
});

var server = app.listen(assignedPort, function(){

    console.log(typeof planetdata);
    //fs.appendFileSync(__dirname+"/logs/server.log", "started\n", 'utf8');
    var port = server.address().port;
    console.log('server listening at port %s', port);

    //logger.log('info', 'server started');

    //startarduino();

});
module.exports = server;