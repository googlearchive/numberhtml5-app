function RobotInterface() {
  this.callbacks = {}

  this._startPollingSensors();
}

RobotInterface.prototype.addSensorListener = function(sensor, callback) {
  this.callbacks[sensor] = callback;
};

RobotInterface.prototype.servoAngle = function(outputs, power, angle) {
  // TODO: implement me.
};

RobotInterface.prototype.servoOn = function(outputs, power, direction) {
  // TODO: implement me.
};

RobotInterface.prototype.servoOff = function(outputs) {
  // TODO: implement me.
};


/****** PRIVATE ******/
RobotInterface.prototype._startPollingSensors = function() {
  // Iterate through all sensor data, firing callbacks if they exist.
};
