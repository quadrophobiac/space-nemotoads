/**
 * Created by stephenfortune on 15/12/2015.
 * to keep building a bare bones, non framework dependant server check out here
 * http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/ - with TDD
 * and
 * https://davidbeath.com/posts/testing-http-responses-in-nodejs.html - with TDD
 * and
 * https://gist.github.com/greduan/7743326 - as guidance on a simple server
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