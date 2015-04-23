d3.json("flare.json", function(data)) {
	var w = 1280 - 80;
	var h = 800 - 180;
	var x = d3.scale.linear().range([0, w]);
	var y = d3.scale.linear().range([0, h]);

}
