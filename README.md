the repo for the pi and api project

### Using Johnny-Five for node to arduino communication

*requires*

Arduino Uno board
node installed #TODO = instructions for andy

Node - Mac Installation Instructions
```
xcode-select --install
# agree as necessary
sudo gcc --version
# agree as necessary
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# installs homebrew - makes package mgmt easier
brew doctor
echo export PATH='/usr/local/bin:$PATH' >> ~/.bash_profile
source ~/.bash_profile
echo $PATH
# this puts `/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin` at the beginning of your path - needed
brew install node
node -v
npm version
# both of the above should return some version numbers / details if successful
brew install git
which git # check that you have git installed
git clone https://github.com/quadrophobiac/space-nemotoads
ls (you should see new directory space-nemotoads)
cd (into the new directory)
git checkout node-2-arduino
git branch
# you should see Branch node-2-arduino set up to track remote branch node-2-arduino from origin. Switched to a new branch 'node-2-arduino'
npm install
# ^ this installs all the software required (and a bit more besides) to use node to control the arduino
plug in your arduino

Arduino Johnny Five Set Up
Upload File > Examples > Firmata > Standard Firmata to the Arduino Board
~~Copy the AdvancedFirmata libray from space_nemotoads/lib/AdvancedFirmata into your Mac's Arduino Folder (usually under Documents)~~
~~* Open the Arduino IDE, select: File > Examples > Firmata > AdvancedFirmata (should be at the bottom near the 'custom libraries heading'~~
~~Upload the sketch to arduino~~

From within spacenemotoads run
`node arduino_master.js`
# this will open an interactive terminal interface to the arduino controlled by Johnny-Five
# from there you can play around with the methods made available in the examples here
```

### Using the Johnny-Five REPL

REPL is the name for the interactive session that `arduino_master.js` creates

if you run `motor.start();0;` you should see the motor begin to spin and the terminal will print some details

likewise if you run `motor.stop();0;` the motor should halt movement

you can also use the full set of the commands for controlling the motor which are detailed (here)[http://johnny-five.io/api/motor/#api]

putting `;0;` at the end of every command ensures that lots of debugging data isn't printed, so use this feature at your discretion

to exit the REPL typp `CTRL+C` or `CMD+C` twice

________________________________

Stepper Motor PseduoCode

establish the 3 steppers and their pins,
set them going in one direction (i prefer clockwise)
and vary the speed they rotate at.

all the raspberry will need to do is update the variable that dictates speed.
once every X minutes the rotation will stop for X minutes and then restart.