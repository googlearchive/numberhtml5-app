function HTML5Robot() {
  this.callbacks = {}
  this._startPollingSensors();

  this.robot = new Robot(); 
}

HTML5Robot.prototype.addSensorListener = function(sensor, callback) {
  this.callbacks[sensor] = callback;
  // servos: [
  //   {
  //   position: -180/+180,
  //   speed: 0-255,
  // } ... [3 items]
  // ], // always in the same order
  // light: 0.0 - 1.0,
  // proximity: 0.0 - 255,
  // sound: 0 - 180,
};

HTML5Robot.prototype.move = function(xSpeed, ySpeed) {
  this.robot.setServoSpeed(0, xSpeed);
  this.robot.setServoSpeed(1, ySpeed);
}

HTML5Robot.prototype.moveArm = function(speed) {
  this.robot.setServoSpeed(2, speed);
};

/****** PRIVATE ******/
HTML5Robot.prototype._startPollingSensors = function() {
  // Iterate through all sensor data, firing callbacks if they
  // exist.
  //
  robot.onSensor("sound", function(data, port) {
    this._emitSensorData('sound', {value: data});
  });

  robot.onSensor("light", function(data) {
    this._emitSensorData('light', {value: data});
  });
  
  robot.onSensor("proximity", function(data) {
    this._emitSensorData('proximity', {value: data});
  });

  robot.onSensor("servo", function(angle, speed, port) {
    this._emitSensorData('servo' + (port + 1), {value: data});
  });
};

HTML5Robot.prototype._emitSensorData = function(sensor, data) {
  if (this.callbacks[sensor]) {
    this.callbacks[sensor](data);
  }
};
