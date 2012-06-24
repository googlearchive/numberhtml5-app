var Controller = function(options) {

  var frameID;
  var pad;
  var lastV=0;
  var lastH=0;
  var lastA=0;
  var self = this;

  options.OnVertical = options.OnVertical || function(e) { console.log("Vertical:" + e);};
  options.OnHorizontal = options.OnHorizontal || function(e) {console.log("Horizontal:" + e);};
  options.OnArm = options.OnArm || function(e) {console.log("Arm:" + e)};
  options.OnDeviceFound = options.OnDeviceFound || function(e) { console.log("Found device: " + e); }; 
  options.OnDeviceLost = options.OnDeviceLost || function(e) {console.log("Lost Gamepad"); };

  var deviceSnooper = function() {
    if(!!pad == false) {
      console.log("Looking for device");
      pad = window.navigator.webkitGamepads[0];
      if(pad) {
        console.log("Found device", pad);
        options.OnDeviceFound(pad);
        frameID = window.webkitRequestAnimationFrame(update);
      }
      setTimeout(deviceSnooper, 500);
    }
  }

  var update = function() {
    // Read the state
    pad = window.navigator.webkitGamepads[0];
    if(!!pad == false) {
      //Lost pad
      options.OnDeviceLost();
      deviceSnooper();      
      return;
    }
    var stick1 = [pad.axes[0], pad.axes[1]];
    var stick2 = pad.axes[3];

    var vertical = -Math.floor(stick1[1] * 100);
    var horizontal = Math.floor(stick1[0] * 100);
    var arm = Math.floor(stick2 * 100);

    // lock to steps of 5
    vertical = vertical - (vertical %5);
    horizontal = horizontal - (horizontal %5);
    arm = arm - (arm %5);

    if(vertical < 10 && vertical > -10) vertical = 0;
    if(horizontal < 10 && horizontal > -10) horizontal = 0;
    if(arm < 10 && arm > -10) arm = 0;

    if(Math.abs(lastV - vertical) >10) {
      options.OnVertical(vertical);
      lastV = vertical;
    }

    if(Math.abs(lastH - horizontal) >10) {
      options.OnHorizontal(horizontal);
      lastH = horizontal;
    }

    if(Math.abs(lastA - arm) >10) {
      options.OnArm(arm);
      lastA = arm;
    }

    frameID = window.webkitRequestAnimationFrame(update);
  };

  this.update = update;

  var connected = function(padEvent) {
    console.log("Pad conntected", padEvent);
    pad = padEvent.target;
    frameID = window.requestAnimationFrame(update);
  };

  var disconnected = function() {
    console.log("Pad disconntected", padEvent);
    if(frameID) {
      window.webkitCancelAnimationFrame(frameID);
    }
  };

  if(window.onwebkitgamepadconnceted) { 
    window.addEventListener("webkitgamepadconnected", connected, false);
    window.addEventListener("webkitgamepaddisconnected", disconnected, false);
  }
  else {
    

    deviceSnooper();
  }
};
