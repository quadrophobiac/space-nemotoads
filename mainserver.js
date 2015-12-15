/**
 * Created by stephenfortune on 15/12/2015.
 */
'use strict'
var http = require('http');
//
//function MainServer(){
//
//}
//
//MainServer.prototype.create = function() {
//    http.createServer(function (req, res) {
//        res.writeHead(200, {'Content-Type': 'text/plain'});
//        res.end('Hello, world!\n');
//
//    });
//}
//
//MainServer.prototype.listen = function(){
//    MainServer.server.listen.apply(MainServer.server, arguments);
//}
//
//MainServer.prototype.close = function(callback){
//    MainServer.server.close(callback);
//}
//
//module.exports = MainServer;

this.server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('Hello, world!\n');
});

exports.listen = function(){
    this.server.listen.apply(this.server, arguments);
}

exports.close = function(callback){
    this.server.close(callback);
}