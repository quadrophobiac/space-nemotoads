/**
 * Created by stephenfortune on 17/12/2015.
 */
var http = require('http');
var five = require("johnny-five");

var board = new five.Board();
var led;

board.on("ready", function() {
    console.log('Arduino connected');
    led = new five.Led(13);
});

var server = module.exports = http.createServer(function (req, res) {

    if (req.headers['content-type'] === 'text/plain') {

        var body = '';
        req.on('data', function (chunk) {
            body += chunk.toString();
        });

        req.on('end', function () {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('correct header');
            server.emit('success', body); // THIS is the thing
        });

    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('wrong header');
    };
});