(function(exports) {

function AngleChart(options) {
  this.angle = 0;
  this._init();
}

AngleChart.prototype.setAngle = function(angle) {
  this.angle = angle;
  var transform = function(d) { return "rotate(" + angle + ")"; };
  this.sun.transition()
    .duration(500)
    .attr("transform", transform)
};

AngleChart.prototype._init = function() {
  // Draw a circle.
  // Draw an arrow pointing in the current direction.
  // Keep a handle to the arrow object because we're going to be moving it
  // around.
  var w = 300,
    h = 300,
    r = 80,
    x = Math.sin(2 * Math.PI / 3),
    y = Math.cos(2 * Math.PI / 3),
    speed = 4,
    start = Date.now();

var svg = d3.select("body").insert("svg:svg", "form")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(.9)")
  .append("svg:g")
    .data([{radius: r * 5}]);

var sun = svg.append("svg:g")
    .attr("class", "sun")
    .data([{teeth: 16, radius: r}])
  .append("svg:g")
    .attr("class", "gear");

sun.append("svg:path")
    .attr("d", gear);

sun.append('svg:rect')
    .attr('x', -10)
    .attr('y', -10)
    .attr('width', 20).attr('height', 120);

this.sun = sun;

function gear(d) {
  var n = d.teeth,
      r2 = Math.abs(d.radius),
      r0 = r2 - 8,
      r1 = r2 + 8,
      r3 = d.ring ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
      da = Math.PI / n,
      a0 = -Math.PI / 2 + (d.ring ? Math.PI / n : 0),
      i = -1,
      path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
  while (++i < n) path.push(
      "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
      "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
      "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
      "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
      "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
      "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
  path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
  return path.join("");
}
};

exports.AngleChart = AngleChart;
})(window);
