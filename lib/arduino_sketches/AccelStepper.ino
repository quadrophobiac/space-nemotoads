#include <AccelStepper.h>

AccelStepper stepper(1, 9, 8); // Defaults to AccelStepper::FULL4WIRE (4 pins) on 2, 3, 4, 5


void setup()
{

   pinMode(8, OUTPUT);       //direction
   digitalWrite(8, HIGH);
   pinMode(9, OUTPUT);
   digitalWrite(9, HIGH);

   stepper.setMaxSpeed(2000);
   stepper.setAcceleration(400);
   //stepper.setSpeed(1000);

   stepper.moveTo(55000);
}

void loop()
{  
  digitalWrite(8, HIGH);
   stepper.run();
}
