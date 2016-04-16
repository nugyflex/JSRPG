function light(x, y, z, intensity){
	this.x = x;
	this.y = y;
	this.z = z;
	this.width = 1;
	this.height = 1;
	this.intensity = intensity;
	//Later restrict the objects it loops through to those encompassed within the radius determined by its intensity
	this.castShadows = function(object){
		this.oCX = object.x + object.width/2;
		this.oCY = object.y + object.height/2;
		this.deg = Math.atan2((this.oCY - this.y), (this.oCX - this.x));
		this.verts = trans(object, 'default', 'default');
		this.vert1= 'undefined';
		this.vert2 = 'undefined';
		this.vert3 = 'undefined';
		this.vert4 = 'undefined';
		this.firstKey = 'undefined';
		this.secondKey = 'undefined';
		this.thirdKey = 'undefined';
		this.fourthKey = 'undefined';
		//A medium-rare, well-seasoned, porterhouse tumor:
		/*this.vert4 = {x: this.vert1.x, y: this.vert1.y - 40};
		this.vert5 = {x: this.vert2.x, y: this.vert2.y - 40};
		this.vert6 = {x: this.vert3.x, y: this.vert3.y - 40};*/
		/*this.verts['vtL'] = {x: this.verts['tL'].x, y: this.verts['tL'].y - 40};
		this.verts['vtR'] = {x: this.verts['tR'].x, y: this.verts['tR'].y - 40};
		this.verts['vbL'] = {x: this.verts['bL'].x, y: this.verts['bL'].y - 40};
		this.verts['vbR'] = {x: this.verts['bR'].x, y: this.verts['bR'].y - 40};*/
		for (key in this.verts){
			if (this.vert1 == 'undefined' || distance(this, this.verts[key]) > distance(this, this.vert1)){
				this.vert1 = this.verts[key];
				this.firstKey = key;
			}
		}
		delete this.verts[this.firstKey];
		for (key in this.verts){
			if (this.vert2 == 'undefined' || distance(this.vert1, this.verts[key]) < distance(this.vert1, this.vert2)){
				this.vert2 = this.verts[key];
				this.secondKey = key;
			}
		}
		delete this.verts[this.secondKey];
		for (key in this.verts){
			if (this.vert3 == 'undefined' || distance(this.vert1, this.verts[key]) < distance(this.vert1, this.vert3)){
				this.vert3 = this.verts[key];
				this.thirdKey = key;
			}
		}
		delete this.verts[this.thirdKey];
		for (key in this.verts){
			if (this.vert4 == 'undefined' || distance(this.vert1, this.verts[key]) < distance(this.vert1, this.vert4)){
				this.vert4 = this.verts[key];
				this.fourthKey = key;
			}
		}
		delete this.verts[this.fourthKey];
		
		ctx.fillStyle = 'rgba(0, 0, 0, 1)';
		ctx.strokeStyle = 'black';
		ctx.fillRect(this.vert4.x - 5, this.vert4.y - 5, 10, 10);
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.vert4.x, this.vert4.y);
		ctx.stroke();
		
		ctx.fillStyle = 'rgba(0, 0, 255, 1)';
		ctx.strokeStyle = 'blue';
		ctx.fillRect(this.vert3.x - 5, this.vert3.y - 5, 10, 10);
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.vert3.x, this.vert3.y);
		ctx.stroke();
		
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		ctx.strokeStyle = 'white';
		ctx.fillRect(this.vert2.x - 5, this.vert2.y - 5, 10, 10);
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.vert2.x, this.vert2.y);
		ctx.stroke();
		
		ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		ctx.strokeStyle = 'red';
		ctx.fillRect(this.vert1.x - 5, this.vert1.y - 5, 10, 10);
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.vert1.x, this.vert1.y);
		ctx.stroke();
		
		this.hypotDist = Math.sqrt(Math.pow(this.x - this.vert1.x, 2) + Math.pow(this.y - this.vert2.y, 2) + Math.pow(this.z, 2));
		this.xDest1 = this.vert1.x + -(this.intensity*150)/distance(this, this.vert1)*(this.x - this.vert1.x);
		this.yDest1 = this.vert1.y + -(this.intensity*150)/distance(this, this.vert1)*(this.y - this.vert1.y);
		ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		//ctx.fillRect(this.xDest1 - 5, this.yDest1 - 5, 10, 10);
		
		//Type 1
		/*
		this.xDest2 = this.vert1.x + -(this.intensity*150)/distance(this, this.vert1)*(this.x - this.vert1.x) - (this.vert1.x - this.vert2.x);
		this.yDest2 = this.vert1.y + -(this.intensity*150)/distance(this, this.vert1)*(this.y - this.vert1.y) - (this.vert1.y - this.vert2.y);
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		//ctx.fillRect(this.xDest2 - 2, this.yDest2 - 2, 4, 4);
		
		this.xDest3 = this.vert1.x + -(this.intensity*150)/distance(this, this.vert1)*(this.x - this.vert1.x) - (this.vert1.x - this.vert3.x);
		this.yDest3 = this.vert1.y + -(this.intensity*150)/distance(this, this.vert1)*(this.y - this.vert1.y) - (this.vert1.y - this.vert3.y);
		ctx.fillStyle = 'rgba(0, 0, 255, 1)';
		//ctx.fillRect(this.xDest3 - 2, this.yDest3 - 2, 4, 4);
		*/
		
		//Type 2
		this.xDest2 = this.vert2.x + (this.intensity*150)/distance(this, this.vert2)*(this.vert2.x - this.x);
		this.yDest2 = this.vert2.y + (this.intensity*150)/distance(this, this.vert2)*(this.vert2.y - this.y);
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		//ctx.fillRect(this.xDest2 - 2, this.yDest2 - 2, 4, 4);
		this.xDest3 = this.vert3.x + (this.intensity*150)/distance(this, this.vert3)*(this.vert3.x - this.x);
		this.yDest3 = this.vert3.y + (this.intensity*150)/distance(this, this.vert3)*(this.vert3.y - this.y);
		ctx.fillStyle = 'rgba(0, 0, 255, 1)';
		
		this.xDest4 = this.vert4.x + (this.intensity*150)/distance(this, this.vert4)*(this.vert4.x - this.x);
		this.yDest4 = this.vert4.y + (this.intensity*150)/distance(this, this.vert4)*(this.vert4.y - this.y);
		ctx.fillStyle = 'rgba(0, 0, 0, 1)';
		//ctx.fillRect(this.xDest3 - 2, this.yDest3 - 2, 4, 4);
		
		ctx.beginPath();
		ctx.moveTo(this.vert4.x, this.vert4.y);
		ctx.lineTo(this.vert4.x, this.vert4.y);
		ctx.lineTo(this.xDest4, this.yDest4);
		ctx.lineTo(this.vert3.x, this.vert3.y);
		ctx.lineTo(this.xDest3, this.yDest3);
		ctx.lineTo(this.xDest1, this.yDest1);
		ctx.lineTo(this.xDest2, this.yDest2);
		ctx.lineTo(this.vert2.x, this.vert2.y);
		ctx.lineTo(this.vert1.x, this.vert1.y);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = 'rgba(0, 0, 0,' + intensity + ')';
		ctx.fill();
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