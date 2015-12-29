/**
 * Created by stephenfortune on 27/12/2015.
 */
var express = require('express');
var app = express();
var assignedPort = 3000;
var fs = require('fs');
var logfile = require('./logger.js');

app.get('/', function(req,res){
    fs.appendFileSync(__dirname+"/logs/server.log", "GET REQ RECEIVED\n", 'utf8');
    res.status(200).send('ok\n');
});

app.get('/index.html', function(req,res){
    res.status(200).send('ok\n');
});

var server = app.listen(assignedPort, function(){

    fs.appendFileSync(__dirname+"/logs/server.log", "started\n", 'utf8');
    var port = server.address().port;
    console.log('server listening at port %s', port);
});
module.exports = server;