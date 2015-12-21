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
var stepper1;
var stepper2;
var motor1;

var board = new five.Board();
board.on("ready", function() {

    // creates the objects and then doesn't worry about them henceforth

    console.log('Arduino connected');
    led = new five.Led(13);
    led.off();
    stepper1 = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 200,
        pins: {
            step: 11,
            dir: 12
        }
    });
    stepper2 = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 200,
        pins: {
            step: 9,
            dir: 10
        }
    });
    motor1 = new five.Motor({
        pins: {
            pwm: 3,
            dir: 4
        }
    });

    console.log(Object.getOwnPropertyNames(motor1));
    console.log(Object.getOwnPropertyNames(stepper1));

    //stepper1.rpm(180).ccw().step(2000, function() {
    //    console.log("done");
    //});
    //motor1.start(255);
    motor1.forward(128);

    motor1.on("forward", function(err, timestamp) {
        // demonstrate braking after 5 seconds
        //console.log(Object.getOwnPropertyNames(motor1));
        console.log("motor evident: "+motor1.isOn+" and has RPM "+motor1.currentSpeed);
        console.log("motor running "+timestamp);
    });
    motor1.on("stop", function(){
        console.log("someone has halted motor");
    });

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
    led.off();
});

router.post('/add',function(req,res){

    res.json({"error" : false, "message" : "success", "data" : req.body.num1 + req.body.num2});
    led.on();
    motor1.stop();
    stepper1.step({ steps: 2000, direction: 1, accel: 1600, decel: 1600 }, function() {
        console.log("Done stepping!");
    });
});


app.use('/',router);

app.listen(3000,function(){
    console.log("I am listening at PORT 3000");
})