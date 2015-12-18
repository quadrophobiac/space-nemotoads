// via https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/

var express = require('express');
var router = express.Router();
var app = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var io=require('socket.io')(httpServer);

//Arduino board connection

var board = new five.Board();
board.on("ready", function() {
    console.log('Arduino connected');
    led = new five.Led(13);
    led.off();
});

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var router = express.Router();

router.get('/',function(req,res){
    res.json({"error" : false, "message" : "Hello !"});
    led.off();
});

router.post('/add',function(req,res){

    res.json({"error" : false, "message" : "success", "data" : req.body.num1 + req.body.num2});
    led.on();
});

app.use('/',router);

app.listen(3000,function(){
    console.log("I am listening at PORT 3000");
})