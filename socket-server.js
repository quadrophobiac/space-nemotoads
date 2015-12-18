var express = require('express');
var router = express.Router();
var app = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var io=require('socket.io')(httpServer);

var port = 3000;

//app.use(express.static(__dirname + '/public'));
var led;

app.get('/', function(req, res) {
    led.on();
    res.send({
        name:"Alex",
        city:"London",
        age:25
    });
});

//app.post('/add',function(req,res){
//    console.log(Object.getOwnPropertyNames(req));
//    console.log(req.params);
//    console.log(req.query);
//    //res.json({"error" : false, "message" : "success", "data" : req.body.num1 + req.body.num2});
//    res.end();
//});
app.use('/',router);
router.post('/add',function(req,res){
    res.json({"error" : false, "message" : "success", "data" : req.body.num1 + req.body.num2});
});

httpServer.listen(port);
console.log('Server available at http://localhost:' + port);


//Arduino board connection

var board = new five.Board();
board.on("ready", function() {
    console.log('Arduino connected');
    led = new five.Led(13);
    led.off();
});

//Socket connection handler
io.on('connection', function (socket) {
    console.log(socket.id);

    socket.on('led:on', function (data) {
        led.on();
        console.log('LED ON RECEIVED');
    });

    socket.on('led:off', function (data) {
        led.off();
        console.log('LED OFF RECEIVED');

    });
});

console.log('Waiting for connection');