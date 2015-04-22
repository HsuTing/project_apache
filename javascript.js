d3.json("data.json", function(root) {
	var margin = {
		top: 40,
		right: 10,
		bottom: 10,
		left: 10
	};
	var width = 960 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

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

	var node = svg.datum(root)
	    .selectAll(".node")
	    .data(treemap.nodes)
	  .enter().append("div")
	    .style("background", function(d) { return d.children ? color(d.name) : null; })
	    .text(function(d) { return d.children ? null : d.name; });

	function position() {
		this
	}
});
