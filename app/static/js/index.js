window.addEventListener("load", function() {
  var panel = document.getElementById("panel");
  var _x=0;
  var _y=0;
  var _arm=0;

  var controller = new Controller();  
  controller.OnVertical = function(x) {
    _x = x;
    panel.style.webkitTransform = "rotate3d(1, 0, 0, " + _x/10 + "deg) rotate3d(0, 1, 0, " + _y/10 + "deg)";
    robot.move(_x, _y); 
  };

  controller.OnHorizontal = function(y) {
    _y = y;
    panel.style.webkitTransform = "rotate3d(1, 0, 0, " + _x/10 + "deg) rotate3d(0, 1, 0, " + _y/10 + "deg)";
    robot.move(_x, _y); 
  };

  controller.OnArm = function(arm) {
    robot.moveArm(arm);
  };
}, false);
