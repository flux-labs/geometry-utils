'use strict';

/**
 * Code block template.
 *
 */
function run(In) {
	var min = In[0].point, max = In[1].point;
	var units = In[0].units.point;

	//center point of top face, average of x, average of y, max of z
	var top = [(min[0]+max[0])/2,(min[1]+max[1])/2,max[2]];
	
	//center point of bottom face
	var bottom = [(min[0]+max[0])/2,(min[1]+max[1])/2,min[2]];
	
	var topFace = {
		"point": top,
		"primitive": "point",
		"units": {
			"point": units
		}
	}

	var bottomFace = {
		"point": bottom,
		"primitive": "point",
		"units": {
			"point": units
		}
	}

    return {
    	TopFace: topFace,
    	BottomFace: bottomFace
    }
}

module.exports = {
    run: run
};
