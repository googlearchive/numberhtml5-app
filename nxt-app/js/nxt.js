/**
Copyright 2012 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Renato Mangini (mangini@chromium.org)
**/

const SENSOR_REFRESH_INTERVAL=200;

(function() {
  
  var btnConnectNXT=document.querySelector(".connectnxt");
  var btnClose=document.querySelector(".closenxt");
  var btnStop=document.querySelector(".stop");
  var btnForward=document.querySelector(".forward");
  var logArea=document.querySelector(".log");
  var statusLine=document.querySelector("#status");
  
  var logObj=function(obj) {
    console.log(obj);
  }
  var logSuccess=function(msg) {
    log("<span style='color: green;'>"+msg+"</span>");
  };
  var logError=function(msg) {
    statusLine.className="error";
    statusLine.textContent=msg;
    log("<span style='color: red;'>"+msg+"</span>");
  }

  var log=function(msg) {
    console.log(msg);
    logArea.innerHTML=msg+"<br/>"+logArea.innerHTML;
  }
  
  
  var init=function() {
    if (typeof(serial_lib) === 'undefined') throw "You must include serial.js before";

    flipState(true);
    btnConnectNXT.addEventListener("click", openSerial);
    btnClose.addEventListener("click", closeSerial);
    btnForward.addEventListener("click", forward);
    btnStop.addEventListener("click", stop);
    
    addEventToElements('click', "input[type='radio'][name='sensor1']", function() {
      var portType=parseInt(document.querySelector('input[type="radio"][name="sensor1"][checked="true"]').value);
      var portMode=getBestMode(portType);
      setInputPort(0, portType, portMode);
    });

    document.querySelector(".read1").addEventListener("click", function() { 
      readSensor(0);
    });
    initNXTListeners();
  }

  var getBestMode=function(portType) {
    switch (portType) {
    case 1: return 0x20;  // switch: boolean
    case 2: return 0xC0;  // temperature: fahrenheit
    case 3: return 0x00;  // reflection: raw mode
    case 4: return 0xE0;  // angle: angle steps
    case 5: return 0x80;  // light_active: percent of full scale
    case 6: return 0x80;  // light_inactive: percent of full scale
    case 7: return 0x80;  // sound dB: percent of full scale
    case 8: return 0x80;  // sound dBAudible: percent of full scale
    default: return 0x00; // raw mode
    }
  }

  var addEventToElements=function(eventType, selector, listener) {
    var elems=document.querySelectorAll(selector);
    
    for (var i=0; i<elems.length; i++) {
      (function() {
        var c=i;
        elems[i].addEventListener(eventType, function(e) {
          listener.apply(this, [e, c]);
        });
      })();
    }
  };


  var initNXTListeners=function() {
  }
  
  var setMotorSpeed=function(motor, speed) {
    var cmd=[0x0c, 0x00, 0x80, 0x04, motor, speed, 0x07, 0x01, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00];
    log("writing "+cmd);
    writeSerial(cmd);
  }

  var forward=function() {
    setMotorSpeed(0, 100);
    setMotorSpeed(1, 100);
  }

  var stop=function() {
    setMotorSpeed(0, 0);
    setMotorSpeed(1, 0);
  }

  var setInputPort=function(port, inputType, inputMode) {
    serial_lib.flush(function(){
      var cmd=[0x05, 0x00, 0x00, 0x05, port, inputType, inputMode];
      log("writing "+cmd);
      writeSerial(cmd);
    });
  }

  var readSensor=function(port) {
    var cmd=[0x03, 0x00, 0x00, 0x07, port];
    log("writing "+cmd);
    writeSerial(cmd);
  }

  var flipState=function(deviceLocated) {
    btnConnectNXT.disabled=!deviceLocated;
    btnClose.disabled=deviceLocated;
  }
  
  var serialPort='/dev/tty.bluetooth-Jamie';
  var openSerial=function() {
    if (!serialPort) {
      logError("Invalid serialPort");
      return;
    }
    flipState(true);
    log("Connecting to "+serialPort);
    serial_lib.openSerial(serialPort, onOpen);
  }
  
  var onOpen=function(cInfo) {
    logSuccess("Device found (connectionId="+cInfo.connectionId+")");
    flipState(false);
    statusLine.textContent="Connected";
    log("started listener");
    serial_lib.startListening(function(data) {
      log("reading "+data);
    });
  }
  
  var writeSerial=function(bytes) {
    if (!serial_lib.isConnected()) {
      logError("Not connected");
      return;
    }
    if (!bytes || bytes.length==0) {
      logError("Nothing to write");
      return;
    }
    serial_lib.writeBytesSerial(bytes); 
  }
  
  var onRead=function(readData) {
    log("read: "+readData);
  }
  
  var closeSerial=function() {
   serial_lib.closeSerial(onClose);
  }
  
  var onClose = function(result) {
   flipState(true);
  }
  
  
  init();
})();

