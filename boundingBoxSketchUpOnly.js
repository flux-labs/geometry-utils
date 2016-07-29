'use strict';

/**
 * Code block template.
 *
 */
 
Array.min = function(array){
    return Math.min.apply(Math,array);
};

Array.max = function(array){
    return Math.max.apply(Math,array);
};

function meshOnly(Mesh) {
	var vertices = Mesh.vertices;
	var units = Mesh.units.vertices;

	var x=[],y=[],z=[];
	for (var vertex of vertices) {
		x.push(vertex[0]);
		y.push(vertex[1]);
		z.push(vertex[2]);
	}

	return {
		"x": x,
		"y": y,
		"z": z,
		"units": units
	}
}

function lineOnly(Line) {
	var start = Line.start;
	var end = Line.end;
    var units = Line.units.start;
	
	var x=[start[0],end[0]],y=[start[1],end[1]],z=[start[2],end[2]];
	
	return {
		"x": x,
		"y": y,
		"z": z,
		"units": units
	}

}

function polylineOnly(Polyline) {
	var points = Polyline.points;
	var units = Polyline.units.points;
	
	var x=[],y=[],z=[];
	for (var point of points) {
		x.push(point[0]);
		y.push(point[1]);
		z.push(point[2]);
	}

	return {
		"x": x,
		"y": y,
		"z": z,
		"units": units
	}
	
}

function run(In) {
	var x=[], y=[], z=[], units;
	
	for (var object of In) {
		var primitive = object.primitive;
		
		if (primitive == "mesh") {
			x = x.concat(meshOnly(object).x);
			y = y.concat(meshOnly(object).y);
			z = z.concat(meshOnly(object).z);
			units = meshOnly(object).units;
		} else if (primitive == "line") {
			x = x.concat(lineOnly(object).x);
			y = y.concat(lineOnly(object).y);
			z = z.concat(lineOnly(object).z);
			units = lineOnly(object).units;
		} else if (primitive == "polyline") {
			x = x.concat(polylineOnly(object).x);
			y = y.concat(polylineOnly(object).y);
			z = z.concat(polylineOnly(object).z);
			units = polylineOnly(object).units;
		}
	}

	var min = [Array.min(x), Array.min(y), Array.min(z)];
	var max = [Array.max(x), Array.max(y), Array.max(z)];
	
	var BoundingBox = [
	    {
	    	"point": min,
	    	"primitive": "point",
	    	"units": {
	    		"point": units
	    	}
	    },
	    {
	    	"point": max,
	    	"primitive": "point",
	    	"units": {
	    		"point": units
	    	}
	    }
	];
	
    return {
		Out: BoundingBox
	};
}

module.exports = {
    run: run
};
