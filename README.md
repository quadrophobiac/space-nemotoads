the repo for the pi and api project

### Using Johnny-Five for node to arduino communication

*requires*

Arduino Uno board
node installed #TODO = instructions for andy

* Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
`node arduino_master.js`

Stepper Motor Code

establish the 3 steppers and their pins,
set them going in one direction (i prefer clockwise)
and vary the speed they rotate at.

all the raspberry will need to do is update the variable that dictates speed.
once every X minutes the rotation will stop for X minutes and then restart.