(function(exports) {

  function SwitchChart(options) {
    this.title = options.title;
    this.state = false;
    this.rootElement = this._init();
    
  }

  SwitchChart.prototype.setState = function(state) {
    this.state = state;
    var transform = function(d) { return state ? "on" : "off" ; };
    this.sun.transition()
    .attr("class", transform);
  };

  SwitchChart.prototype._init = function() {
    var w = 300,
    h = 300,
    r = 80;

    var svg = d3.select("#container").insert("svg:svg", "form")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(.9)")
    .append("svg:g")

    var sun = svg.append("svg:g")
    .attr("class", "sun")
    .append("svg:g")
    .attr("class", "gear");

    sun.append("svg:circle")
    .attr('r', r)
    .attr("class", "gear"); 
    
    var title = svg.append('svg:text')
        .attr('class', 'text')
        .attr('y', 125)
        .attr('x', -25)
        .text(this.title);

    this.sun = sun;
  };

  exports.SwitchChart = SwitchChart;
})(window);
