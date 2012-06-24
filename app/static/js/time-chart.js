(function(exports) {
var N = 40;


function TimeChart(options) {
  // Required:
  this.range = options.range;

  // Optional:
  this.interpolation = options.interpolation || 'linear';
  this.random = options.random || d3.random.normal;
  this.bufferSize = options.bufferSize || N;
  this.title = options.title;

  this._init();
}

TimeChart.prototype.addValue = function(value) {
  this.data.push(value);

  this.path
      .attr("d", this.line)
      .attr("transform", null)
    .transition()
      .ease("linear")
      .attr("transform", "translate(" + this.x(-1) + ")")

  this.data.shift();
};

TimeChart.prototype._draw = function() {
};

TimeChart.prototype._init = function() {
  this.domain = [0, this.bufferSize - 1];
  this.data = d3.range(this.bufferSize).map(function() { return 0; });

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

  var svg = d3.select("#container").append("p").append("svg")
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

  var title = svg.append('text')
      .attr("class", "text")
      .attr('y', 10)
      .attr('x', 10)
      .text(this.title);

  this.path = path;
  this.line = line;
  this.x = x;
};

exports.TimeChart = TimeChart;
})(window);
