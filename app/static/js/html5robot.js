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
  var r = this.robot;

  setInterval(function() {
    //this._emitSensorData('sound', {value: this._randomBetween(0, 180)});
    //this._emitSensorData('light', {value: this._randomBetween(0, 1)});
    this._emitSensorData('proximity', {value: this._randomBetween(0, 255)});
    //this._emitSensorData('servo1', {value: this._randomBetween(-180, 180)});
    //this._emitSensorData('servo2', {value: this._randomBetween(-180, 180)});
    //this._emitSensorData('servo3', {value: this._randomBetween(-180, 180)});
  }.bind(this), 500);

  r.onSensor("sound", this, function(port, data) {
    this._emitSensorData('sound', {value: data});
  });

  r.onSensor("light", this, function(port, data) {
    this._emitSensorData('light', {value: data});
  });
  
  r.onSensor("proximity", this, function(port, data) {
    this._emitSensorData('proximity', {value: data});
  });

  r.onSensor("servo", this, function(port, angle, speed) {
    this._emitSensorData('servo' + (port + 1), {value: speed});
  });

  r.onSensor("switch", function(port, state) {
    this._emitSensorData("switch", {value: state});
  });
};


HTML5Robot.prototype._randomBetween = function(min, max) {
  var diff = max - min;
  return min + Math.random() * diff;
};

HTML5Robot.prototype._emitSensorData = function(sensor, data) {
  if (this.callbacks[sensor]) {
    this.callbacks[sensor](data);
  }
};
