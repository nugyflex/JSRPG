function light(x, y, z, intensity){
	this.x = x;
	this.y = y;
	this.z = z;
	this.width = 1;
	this.height = 1;
	this.intensity = intensity;
	this.colours = ['red', 'white', 'blue', 'black'];
	//Later restrict the objects it loops through to those encompassed within the radius determined by its intensity
	this.draw = function(){
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, this.y - this.z, 10, 10);
	}
	this.castShadows = function(object){
		if (this.z > 0 && this.z > object.vHeight){
			this.verts = trans(object, 'default', 'default');
			this.vArray = [];
			for (key in this.verts){
				this.vArray.push(this.verts[key]);
			}
			if (debug == 1){
				ctx.fillStyle = 'rgba(0, 0, 0, 1)';
				ctx.strokeStyle = 'black';
				ctx.fillRect(this.vArray[3].x - 5, this.vArray[3].y - 5, 10, 10);
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.vArray[3].x, this.vArray[3].y);
				ctx.stroke();
				
				ctx.fillStyle = 'rgba(0, 0, 255, 1)';
				ctx.strokeStyle = 'blue';
				ctx.fillRect(this.vArray[2].x - 5, this.vArray[2].y - 5, 10, 10);
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.vArray[2].x, this.vArray[2].y);
				ctx.stroke();
				
				ctx.fillStyle = 'rgba(255, 255, 255, 1)';
				ctx.strokeStyle = 'white';
				ctx.fillRect(this.vArray[1].x - 5, this.vArray[1].y - 5, 10, 10);
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.vArray[1].x, this.vArray[1].y);
				ctx.stroke();
				
				ctx.fillStyle = 'rgba(255, 0, 0, 1)';
				ctx.strokeStyle = 'red';
				ctx.fillRect(this.vArray[0].x - 5, this.vArray[0].y - 5, 10, 10);
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.vArray[0].x, this.vArray[0].y);
				ctx.stroke();
			}
			//NOTES for calculating the offset
			//NOTE - the vHeight referred to here assumes that all vertices are at the same height (that the object has a level 'top' face) - for future objects with varying heights, we will need to include those individual heights for the vertices
			//NOTE - the 'y' value is adjusted based on the vHeight of the object because this is where the shadows are being cast from, so this is where the distance is calculated
			//NOTE - this also assumes that the obect's base is on the ground, and object levitating for whatever reason would need a different method
			//Have to make special case for when the light's z pos is less than the objects - should default to distance as a method of calculating how far to project the shadows
			for (v = 0; v < this.vArray.length; v++){
				//var offset = distance(this.vArray[v], this) / (100/this.z);
				this.triHypot = Math.sqrt(Math.pow(this.x - this.vArray[v].x, 2) + Math.pow(this.y - (this.vArray[v].y - object.vHeight), 2) + Math.pow(this.z - object.vHeight, 2));
				this.triHeight = this.z - object.vHeight;
				this.theta = Math.acos(this.triHeight/this.triHypot);
				this.shadowDist = object.vHeight * Math.tan(this.theta);
				//this.vArray[v].dest = {x: this.vArray[v].x + -(this.intensity*offset)/distance(this, this.vArray[v])*(this.x - this.vArray[v].x), y: this.vArray[v].y + -(this.intensity*offset)/distance(this, this.vArray[v])*(this.y - this.vArray[v].y)}
				this.vArray[v].dest = {x: this.vArray[v].x + -(this.shadowDist)/distance(this, this.vArray[v]) * (this.x - this.vArray[v].x), y: this.vArray[v].y + -(this.shadowDist)/distance(this, this.vArray[v]) * (this.y - this.vArray[v].y)}
				this.vArray[v].deg = angle(this, this.vArray[v], this);
				this.vArray[v].dest.deg= this.vArray[v].deg;
				this.vArray[v].dest.pNum = v;
			}
			if (pointCollide(this, object)){
				ctx.moveTo(this.vArray[0].dest.x, this.vArray[0].dest.y);
				for (j = 1; j < this.vArray.length; j++){
					ctx.lineTo(this.vArray[j].dest.x, this.vArray[j].dest.y);
				}
				ctx.closePath();
				ctx.fillStyle = 'rgba(0, 0, 0,' + this.intensity + ')';
				ctx.fill();
			}
			else {
				this.collFlag = 0;
				for (i = 0; i < this.vArray.length; i++){
					if (pointCollide(this.vArray[i].dest, object)){
						this.collFlag = 1;
						break;
					}
				}
				this.vArraySorted = this.vArray.slice(0);
				this.vArraySorted.sort(function(a, b){ return a.deg - b.deg} );
				if ((this.x < this.vArraySorted[0].x && this.x > this.vArraySorted[this.vArraySorted.length - 1].x) && this.y > this.vArraySorted[0].y){
					this.vArraySorted.sort(
						function(a, b){
							result = a.x - b.x;
							if (result == 0){
								result = a.deg - b.deg;
							}
							return result;
						}
					)
				}
				this.tempV = this.vArraySorted.splice(0, 1);
				for (vs = 0; vs < this.vArraySorted.length; vs++){
					this.vArraySorted[vs].deg = angle(this.tempV[0], this.vArraySorted[vs], this);
					this.vArraySorted[vs].dest.deg = this.vArraySorted[vs].deg;
				}
				this.vArraySorted.sort(function(a, b){ return a.deg - b.deg} );
				this.vArraySorted.splice(0, 0, this.tempV[0]);
				
				this.currIndex = 0;
				this.iterCount = this.vArray.length - 1;
				if (this.collFlag == 0){
					this.lineCollFlag = 0;
					var p = this.vArraySorted[this.vArray.length - 1];
					this.line = {x1: p.x, y1: p.y, x2: p.dest.x, y2: p.dest.y};
					this.lines = convert(object, 'default', 1);
					if (!pointCollide(this.vArraySorted[this.vArray.length - 1].dest, object)){
						for (key in this.lines){
							this.lineCol = lineCollision(this.line, this.lines[key]);
							if (this.lineCol && (this.lineCol.tx != p.x && this.lineCol.ty != p.y)){
								this.lineCollFlag = 1;
							}
						}
					}
					if (this.lineCollFlag == 0){
						this.iterCount++;
					}
				}
				
				ctx.beginPath()
				ctx.moveTo(this.vArraySorted[0].x, this.vArraySorted[0].y);
				for (i = 0; i < this.iterCount; i++){
					ctx.lineTo(this.vArraySorted[i].dest.x, this.vArraySorted[i].dest.y);
				}
				//only piece of hard-coding, this applies solely to rectangles
				if (this.collFlag == 0){
					if (this.lineColl == 0){
						ctx.lineTo(this.vArraySorted[this.iterCount].x, this.vArraySorted[this.iterCount].y)
					}
					else {
						ctx.lineTo(this.vArraySorted[this.iterCount - 1].x, this.vArraySorted[this.iterCount - 1].y)
					}
				}
				else {
					ctx.lineTo(this.vArraySorted[this.vArraySorted.length - 2].x, this.vArraySorted[this.vArraySorted.length - 2].y);
				}
				//ctx.stroke();
				ctx.fillStyle = 'rgba(0, 0, 0,' + this.intensity + ')';
				ctx.fill();
			}
			
			/*this.collFlag = -1;
			for (i = 0; i < this.vArray.length; i++){
				if (pointCollide(this.vArray[i].dest, object)){
					this.index = i + 1;
					if (i == this.vArray.length - 1){
						this.index = 0;
					}
					this.vArray[i].dest = this.vArray[this.index];
					this.collFlag = i;
				}
				ctx.fillStyle = 'orange';
				if (debug == 1){
					ctx.fillRect(this.vArray[i].dest.x - 3, this.vArray[i].dest.y - 3, 6, 6);
				}
			}*/
			/*this.posFlag = 0;
			if (this.collFlag == -1 && !pointCollide(this, object)){
				ctx.beginPath();
				if (this.y > object.y + object.height && (this.x > object.x && this.x < object.x + object.width)){
					ctx.moveTo(this.vArraySorted[2].x , this.vArraySorted[2].y);
					ctx.lineTo(this.vArraySorted[2].dest.x, this.vArraySorted[2].dest.y);
					ctx.lineTo(this.vArraySorted[1].dest.x, this.vArraySorted[1].dest.y);
					ctx.lineTo(this.vArraySorted[1].x, this.vArraySorted[1].y);
					this.posFlag = 1;
				}
				else if ((this.y > object.y && this.y < object.y + object.height) && this.x > object.x + object.width){
					ctx.moveTo(this.vArraySorted[0].x , this.vArraySorted[0].y);
					ctx.lineTo(this.vArraySorted[0].dest.x, this.vArraySorted[0].dest.y);
					ctx.lineTo(this.vArraySorted[3].dest.x, this.vArraySorted[3].dest.y);
					ctx.lineTo(this.vArraySorted[3].x, this.vArraySorted[3].y);
					this.posFlag = 1;
				}
				else if ((this.y < object.y && (this.x > object.x && this.x < object.x + object.width)) || (this.x < object.x && (this.y > object.y && this.y < object.y + object.height))){
					ctx.moveTo(this.vArraySorted[3].x, this.vArraySorted[3].y);
					ctx.lineTo(this.vArraySorted[3].dest.x, this.vArraySorted[3].dest.y);
					ctx.lineTo(this.vArraySorted[0].dest.x, this.vArraySorted[0].dest.y);
					ctx.lineTo(this.vArraySorted[0].x, this.vArraySorted[0].y);
					this.posFlag = 1;
				}
				else {
					ctx.moveTo(this.vArraySorted[0].x, this.vArraySorted[0].y);
					ctx.lineTo(this.vArraySorted[0].dest.x, this.vArraySorted[0].dest.y);
				}
				if (debug == 1){
					ctx.stroke();
				}
				ctx.fillStyle = 'rgba(0, 0, 0,' + intensity + ')';
				ctx.fill();
			}
			ctx.beginPath();
			if (this.collFlag >= 0){
				ctx.moveTo(this.vArray[this.collFlag].dest.x, this.vArray[this.collFlag].dest.y);
				ctx.lineTo(this.vArraySorted[0].dest.x, this.vArraySorted[0].dest.y);
				this.nextIndex = this.vArray.indexOf(this.vArraySorted[0]) + 1;
				if (this.nextIndex > 3){
					this.nextIndex = 0;
				}
				this.cap = 2;
			}
			else {
				if (this.posFlag == 1 || pointCollide(this, object)){
					ctx.moveTo(this.vArray[0].dest.x, this.vArray[0].dest.y);
				}
				else {
					ctx.moveTo(this.vArraySorted[0].dest.x, this.vArraySorted[0].dest.y);
				}
				this.nextIndex = 1;
				this.cap = 3;
				//if (this.posFlag == 0){
				//	this.cap = 2;
				//}
			}
			//make the first in arraySorted the reference point for the other angles
			for (n = 0; n < this.cap; n++){
				//if (this.collFlag >= 0 || pointCollide(this, object) || this.posFlag == 1){
					ctx.lineTo(this.vArray[this.nextIndex].dest.x, this.vArray[this.nextIndex].dest.y);
				//}
				//else {
				//	ctx.lineTo(this.vArraySorted[this.nextIndex].dest.x, this.vArraySorted[this.nextIndex].dest.y);
				//}
				this.nextIndex++;
				if (this.nextIndex > 3){
					this.nextIndex = 0;
				}
			}
			if (this.collFlag >= 0){
				ctx.lineTo(this.vArraySorted[3].x, this.vArraySorted[3].y);
			}
			if (debug == 1){
				ctx.stroke();
			}
			
			ctx.fillStyle = 'rgba(0, 0, 0,' + intensity + ')';
			ctx.fill();
			*/
			if (debug == 1){
				fillCircle(this.vArraySorted[0].dest.x, this.vArraySorted[0].dest.y, 3, 'yellow');
				fillCircle(this.vArraySorted[1].dest.x, this.vArraySorted[1].dest.y, 3, 'cyan');
				fillCircle(this.vArraySorted[2].dest.x, this.vArraySorted[2].dest.y, 3, 'magenta');
				fillCircle(this.vArraySorted[3].dest.x, this.vArraySorted[3].dest.y, 3, 'green');
				
				//if (this.collFlag >= 0){
				//	fillCircle(this.vArray[this.collFlag].dest.x, this.vArray[this.collFlag].dest.y, 3, 'cyan');
				//}
			}
		}
	}
}
function pointCollide(p, a){
	if ((p.x > a.x && p.x < a.x + a.width) && (p.y > a.y && p.y < a.y + a.height)){
		return true;
	}
	else {
		return false;
	}	
}
function distance(obj1, obj2, centre){
	if (centre){
		this.distx = (obj1.x + (obj1.width/2)) - (obj2.x + obj2.width/2);
		this.disty = (obj1.y + (obj1.height/2)) - (obj2.y + (obj2.height/2));
		this.dst = Math.sqrt((this.distx*this.distx) + (this.disty*this.disty));
	}
	else {
		this.distx = (obj1.x) - (obj2.x);
		this.disty = (obj1.y) - (obj2.y);
		this.dst = Math.sqrt((this.distx*this.distx) + (this.disty*this.disty));
	}
	return dst;
}
function fillCircle(cx, cy, r, colour){
	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, 2*Math.PI);
	ctx.fillStyle = colour;
	ctx.fill();
	ctx.closePath();
}
function angle(from, to, light) {
	var dy = from.y - to.y;
	var dx = from.x - to.x;
	var theta = 180 + 180 / Math.PI * Math.atan2(dx, -dy);
	if (light.y > from.y && theta == 360){
		theta = 0;
	}
	return theta;
}
