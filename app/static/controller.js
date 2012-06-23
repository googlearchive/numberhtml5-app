var Controller = function() {
  var frameID;
  var pad;
  var lastV=0;
  var lastH=0;
  var self = this;

  this.OnVertical = function(e) { console.log("Vertical:" + e);};
  this.OnHorizontal = function(e) {console.log("Horizontal" + e);};
    
  var update = function() {
    // Read the state
    pad = window.navigator.webkitGamepads[0];
    var stick1 = [pad.axes[0], pad.axes[1]];

    var vertical = -Math.floor(stick1[1] * 100);
    var horizontal = Math.floor(stick1[0] * 100);

    // lock to steps of 5
    vertical = vertical - (vertical %5);
    horizontal = horizontal - (horizontal %5);

    if(vertical < 10 && vertical > -10) vertical = 0;
    if(horizontal < 10 && horizontal > -10) horizontal = 0;

    if(Math.abs(lastV - vertical) >10) {
      self.OnVertical(vertical);
      lastV = vertical;
    }

    if(Math.abs(lastH - horizontal) >10) {
      self.OnHorizontal(horizontal);
      lastH = horizontal;
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
    var deviceSnooper = function() {
      if(!!pad == false) {
        console.log("Looking for device");
        pad = window.navigator.webkitGamepads[0];
        if(pad) {
          console.log("Found device", pad);
          frameID = window.webkitRequestAnimationFrame(update);
        }
        setTimeout(deviceSnooper, 500);
      }
    }

    deviceSnooper();
  }
};
