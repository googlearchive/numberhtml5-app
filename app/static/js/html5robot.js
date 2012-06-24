function HTML5Robot() {
  this.robot = Robot; 
  this.callbacks = {}
  this._startPollingSensors();
}

HTML5Robot.prototype.connect = function(device, success) {
  success = success || function() {};
  this.robot.connect(device, success);
};

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
  this.robot.onSensor("sound", function(port, data) {
    this._emitSensorData('sound', {value: data});
  });

  this.robot.onSensor("light", function(port, data) {
    this._emitSensorData('light', {value: data});
  });
  
  this.robot.onSensor("proximity", function(port, data) {
    this._emitSensorData('proximity', {value: data});
  });

  this.robot.onSensor("servo", function(port, angle, speed) {
    this._emitSensorData('servo' + (port + 1), {value: data});
  });
};

HTML5Robot.prototype._emitSensorData = function(sensor, data) {
  if (this.callbacks[sensor]) {
    this.callbacks[sensor](data);
  }
};
