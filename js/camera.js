function camera(_x, _y)
{
	this.x = _x;
	this.y = _y;
	this.follow = function(object)
	{
        this.theta = Math.atan(-(object.y - game.canvastranslatey) / ((object.x - c.width / 2) - game.canvastranslatex));
        if (this.x < object.x) {
            this.xvel = (object.x - this.x) / 25;
        }
        if (this.x > object.x) {
            this.xvel = (this.x - object.x) / -25;
        }
        if (this.y < object.y) {
            this.yvel = ((object.y - 10) - this.y) / 15;
        }
        if (this.y > object.y) {
            this.yvel = (this.y - (object.y - 10)) / -15;
        }
        //adding the velosity to the x/y position    
        this.x = this.x + this.xvel;
        this.y = this.y + this.yvel;
	}
	this.setTranslate = function()
	{
		Game.canvastranslatex = Math.floor(this.x) - Math.floor(c.width/2);
		Game.canvastranslatey = Math.floor(this.y) - Math.floor(c.height/2);
	}
}