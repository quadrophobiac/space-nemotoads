/**
 * Created by stephenfortune on 15/12/2015.
 */
var http = require("http");

function CentrifugeServer(){}

// the below exports a function with [ 'length','name','arguments','caller','prototype','commence','listen','close','server' ]

//CentrifugeServer.server = new http.Server();
//CentrifugeServer.server.on("connection", function(socket){
//    console.log("Client arrived: " + new Date());
//    socket.on("end", function() {
//        console.log("Client left: " + new Date());
//    });
//})

CentrifugeServer.commence = function(){
    console.log("starting server");
    CentrifugeServer.server = http.createServer(function(req,res){

        res.writeHead(200,{'Content-Type': 'text/plain'});
        res.end('Hello, world!\n');
    });
}



CentrifugeServer.listen = function(){
    CentrifugeServer.server.listen.apply(CentrifugeServer.server, arguments);
}

CentrifugeServer.close = function(callback){
    CentrifugeServer.server.close(callback);
}


module.exports = CentrifugeServer;


// anonymous export
// the below won't export anything if invoked with CentrifugeServer.commence();
// if invoked by new CentrifugeServer() it returns this [ 'length', 'name', 'arguments', 'caller', 'prototype' ]
// ^ none of the defined methods are passed

