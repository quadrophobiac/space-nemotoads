// via https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/

var fs = require('fs');

var express = require('express');
var router = express.Router();
var five = require("johnny-five");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var lineCount;

var planets = fs.readFileSync(__dirname+"/fixtures/earthSized.json",'utf8');
var data = JSON.parse(planets);
var top3 = data.sort(function(a, b) { return a.pl_bmasse < b.pl_bmasse ? 1 : -1; }).slice(0, 3);
console.log(Object.getOwnPropertyNames(top3));
console.log(top3);

//Arduino board connection
var led;
var motor1;
var motor2;
var motor3;

var board = new five.Board();
board.on("ready", function() {

    // creates the objects and then doesn't worry about them henceforth

    console.log('Arduino connected');
    led = new five.Led(13);
    led.off();

    motor1 = new five.Motor({
        id: "motor1",
        pins: {
            pwm: 3,
            dir: 4
        }
    });
    motor2 = new five.Motor({
        id: "motor2",
        pins: {
            pwm: 5,
            dir: 7
        }
    });
    motor3 = new five.Motor({
        id: "motor3",
        pins: {
            pwm: 9,
            dir: 8
        }
    });

    console.log(Object.getOwnPropertyNames(motor3));

    var motorReporter = function(err, stamp){
        console.log("logging callback func");
        if(!this.isOn){
            console.log("someone has halted motor");
        } else {
            console.log(this.id+", running = "+this.isOn+", current speed = "+this.currentSpeed);
        }
    }

    motor1.forward(128);
    motor2.forward(230);
    motor3.forward(75);

    //motor1.on("forward", function(err, timestamp) {
    //    // demonstrate braking after 5 seconds
    //    console.log(Object.getOwnPropertyNames(motor1));
    //    console.log("motor evident: "+motor1.isOn+" and has RPM "+motor1.currentSpeed);
    //    console.log("motor running "+timestamp);
    //});

    motor1.on("stop", motorReporter);
    motor2.on("stop", motorReporter);
    motor3.on("stop", motorReporter);
    motor1.on("forward", motorReporter);
    motor2.on("forward", motorReporter);
    motor3.on("forward", motorReporter);



});

board.on("message", function(event) {
    /*
     Event {
     type: "info"|"warn"|"fail",
     timestamp: Time of event in milliseconds,
     class: name of relevant component class,
     message: message [+ ...detail]
     }
     */

    console.log("Received a %s message, from %s, reporting: %s", event.type, event.class, event.message);
});


router.get('/',function(req,res){
    res.json({"error" : false, "message" : "Hello !"});
    motor1.forward(128);
    led.off();
});

router.post('/add',function(req,res){

    res.json({"error" : false, "message" : "success", "data" : req.body.num1 + req.body.num2});
    led.on();
    motor1.stop();

});


app.use('/',router);

app.listen(3000,function(){
    console.log("I am listening at PORT 3000");
})