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
# changes default browser if needed
echo $DESKTOP_SESSION
if gnome = update-alternatives --config gnome-www-browser 
else - check here https://wiki.debian.org/HOWTO/DefaultWebBrowser
```

## getting node onto a pi

thorough instructions via http://andyfelong.com/2015/11/node-js-v4-1-0-on-raspberry-pi-2/  

### Step - 1 GCC 4.8 on Raspberry Pi Wheezy

```bash
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

```bash
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
# FINAL STEP - install. in an ideal world you wouldn't have to use sudo to install node but the wheezy distro is a PITA  
we want to avoid using sudo because when you install global packages you have to use `sudo npm i -g $package` rather  
than `npm -g i $package`. However you might get away with sudo
make install OR sudo make install
# the above should not be done as sudo, at all costs
curl -L https://www.npmjs.com/install.sh | sh
```

### Step 2.5 non sudo node
workarounds below - 
https://gist.github.com/isaacs/579814  
https://github.com/npm/npm/wiki/Troubleshooting#no-compatible-version-found  
http://ask.xmodulo.com/install-node-js-linux.html  
http://unix.stackexchange.com/questions/207591/how-to-install-latest-nodejs-on-debian-jessie  
https://github.com/glenpike/npm-g_nosudo  
```
```

### Step 3 Upgrade npm
```bash
# sanity check versions
node -v
should reply v4.1.0 (or whatever version you compiled)
npm -v
should reply 2.14.3 (or later)
npm install -g npm
```

### Step 4 global node installs
```bash
npm install -g gulp
npm install -g nodemon
npm install -g browserify
```

### Using Johnny-Five for node to Arduino communication

*requires*

Arduino Uno board with Firmata(prebundled) and/or [ConfigurableFirmata](https://github.com/firmata/ConfigurableFirmata
node installed

Node - Mac Installation Instructions
```bash
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

### Display

TODO - alt table presentation http://stackoverflow.com/questions/6368061/most-common-way-of-writing-a-html-table-with-vertical-headers

________________________________

### Automation

Initially it was hoped to use gulp as an end to end solution for running this project. However current limitation in
gulp-nodemon respective to instances of that process being unable to manage two separate server files has rendered this 
option unsuitable for the time being.

[https://github.com/remy/nodemon/issues/286](it's a known issue that gulp-nodemon currently can't handle two servers)

alternatives for server mgmt were tried
[https://github.com/leny/gulp-supervisor](this is no longer maintained and it does not respond consistently to current 
 gulp workflow) supervisor is a gulp version of (https://github.com/petruisfan/node-supervisor)[node supervisor]

the general urge for non gulp watch processes is evidenced (https://www.reddit.com/r/node/comments/2ypa2l/ditch_nodemon_and_use_gulp_to_watch_your_files/)[here]

Another attempted workaround consisted of employing gulp ready server plug ins for gulp. The following listed solutions were 
not suitable to the task as the manner in which the required the arduino module provided unclear/insufficient access to the servers
shutdown method. This method was a required feature to ensure that the servo motors always completed their cycle before connections to the arduino were terminated
 - if connection to the arduino is terminated the motors halt immediately which can be a problem if they were spinning at a 
 high RPM.
 
* https://www.npmjs.com/package/gulp-live-server
* https://www.npmjs.com/package/gulp-connect
* https://www.npmjs.com/package/gulp-express

with more time it would be possible to investigate the manner in which gulp closes servers in each of the above libraries
and potentially could be combined with express middleware that always gracefully exits such as
* https://www.npmjs.com/package/amazing-grace
* https://www.npmjs.com/package/grace
* https://www.npmjs.com/package/express-graceful-exit

TODO investigate alongside explanations for how express handles sigterm and exit events http://stackoverflow.com/questions/20820884/execute-code-on-nodejs-server-shutdown-with-express  

Other alternatives such as commencing the arduino server with express friendly node process managers were looked into
ultimately they were decided against because of the inability to specify a wait period when a server restarts
* node forever currently doesn't support minUpTime as expected = (known issue)[https://github.com/foreverjs/forever/issues/751]
* (node pm2)[https://www.npmjs.com/package/pm2] doesn't support a feature where servers can be started in non daemon mode. This is an especially
desirable feature in the arduino server because johnny-five automatically logs relevant information to terminal

above could be remedied by availing of extensive logging (as recommended by the packages) however for purposes of gallery install
it would be preferable for logs to display to STDOUT in a terminal which could be referenced by invigilators

The artwork is running on the distribution image accompanying (Waveshare Raspberry Pi LCD Display Module 5inch 800*480 TFT Resistive Touch Screen Panel HDMI Interface)[http://www.amazon.com/Waveshare-Raspberry-Resistive-Interface-Rapsberry-pi/dp/B00TIA0PMQ]
this is a wheezy distro of linux and consensus online seems to be that getting the supplied drivers to work with a bespoke distro 
can prove to be a complete headache.

the shipped distro boots into a LXDE environment. Therefore to automate this repos code the following steps must be taken

(this)[http://www.raspberrypi-spy.co.uk/2014/05/how-to-autostart-apps-in-rasbian-lxde-desktop/] is a great resource and explains all
you need to know

from `/home/pi` run `sudo nano /etc/xdg/lxsession/LXDE-pi/autostart`  
from here you can edit a sequence of commands to execute on launch of LXDE env

the working configuration for this project is as follows:


```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@/usr/local/bin/node /home/pi/programming/space-nemotoads/arduino_server.js
@/usr/local/bin/node  /home/pi/programming/space-nemotoads/
@/usr/bin/chromium --kiosk --noerrordialogs http://localhost:5000/
@lxterminal
```

the third step in this sequence uses node to boot the package.json preinstall and start scripts
the chromium process is passed a selection of command prompts from this useful & well maintained (list)[http://peter.sh/experiments/chromium-command-line-switches/]

an alternative (if for some reason node cannot execute the package.json files scripts, 
which is highly probably given how node determines its current working directory) is the following

```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@lxterminal
@/usr/local/bin/node /home/pi/programming/space-nemotoads/arduino_server.js
@/bin/bash /home/pi/startservers.sh
@/usr/bin/chromium --kiosk --noerrordialogs
```

TODO - http://stackoverflow.com/questions/8553957/how-to-release-localhost-from-error-listen-eaddrinuse I predict this would
be essential error checking for purposes of gallery
________________________________

###Debugging

#### Node

Node can be a pain in the ass if you make one wrong step. Only install with -g if all else fails

some files HAVE to be installed globally, and to track them use `npm list -g -p -depth=1`

What is of utmost preference is to install node without sudo dependency. The following three links detail ways of doing so
* https://gist.github.com/maxogden/4322201
* https://gist.github.com/isaacs/579814
* https://github.com/npm/npm/wiki/Troubleshooting#no-compatible-version-found

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

