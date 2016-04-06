function button(x, y, width, height, text, colour, textColour, buttonType)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.colour = colour;
	this.textColour = textColour;
	this.textSize = 30;
	this.textOffsetx = 5;
	this.textOffsety = 5;
	this.buttonType = buttonType;
	if (this.colour == "default")
	{
		this.colour = "rgb(50,60,200)";
	}
		if (this.textColour == "default")
	{
		this.textColour = "rgb(255,255,255)";
	}
	this.draw = function()
	{
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.font = this.textSize + "px Georgia";
		ctx.fillStyle = "rgb(255,255,255)";//this.textColour;
		ctx.fillText("asd", this.x + this.textOffsetx, this.y + this.textOffsety + this.textSize);
	}
}