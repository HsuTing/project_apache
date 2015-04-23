d3.csv("city.csv", function(data) {
	console.log(data);

	var width = 1280 - 80;
	var height = 800 - 180;
	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([0, height]);
	var root, node;

	var color = d3.scale.category20c();

	var treemap = d3.layout.treemap()
	  .size([width, height])
	  .sticky(true)
	  .value(size);								//big treemap parameter

	var svg = d3.select("body")
	  .append("div")
	    .style("position", "relative")
	    .style("width", width + "px")
	    .style("height", height + "px")
	  .append("svg:svg")
	    .attr("width", width + "px")
	    .attr("height", height + "px")
	  .append("svg:g")
		.attr("transform", "translate(.5, .5)");

	node = root = data;
	var nodes = treemap.nodes(root)
	  .filter(function(d) { return !d.children; });

	var cell = svg.selectAll("g")
	    .data(nodes)
	  .enter().append("svg:g")
	    .attr("class", "cell")
	    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
	    .on("click", function(d) {
			treemap.value(node.name == "flare" ? year : size).nodes(root);	//compare treemap name
			return zoom(node == d.parent ? root : d.parent); 
		});

	cell
	  .append("svg:rect")
	    .attr("width", function(d) { return d.dx - 1; })
	    .attr("height", function(d) { return d.dy - 1; })
	    .style("fill", function(d) { return color(d.parent.name); });

	cell
	  .append("svg:text")
	    .attr("x", function(d) { return d.dx / 2; })
	    .attr("y", function(d) { return d.dy / 2; })
	    .attr("dy", ".35em")
	    .attr("text-anchor", "middle")
	    .text(function(d) { return d.name; })
	    .style("opacity", function(d) {
			d.w = this.getComputedTextLength();
			return d.dx > d.w ? 1 : 0;
		});

	function size(d) {						//big treemap parameter
		return d.size;
	}

	function year(d) {						//small treemap parameter
		return d.year;
	}

	function zoom(d) {
		var kx = width / d.dx;
		var ky = height / d.dy;
		x.domain([d.x, d.x + d.dx]);
		y.domain([d.y, d.y + d.dy]);

		var t = svg.selectAll("g.cell")
		  .transition()
		  .duration(d3.event.altkey ? 7500 : 750)
		    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

		t
		  .select("rect")
		    .attr("width", function(d) { return kx * d.dx - 1; })
		    .attr("height", function(d) { return ky * d.dy - 1; });

		t
		  .select("text")
		     .attr("x", function(d) { return kx * d.dx / 2; })
		     .attr("y", function(d) { return ky * d.dy / 2; })
		     .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

		node = d;
		d3.event.stopPropagation();
	}
});
