function platform(_x, _y, _width, _height, _vHeight, image, ioffsetx, ioffsety)
{
	this.x = _x;
	this.y = _y;
	this.z = 0;
	this.width = _width;
	this.height = _height;
	this.type;
	this.image = image;
	this.ioffsetx = ioffsetx;
	this.ioffsety = ioffsety;
	this.vHeight = _vHeight;
	this.update = function()
	{
		
	}
	this.draw = function()
	{
		if (this.image !== 0)
		{
			ctx.drawImage(this.image, this.x + this.ioffsetx, this.y + this.ioffsety)
		}
		else
		{
		ctx.fillStyle = "grey";
		ctx.fillRect(this.x, this.y-this.vHeight, this.width, this.vHeight + this.height);
		ctx.fillStyle = "rgb(100, 100, 100)";
		ctx.fillRect(this.x, this.y-this.vHeight, this.width, this.height);
		ctx.fillStyle = "rgb(80, 80, 80)";
		ctx.fillRect(this.x, this.y-this.vHeight, 2, this.height+this.vHeight);
		ctx.fillRect(this.x+this.width-2, this.y-this.vHeight, 2, this.height+this.vHeight);
		ctx.fillRect(this.x, this.y+this.height-2, this.width, 2);
		ctx.fillRect(this.x, this.y-this.vHeight, this.width, 2);
		ctx.fillRect(this.x, this.y+this.height-this.vHeight, this.width, 2);
		}
	}
	this.drawShadow = function()
	{
		ctx.fillStyle = "rgba(15,165, 65, 1)";
		ctx.fillRect(this.x-3, this.y-3, this.width + 6, this.height + 6);		
	}
}
function diagonalWall(_x, _y, _x2, _y2)
{
	platform.call(this, _x, _y, 10, 10);
	this.type = "d";
	this.point1 = {
		x: _x,
		y: _y
	}
	this.point2 = {
		x: _x2,
		y: _y2
	}
	if (_x > _x2)
	{
		this.width = _x - _x2;
	}
	else
	{
		this.width = _x2 - _x;
	}
	if (_y > _y2)
	{
		this.height = _y - _y2;
	}
	else
	{
		this.height = _y2 - _y;
	}
	this.draw = function()
	{	
		ctx.beginPath();
		ctx.moveTo(this.point1.x, this.point1.y);
		ctx.lineTo(this.point2.x, this.point2.y);
		ctx.closePath();
		ctx.strokeStyle = 'blue';
		ctx.stroke();
	}
}