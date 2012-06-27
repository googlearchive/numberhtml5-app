Lego Mindstorms NXT control from Chrome
=======================================

This sample controls a Lego Mindstorm NXT robot using only Javascript and new launched Chrome packaged apps APIs, like Serial API over Bluetooth and Gamepad.

The UI uses SVG for cool effects when you move the robot.

The NXT port configuration for this robot to work is: 

- Motor left: port A
- Motor right: port B
- Motor for the arm: port C

- Light sensor: port 1
- Sound sensor: port 3
- Touch sensor: port 4

All commands are sent to the NXT through a Serial Port Profile that the device creates over Bluetooth.
