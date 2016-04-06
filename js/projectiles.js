function projectile(type_, x_, y_)
{
	type = type_;
	this.x = x_;
	this.y = y_;
	this.damage = 0;
	this.width = 10;
	this.height = 10;
	this.xVel = 0;
	this.yVel = 0;
	this.colour = "red";
	if (this.type = "fireBall")
	{
		this.damage = 10;
		this.width = 10;
		this.height = 10;
		this.colour = "orange";
	}
	this.calcNewPos = function()
	{
		this.x+=this.xVel;
		this.y+=this.yVel;
	}
	this.draw = function()
	{
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
	this.update = function()
	{
		this.calcNewPos();
	}
}