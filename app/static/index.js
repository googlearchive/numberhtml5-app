window.addEventListener("load", function() {
  var panel = document.getElementById("panel");
  var _x=0;
  var _y=0;
  
  var controller = new Controller();  
  controller.OnVertical = function(x) {
    _x = x/5;
    panel.style.webkitTransform = "rotate3d(1, 0, 0, " + _x + "deg) rotate3d(0, 1, 0, " + _y + "deg)";
  };

  controller.OnHorizontal = function(y) {
    _y = y/5;
    panel.style.webkitTransform = "rotate3d(1, 0, 0, " + _x + "deg) rotate3d(0, 1, 0, " + _y + "deg)";
  };  
}, false);
