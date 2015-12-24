the repo for the pi and api project

### establishing Pi

SSH GOTCHA

the first time you SSH the key is stored for that IP address in ~/.ssh/known_hosts
that file might have to be managed (ie entries deleted) to ensure that SSH can still happen

upgrading pi
# http://tech.tiefpunkt.com/2015/06/headless-raspberrypi-installation-with-raspbian-jessie/
   11  sudo raspi-config # expand storage and change password
   12  sudo sed -i 's/wheezy/jessie/g' /etc/apt/sources.list
   13  sudo sed -i 's/wheezy/jessie/g' /etc/apt/sources.list.d/*
   14  sudo apt-get update
   15  sudo apt-get -y dist-upgrade


### getting node onto a pi

### Using Johnny-Five for node to arduino communication

TODO - whatever I did to get npm running on andys pi I need to recuperate as the way I did it on mine fucks everything up

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
Upload File > Examples > Firmata > Standard Firmata to the Arduino Board for motor
Upload Configurable Firmata for Stepper - instructions [here](https://github.com/firmata/ConfigurableFirmata)
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

###Debugging

Node can be a pain in the ass if you make one wrong step. Only install with -g if all else fails

node-pre-gyp is an even bigger PITA. Cross your fingers that its complaining doesn't derail things

sometimes even this won't fix things

`which npm`
`which node`

should return the same directory which is referenced in
`npm list -g --depth=0`

lastly echo $NODE_PATH

chances are its empty. If it's empty and node scripts are failing to access modules installed globally then there is a workaround

open your `~/.bash_profile` script with editor of preference
add `export NODE_PATH=/usr/local/lib/node_modules` on a newline, save and close
Restart the terminal window, manually or with 'source ~/.bash_profile'


`npm -g rm $OFFENDING_MODULE`

other resources
https://gist.github.com/DanHerbert/9520689

#nuclear for Mac - untested
brew cleanup
brew link node
brew uninstall node
brew install node

credit to http://stackoverflow.com/questions/12594541/npm-global-install-cannot-find-module
________________________________

Stepper Motor PseduoCode

Motors are being driven with https://github.com/sparkfun/Big_Easy_Driver/tree/Hw-v1.6_Fw-v1.0

establish the 3 steppers and their pins,
set them going in one direction (i prefer clockwise)
and vary the speed they rotate at.

all the raspberry will need to do is update the variable that dictates speed.
once every X minutes the rotation will stop for X minutes and then restart.