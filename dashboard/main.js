
/*
var n = 40;

function chart(domain, range, interpolation, tick) {
  var random = randomWalk(range);
  var data = d3.range(n).map(random);

  var margin = {top: 6, right: 0, bottom: 6, left: 40},
      width = 960 - margin.right,
      height = 120 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .domain(domain)
      .range([0, width]);

  var y = d3.scale.linear()
      .domain(range)
      .range([height, 0]);

  var line = d3.svg.line()
      .interpolate(interpolation)
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); });

  var svg = d3.select("body").append("p").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).ticks(5).orient("left"));

  var path = svg.append("g")
      .attr("clip-path", "url(#clip)")
    .append("path")
      .data([data])
      .attr("class", "line")
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr("d", line);

  tick(path, line, data, x);
}

chart([0, n - 1], [0, 180], "linear", function tick(path, line, data, x) {

  // push a new data point onto the back
  data.push(random());

  // redraw the line, and then slide it to the left
  path
      .attr("d", line)
      .attr("transform", null)
    .transition()
      .duration(750)
      .ease("linear")
      .attr("transform", "translate(" + x(-1) + ")")
      .each("end", function() { tick(path, line, data, x); });

  // pop the old data point off the front
  data.shift();

});
*/

var soundChart = new TimeChart({range: [0, 180]});
var lightChart = new TimeChart({range: [0, 1]});
var proximityChart = new TimeChart({range: [0, 255]});

//var servo1Chart = new GearChart();

var robot = new RobotMock();

robot.addSensorListener('sound', function(data) {
  soundChart.addValue(data.value);
});

robot.addSensorListener('light', function(data) {
  lightChart.addValue(data.value);
});

robot.addSensorListener('proximity', function(data) {
  proximityChart.addValue(data.value);
});
