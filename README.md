LICENSE
=======

Copyright 2013 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

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
