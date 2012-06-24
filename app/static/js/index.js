window.addEventListener("load", function() {
  var panel = document.getElementById("panel");
  var status = document.getElementById("status");
  var robotSelect = document.getElementById("devices");
  var _x=0;
  var _y=0;
  var _arm=0;

  var state = {robot: false, gamepad: false};

  var updateState = function(name, val) {
    state[name] = val;

    if(state["robot"] && state["gamepad"]) {
      status.classList.add("ok");
    }
    else {
      status.classList.remove("ok");    
    }
  };

  robotSelect.addEventListener("change", function() {
    robot.connect(robotSelect.value, function() {
      // Success
      var robotEl = document.querySelector(".robot.status");
      robotEl.classList.add("found");
      updateState("robot", true);
    });
  });

  var params = {};
   
  params.OnVertical = function(x) {
    _x = x;
    panel.style.webkitTransform = "rotate3d(1, 0, 0, " + _x/10 + "deg) rotate3d(0, 1, 0, " + _y/10 + "deg)";
    robot.move(_x, _y); 
  };

  params.OnHorizontal = function(y) {
    _y = y;
    panel.style.webkitTransform = "rotate3d(1, 0, 0, " + _x/10 + "deg) rotate3d(0, 1, 0, " + _y/10 + "deg)";
    robot.move(_x, _y); 
  };

  params.OnArm = function(arm) {
    robot.moveArm(arm);
  };

  params.OnDeviceFound = function(name) {
    var status = document.querySelector(".gamepad.status");
    status.classList.add("found"); 
    updateState("gamepad", true);
  };

  params.OnDeviceLost = function(name) {
    var status = document.querySelector(".gamepad.status");
    status.classList.remove("found"); 
    updateState("gamepad", false);
  }

  var controller = new Controller(params);
  
}, false);
