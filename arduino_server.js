var express = require('express');
var assignedPort = 3000;
var app = express();
var planetdata = require('./fixtures/earthSized.json');
var arduino = require('./arduino_master');


app.get('/start', function(req,res){
    res.status(200).send('ok\n');
    console.log('start motors');
    arduino.startsteppers(180,20000,200);
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