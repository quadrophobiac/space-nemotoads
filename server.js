/**
 * Created by stephenfortune on 27/12/2015.
 */
var express = require('express');
var app = express();
var assignedPort = 5000;
var fs = require('fs');
var winston = require('winston');
//var planets = require(__dirname+"/client/data/earthSized.json"); // new location
var planets = require(__dirname+"/fixtures/earthSized.json"); // old location

var logger = new (winston.Logger)({
    transports: [

        new (winston.transports.File)({ filename: './logs/server.log' })
    ]
});
//winston.add(winston.transports.File, { filename: './logs/server.log' });

app.use(express.static(__dirname+'/client'));

//var logFile = fs.createWriteStream(__dirname+"/logs/server.log", {flags: 'a'});
//app.use(morgan('combined',{stream: logFile}))

app.get('/', function(req,res){
    //fs.appendFileSync(__dirname+"/logs/server.log", "GET REQ RECEIVED\n", 'utf8');
    res.status(200).send('ok\n');
    logger.log('info', 'root requested by GET');
});

app.get('/index.html', function(req,res){
    res.status(200).send('ok\n');
    logger.log('info', 'index requested by GET');
});

app.get('/planets', function(req,res){
    // publish json object to end point
    console.log("PLANETS");
    res.status(200).json(planets);
});

app.get('/planets/:planet_id', function(req, res) {
        // make arrayindexed elements of planets json object available over API
        //res.send(allplanets[req.params.planet_id]);
        res.json(planets[req.params.planet_id]);
});

var seedArr = []
// TODO fill seedarr with 3 numbers

app.get('/selected_planets', function(req,res){
    // TODO use seed arr to generate an endpoint containing only three randomly selected planets
    // TODO use this as the endpoint that the backbone app consumes

})

app.get('/logs', function(req,res){
    //var logs = fs.readFileSync(__dirname+"/logs/server.log", 'utf8');
    var logs;
    fs.readFile(__dirname+"/logs/server.log", function(error, data){
        console.log("async complete")
        console.log(data);
    });
    //var logContent = JSON.parse(logs);
    console.log(logs);
    //res.sendfile(logs);
});

var server = app.listen(assignedPort, function(){

    //fs.appendFileSync(__dirname+"/logs/server.log", "started\n", 'utf8');
    var port = server.address().port;
    console.log('server listening at port %s', port);
    logger.log('info', 'server started');
});
module.exports = server;