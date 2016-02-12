#include "PiTalk.h"

int incomingByte = 0;
int charCount = 0;
char command[MAX_COMMAND_LENGTH + 1]; // leave space for \0
bool locked = false;
int led = 13;

void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    incomingByte = Serial.read();

    if ((char)incomingByte == resetByte) {
      locked = false;
      charCount = 0;
      return;
    }

    if (locked) {
      Serial.println("@");
      return;
    }

    if ((char)incomingByte != stopByte) {
      if (charCount > MAX_COMMAND_LENGTH - 1) {
        Serial.println("@");
        locked = true;
        return;
      }
      else {
        command[charCount] = (char)incomingByte;
        charCount++;
      }
    }
    else {
      command[charCount] = '\0';
      charCount = 0;
      if (strcmp(commandLEDOn, command) == 0) {
        digitalWrite(led, HIGH);
        Serial.println(replyOK);
      }
      else if (strcmp(commandLEDOff, command) == 0) {
        digitalWrite(led, LOW);
        Serial.println(replyOK);
      }
    }
  }
}