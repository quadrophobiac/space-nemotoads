/**
 * Created by stephenfortune on 27/12/2015.
 */
var express = require('express');
var app = express();
var assignedPort = 3000;
var fs = require('fs');
var winston = require('winston');
// winston vs morgan = http://devgigs.blogspot.ie/2014/01/mastering-nodejs-logging.html || https://www.loggly.com/ultimate-guide/node-logging-basics/


var logger = new (winston.Logger)({
    transports: [

        new (winston.transports.File)({ filename: './logs/server.log' })
    ]
});
//winston.add(winston.transports.File, { filename: './logs/server.log' });

app.use(express.static(__dirname+'/'));

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