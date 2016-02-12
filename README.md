the repo for the pi and api project

## establishing Pi

###SSH GOTCHA

the first time you SSH the key is stored for that IP address in ~/.ssh/known_hosts
that file might have to be managed (ie entries deleted) to ensure that SSH can still happen

### browser configuration
```
sudo apt-get dist-upgrade
sudo reboot
sudo apt-get update
sudo apt-get install -t wheezy $BROWSER_OF_CHOICE
```

## getting node onto a pi

thorough instructions via http://andyfelong.com/2015/11/node-js-v4-1-0-on-raspberry-pi-2/  

### Step - 1 GCC 4.8 on Raspberry Pi Wheezy

```
sudo nano /etc/apt/sources.list
#Change content to
deb http://mirrordirector.raspbian.org/raspbian/ wheezy main contrib non-free rpi
deb http://archive.raspbian.org/raspbian wheezy main contrib non-free rpi
# Source repository to add
deb-src http://archive.raspbian.org/raspbian wheezy main contrib non-free rpi
deb http://mirrordirector.raspbian.org/raspbian/ jessie main contrib non-free rpi
deb http://archive.raspbian.org/raspbian jessie main contrib non-free rpi
# Source repository to add
deb-src http://archive.raspbian.org/raspbian jessie main contrib non-free rpi
#Add preferences file
sudo nano /etc/apt/preferences
#and insert
    Package: *
    Pin: release n=wheezy
    Pin-Priority: 900
    Package: *
    Pin: release n=jessie
    Pin-Priority: 300
    Package: *
    Pin: release o=Raspbian
    Pin-Priority: -10
#update package list
sudo apt-get update
#Install gcc/g++ 4.8 from jessie repositories
sudo apt-get install -t jessie gcc-4.8 g++-4.8
#To remove gcc/g++ alternative configuration (if there is any, there is none by default)
sudo update-alternatives --remove-all gcc
sudo update-alternatives --remove-all g++
#Install alternatives
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 20
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 50
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.6 20
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 50
#Now 4.8 is your default compiler. You can verify it by
sudo gcc --version
#If you want to change it, you can
sudo update-alternatives --config gcc
sudo update-alternatives --config g++
```

### Step 2 Build latest version of Node.js

```
Go to Nodejs.org and copy the source code download url. In my example: node-v4.1.0.tar.gz
#More current version (as of 8 November 2015) URLs:
https://nodejs.org/dist/v4.2.2/node-v4.2.2.tar.gz
https://nodejs.org/dist/v5.0.0/node-v5.0.0.tar.gz
#Run the following commands in a terminal.  Replace the URL and “node.xxx” depending on the version you are compiling.  As mentioned in a comment, you can use “make -j 4” if you have the R-Pi 2.
wget https://nodejs.org/dist/v4.1.0/node-v4.1.0.tar.gz
tar -xzf node-v4.1.0.tar.gz
cd node-v4.1.0
./configure
make -j 4 
# do the above quicker by maxisiming cores on pi
make install
# the above should not be done as sudo, at all costs
```

### Step 2.5 non sudo node
workarounds below - 
https://gist.github.com/isaacs/579814
https://github.com/npm/npm/wiki/Troubleshooting#no-compatible-version-found
```
```

### Step 3 Upgrade npm
```
sanity check versions
node -v
should reply v4.1.0 (or whatever version you compiled)
npm -v
should reply 2.14.3 (or later)
npm install -g npm
```

### Step 4 global node installs
```
npm install -g gulp
npm install -g nodemon
npm install -g browserify
```

### Using Johnny-Five for node to Arduino communication

*requires*

Arduino Uno board with Firmata(prebundled) and/or [ConfigurableFirmata](https://github.com/firmata/ConfigurableFirmata
node installed

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
# this puts /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin at the beginning of your path - needed
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
```

### Additional Install Instructions

this repo has made changes to the johnny-five code lib/stepper.js  
package.json handles this via a preinstall script  

### Arduino Johnny Five Set Up
`Upload File > Examples > Firmata > Standard Firmata to the Arduino Board for motor`
Upload Configurable Firmata for Stepper - instructions [here](https://github.com/firmata/ConfigurableFirmata)
~~Copy the AdvancedFirmata libray from space_nemotoads/lib/AdvancedFirmata into your Mac's Arduino Folder (usually under Documents)~~
~~* Open the Arduino IDE, select: File > Examples > Firmata > AdvancedFirmata (should be at the bottom near the 'custom libraries heading'~~
~~Upload the sketch to arduino~~

`From within spacenemotoads run`
`node arduino_master.js repl`
`# this will open an interactive terminal interface to the arduino controlled by Johnny-Five`
`# from there you can play around with the methods made available in the examples here`
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

###nuclear for Mac - untested
brew cleanup
brew link node
brew uninstall node
brew install node

credit to http://stackoverflow.com/questions/12594541/npm-global-install-cannot-find-module
________________________________

Screen

Instructions for screen do not work
potential solution may reside here http://futurice.com/blog/id-like-to-have-some-lcd-on-my-pi
or here
https://github.com/swkim01/waveshare-dtoverlays
or maybe here http://www.waveshare.com/wiki/5inch_HDMI_LCD

or maybe not at all because this is the 5 inch model and everything is terrible
________________________________

Stepper Motor PseduoCode

Motors are being driven with https://github.com/sparkfun/Big_Easy_Driver/tree/Hw-v1.6_Fw-v1.0

establish the 3 steppers and their pins,
set them going in one direction (i prefer clockwise)
and vary the speed they rotate at.

all the raspberry will need to do is update the variable that dictates speed.
once every X minutes the rotation will stop for X minutes and then restart.

___

package versions for freezing on merge for node-2-arduino branch

{
    "body-parser": "^1.14.2",
    "chai": "^3.4.1",
    "chai-http": "^1.0.0",
    "csv-string": "^2.3.0",
    "express": "^4.13.3",
    "johnny-five": "0.9.16",
    "json-2-csv": "^2.0.10",
    "mocha": "^2.3.4",
    "request": "^2.67.0",
    "restler": "^3.4.0",
    "sinon": "^1.17.2",
    "supertest": "^1.1.0"
  }
  package versions for freezing on merge for pi-client-server-gulp branch
  "devDependencies": {
      "backbone": "^1.2.3",
      "browser-sync": "^1.3.3",
      "chai": "^3.4.1",
      "csv-string": "^2.3.0",
      "express": "^4.13.3",
      "gulp": "^3.8.7",
      "gulp-nodemon": "^1.0.4",
      "httpdispatcher": "^0.4.0",
      "jquery": "^2.2.0",
      "json-2-csv": "^2.0.10",
      "mocha": "^2.3.4",
      "request": "^2.67.0",
      "restler": "^3.4.0",
      "sinon": "^1.17.2",
      "supertest": "^1.1.0",
      "vinyl-source-stream": "^1.1.0",
      "winston": "^2.1.1"
    }