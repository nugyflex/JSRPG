//object being translated, position translated to, degree of rotation in radians
function trans(obj1, obj2, deg){
	if (deg == 'default'){
		deg = 0;
	}
	if (obj2 == 'default'){
		obj2 = {x: obj1.x + obj1.width/2, y: obj1.y + obj1.height/2};
	}
	p = obj2.x
	q = obj2.y
	//Top left
	tLx = ((obj1.x - p) * Math.cos(deg)) - ((obj1.y - q) * Math.sin(deg)) + p;
	tLy = ((obj1.x - p) * Math.sin(deg)) + ((obj1.y - q) * Math.cos(deg)) + q;
	//Top right
	tRx = ((obj1.x + obj1.width - p) * Math.cos(deg)) - ((obj1.y - q) * Math.sin(deg)) + p;
	tRy = ((obj1.x + obj1.width - p) * Math.sin(deg)) + ((obj1.y - q) * Math.cos(deg)) + q;
	//Bottom right
	bRx = ((obj1.x + obj1.width - p) * Math.cos(deg)) - ((obj1.y + obj1.height - q) * Math.sin(deg)) + p;
	bRy = ((obj1.x + obj1.width - p) * Math.sin(deg)) + ((obj1.y + obj1.height - q) * Math.cos(deg)) + q;
	//Bottom left
	bLx = ((obj1.x - p) * Math.cos(deg)) - ((obj1.y + obj1.height - q) * Math.sin(deg)) + p;
	bLy = ((obj1.x - p) * Math.sin(deg)) + ((obj1.y + obj1.height - q) * Math.cos(deg)) + q;
	
	return {tL: {x: tLx, y: tLy}, 
			tR: {x: tRx, y: tRy}, 
			bR: {x: bRx, y: bRy}, 
			bL: {x: bLx, y: bLy}};
}

function convert(obj, deg, centre){
	if (deg == 'default'){
		deg = 0;
	}
	if (centre == 1){
		obj['centre'] = {x: obj.x + obj.width/2, y: obj.y + obj.height/2};
		c1 = trans(obj, obj.centre, deg);
	}
	else {
		obj2 = {x: centre.x, y: centre.y};
		c1 = trans(obj, obj2, deg);
	}
	lines1 = {one:   {x1: c1.tL.x, y1: c1.tL.y, x2: c1.tR.x, y2: c1.tR.y}, 
			  two:   {x1: c1.tR.x, y1: c1.tR.y, x2: c1.bR.x, y2: c1.bR.y}, 
			  three: {x1: c1.bR.x, y1: c1.bR.y, x2: c1.bL.x, y2: c1.bL.y}, 
			  four:  {x1: c1.bL.x, y1: c1.bL.y, x2: c1.tL.x, y2: c1.tL.y}}
	return lines1;
}