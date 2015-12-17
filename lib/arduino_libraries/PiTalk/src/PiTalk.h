// sourced http://codebrane.com/blog/2014/04/27/designing-a-simple-serial-api-for-the-arduino-and-node-dot-js/

#ifndef PiTalkTypes_h
#define PiTalkTypes_h

#define MAX_COMMAND_LENGTH 255

char* replyOK = {"OK\n"};

char resetByte = '!';
char stopByte = '#';

char* commandLEDOn = {"LEDON"};
char* commandLEDOff = {"LEDOFF"};

#endif