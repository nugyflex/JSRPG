function light(x, y, z, intensity){
	this.x = x;
	this.y = y;
	this.z = z;
	this.width = 1;
	this.height = 1;
	this.intensity = intensity;
	this.colours = ['red', 'white', 'blue', 'black'];
	this.draw = function()
	{
		if (this.z > 0)
		{
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x, this.y - this.z, 5, 5);
		}
	}
	//Later restrict the objects it loops through to those encompassed within the radius determined by its intensity
	this.castShadows = function(object){
		if (this.z > 0)
		{//SO IT DOESNT CAST SHADOWS WHHEN IN THE GROUND
		this.verts = trans(object, 'default', 'default');
		this.vArray = [];
		for (key in this.verts){
			this.vArray.push(this.verts[key]);
		}
		//Replace all instances of the array with references to the correct labelled key variable (vert1, vert2, etc.)
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
		//Calculate distance to project the shadow
		//this.hypotDi00st = Math.sqrt(Math.pow(this.x - this.vArray[0].x, 2) + Math.pow(this.y - this.vArray[1].y, 2) + Math.pow(this.z, 2));
		
		//OLD CODE
		
		/*
		for (v = 0; v < this.vArray.length; v++){
			this.vArray[v].dest = {x: this.vArray[v].x + -(this.intensity*150)/distance(this, this.vArray[v])*(this.x - this.vArray[v].x), y: this.vArray[v].y + -(this.intensity*150)/distance(this, this.vArray[v])*(this.y - this.vArray[v].y)}
			this.vArray[v].deg = Math.atan2((this.vArray[v].y - this.y), (this.vArray[v].x - this.x));
			this.vArray[v].dest.deg= this.vArray[v].deg;
			this.vArray[v].dest.pNum = v;
		}*/
		
		//NEW CODE
		
		for (v = 0; v < this.vArray.length; v++){
			//shitty var name soz
			var offset = collisionDetection.finddistance(this.vArray[v], this) / (100/this.z);
			this.vArray[v].dest = {x: this.vArray[v].x + -(this.intensity*offset)/distance(this, this.vArray[v])*(this.x - this.vArray[v].x), y: this.vArray[v].y + -(this.intensity*offset)/distance(this, this.vArray[v])*(this.y - this.vArray[v].y)}
			this.vArray[v].deg = Math.atan2((this.vArray[v].y - this.y), (this.vArray[v].x - this.x));
			this.vArray[v].dest.deg= this.vArray[v].deg;
			this.vArray[v].dest.pNum = v;
		}
				
		//Fix this shitty piece of code, it's honestly disgraceful
		this.vArraySorted = this.vArray.slice(0);
		if (!(this.x > object.x + object.width && this.y > object.y && this.y < object.y + object.height)){
			this.vArraySorted.sort(function(a, b){ return a.deg - b.deg} );
		}
		else {
			this.temp = this.vArraySorted.slice(0, 1);
			this.vArraySorted[0] = this.vArray[2];
			this.vArraySorted[2] = this.temp[0];
		}
		
		this.collFlag = -1;
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
		}
		if (this.collFlag == -1 && !pointCollide(this, object)){
			ctx.beginPath();
			ctx.moveTo(this.vArraySorted[3].x, this.vArraySorted[3].y);
			ctx.lineTo(this.vArraySorted[3].dest.x, this.vArraySorted[3].dest.y);
			ctx.lineTo(this.vArraySorted[0].dest.x, this.vArraySorted[0].dest.y);
			ctx.lineTo(this.vArraySorted[0].x, this.vArraySorted[0].y);
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
			ctx.moveTo(this.vArray[0].dest.x, this.vArray[0].dest.y);
			this.nextIndex = 1;
			this.cap = 3
		}
		ctx.lineTo(this.vArray[this.nextIndex].dest.x, this.vArray[this.nextIndex].dest.y);
		for (n = 0; n < this.cap; n++){
			ctx.lineTo(this.vArray[this.nextIndex].dest.x, this.vArray[this.nextIndex].dest.y);
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
		if (debug == 1){
			fillCircle(this.vArraySorted[1].dest.x, this.vArraySorted[1].dest.y, 3, 'grey');
			fillCircle(this.vArraySorted[2].dest.x, this.vArraySorted[2].dest.y, 3, 'grey');
			fillCircle(this.vArraySorted[3].dest.x, this.vArraySorted[3].dest.y, 3, 'grey');
			fillCircle(this.vArraySorted[0].dest.x, this.vArraySorted[0].dest.y, 3, 'yellow');
			
			if (this.collFlag >= 0){
				fillCircle(this.vArray[this.collFlag].dest.x, this.vArray[this.collFlag].dest.y, 3, 'cyan');
			}
		}
		//NOTES FOR IMPROVEMENT OF REALISM
		//when there is no point collision the lines should be straight
		//After using the hypotenuse to calculate the distance of the shadow this should be fixed to some extent
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