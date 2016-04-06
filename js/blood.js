function blood(_x, _y, _yvel, _xvel, _size)
{
	this.x = _x;
	this.y = _y;
	this.xvel = _xvel;
	this.yvel = _yvel;
	this.size = _size;
	this.vheight =-2;
	this.vyvel = -3;
	this.alpha = 1;
	this.decreaseAlpha = Math.random()*0.008;
	if (this.decreaseAlpha<0.003)
	{
		this.decreaseAlpha = 0.003;
	}
	this.draw = function()
	{
		if (this.vheight == 0)
		{
			ctx.fillStyle = "rgba(180, 30, 30," + this.alpha + ")";
			drawEllipse(this.x + this.size/2, this.y + this.size/2, this.size*2, this.size);
			this.alpha-=this.decreaseAlpha;
		}
		else
		{
			ctx.fillStyle = "rgb(200, 50, 50)";
			drawEllipse(this.x + this.size/2, this.y + this.vheight + this.size/2, this.size, this.size);	
			ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
			drawEllipse(this.x + this.size/2, this.y + this.size/2, this.size/2, this.size/2);				
		}
	}
	this.update = function()
	{
		this.x += this.xvel;
		this.y += this.yvel;
		this.vheight+=this.vyvel;
		this.vyvel += .09;
		if (this.vheight>0)
		{
			this.vheight = 0;
		}
		if (this.vheight == 0)
		{
			this.xvel = 0;
			this.yvel = 0;
		}
		//Removing the bloods when they are invisible, just so the performance is still goat
		if (this.alpha <= 0){
			bloodCollection.remove(bloodCollection.array.indexOf(this));
		}
	}
}