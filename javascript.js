d3.json("data.json", function(data) {
	var margin = {
		top: 40,
		right: 10,
		bottom: 10,
		left: 10
	};
	var width = 960 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;
	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([0, height]);

	var color = d3.scale.category20();

	var treemap = d3.layout.treemap()
	  .size([width, height])
	  .sticky(true)
	  .value(function(d) { return d.size; });

	var svg = d3.select("body")
	  .append("div")
		.style("position", "relative")
	    .style("width", (width + margin.left + margin.right) + "px")
	    .style("height", (height + margin.top + margin.bottom) + "px")
	    .style("left", margin.left + "px")
	    .style("top", margin.top + "px")
	  .append("svg:svg")
	    .attr("width", width)
		.attr("height", height)
	  .append("svg:g")
	    .attr("transform", "translate(.5, .5)");

	var node = root = data;
	var temp;
});
