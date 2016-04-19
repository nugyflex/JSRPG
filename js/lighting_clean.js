function light(x, y, z, intensity){
	this.x = x;
	this.y = y;
	this.z = z;
	this.width = 1;
	this.height = 1;
	this.intensity = intensity;
	this.draw = function()
	{
		if (this.z > 0)
		{

		ctx.shadowColor = 'yellow';
		ctx.shadowBlur = 60;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x, this.y - this.z, 10, 10);
		ctx.shadowColor = '#000000';
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		}
	}
	this.castShadows = function(object){
		if (this.z > 0){
			this.verts = trans(object, 'default', 'default');
			this.vArray = [];
			for (key in this.verts){
				this.vArray.push(this.verts[key]);
			}
			for (v = 0; v < this.vArray.length; v++){
				var offset = distance(this.vArray[v], this) / (100/this.z);
				this.vArray[v].dest = {x: this.vArray[v].x + -(this.intensity*offset)/distance(this, this.vArray[v])*(this.x - this.vArray[v].x), y: this.vArray[v].y + -(this.intensity*offset)/distance(this, this.vArray[v])*(this.y - this.vArray[v].y)}
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
				ctx.stroke();
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
				ctx.stroke();
			}
		}
	}
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