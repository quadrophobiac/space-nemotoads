/**
 * Created by stephenfortune on 15/12/2015.
 */
'use strict'
var http = require('http');


this.server = http.createServer(function(req,res){
    console.log("server start");
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('Hello, world!\n');
});

exports.listen = function(){
    this.server.listen.apply(this.server, arguments);
}

exports.close = function(callback){
    this.server.close(callback);
}