function grass(_x, _y)
{
	this.colidable = false;
	this.x = _x;
	this.y = _y;
	this.height = 20;
	this.width = 20;
	this.draw = function()
	{
		ctx.drawImage(grass1, this.x, this.y);
	}
}