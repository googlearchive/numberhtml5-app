(function(exports) {

function GearChart(options) {
  this._init();
}

GearChart.prototype.setValue = function(value) {
};

GearChart.prototype._init = function() {
  // Draw a circle.
  // Draw an arrow pointing in the current direction.
  // Keep a handle to the arrow object because we're going to be moving it
  // around.
  var margin = {top: 6, right: 0, bottom: 6, left: 40},
      width = 960 - margin.right,
      height = 120 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .domain(this.domain)
      .range([0, width]);

  var y = d3.scale.linear()
      .domain(this.range)
      .range([height, 0]);

  var line = d3.svg.line()
      .interpolate(this.interpolation)
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
      .data([this.data])
      .attr("class", "line")
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr("d", line);

  this.path = path;
  this.line = line;
  this.x = x;
};

exports.GearChart = GearChart;
})(window);
