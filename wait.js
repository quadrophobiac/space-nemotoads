/**
 * Created by stephenfortune on 13/02/2016.
 */
var five = require("johnny-five");
var board = new five.Board({repl: false});

board.on("ready", function() {
    // Create an Led on pin 13

    //this.led = new five.Led(13);
    var state = 0;
    this.pinMode(13, this.MODES.OUTPUT);

    this.loop(5000, function(){
        this.wait(1000, function() {
            // Turn it off...
            this.digitalWrite(13, (state ^= 1));
            console.log(state);
        });
    });

    //this.wait(1000, function() {
    //    // Turn it off...
    //    //this.digitalWrite(13, (state ^= 1));
    //    console.log(state);
    //});
});