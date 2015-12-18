/**
 * Created by stephenfortune on 15/12/2015.
 */
var http = require("http");
var dispatcher = require('httpdispatcher');

function CentrifugeServer(){}

// the below exports a function with [ 'length','name','arguments','caller','prototype','commence','listen','close','server' ]




CentrifugeServer.server = http.Server();


CentrifugeServer.server.on("connection", function(socket){
    console.log("Client arrived: " + new Date());
    socket.on("end", function() {
        console.log("Client left: " + new Date());
    });
})
CentrifugeServer.server.on("request", function(req, res) {
    //console.log(JSON.stringify(request,null,4));
    console.log(Object.getOwnPropertyNames(req));
    console.log(req);
    console.log(res);
    //console.log("response code = "+response.statusCode);

    //request.setEncoding("utf8");
    req.on("readable", function(data) {
        console.log("in readable");
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("FUCK THIS SHIT");
        res.end('Got Post Data');
    });
    //return response;
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    //res.write();
    //res.end('Got Post Data');
});
CentrifugeServer.server.setTimeout(2000, function(socket) {
    socket.write("Too Slow!\n", "utf8");
    socket.end();
});


// testable

//CentrifugeServer.commence = function(){
//    console.log("starting server");
//    CentrifugeServer.server = http.createServer(function(req,res){
//
//        res.writeHead(200,{'Content-Type': 'text/plain'});
//        res.end('Hello, world!\n');
//    });
//}
//
//CentrifugeServer.listen = function(){
//    CentrifugeServer.server.listen.apply(CentrifugeServer.server, arguments);
//}
//
//CentrifugeServer.close = function(callback){
//    CentrifugeServer.server.close(callback);
//}


module.exports = CentrifugeServer;


// anonymous export
// the below won't export anything if invoked with CentrifugeServer.commence();
// if invoked by new CentrifugeServer() it returns this [ 'length', 'name', 'arguments', 'caller', 'prototype' ]
// ^ none of the defined methods are passed

