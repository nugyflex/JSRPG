//Spider Enemy
function enemy(_x, _y)
{
    this.x = _x;
    this.y = _y;
    this.xvel = 0;
    this.yvel = 0;
    this.width = 10;
    this.height = 10;
    this.nextPoint = 0;
    this.vel = 0.65;
    this.velDefault = this.vel;
    this.health = 10;
    this.currentSheet;
    this.fheight = 0;
    this.fwidth = 0;
    this.fn = 0;
    this.freset = false;
    this.currentSheetName;
    this.lastDir;
    this.foffsetx = 0;
    this.foffsety = 0;
    this.fs = 0;
    this.vheight = 0;
    this.vyvel = 0;
    this.calcNewPos = function()
    {
        this.x+=this.xvel;
        this.y+=this.yvel;
    }
    this.update = function()
    {
		this.ai(player1);
		this.calcNewPos();
    }
        this.ai = function(player)
        {
			var distfromplayer = collisionDetection.finddistance(this, player);
				this.theta = Math.atan(-(player.y - this.y) / (player.x - this.x));
				if (player.x > this.x) {
				   this.yvel = Math.sin(this.theta) * -this.vel;
				   this.xvel = Math.cos(this.theta) * this.vel;
				}
				else {
					this.yvel = Math.sin(this.theta) * this.vel;
					this.xvel = Math.cos(this.theta) * -this.vel;
				}
			//adding the velosity to the x/y position   
			this.x = this.x + this.xvel;
			this.y = this.y + this.yvel;
			if (distfromplayer < 70 && distfromplayer > 10 && this.vheight == 0)
			{
				this.vyvel = -4;
			}
			else
			{	      
				this.vel = this.velDefault;
			}
			if (this.vheight != 0){
				this.vel = 1.4;
			}
        }
        this.draw = function()
        {
            this.vyvel+=0.3;
            this.vheight += this.vyvel;
            if (this.vheight > 0)
            {
                this.vheight = 0;
            }
            if (this.yvel > 0)
            {
                this.changeAnimation("down");
            }
            else if (this.yvel < 0)
            {
				this.changeAnimation("up");
			}
			else
			{
				this.changeAnimation("down");
			}
			this.runAnimations();
		}
		this.changeAnimation = function(x)
        {
            if (x !== this.currentSheetName)
            {
                switch (x)
				{
                    case "down":
					this.currentSheet = spiderdown;
                    this.fn = 2;
                    this.fwidth = 20;
					this.fheight = 14;
                    this.freset = false;
                    this.fs = 6;
                    break;
                case "up":
                    this.currentSheet = spiderup;
                    this.fn = 2;
                    this.fwidth = 20;
                    this.fheight = 14;
                    this.freset = false;
                    this.fs = 6;
                    break;
                }                               
            this.currentSheetName = x;
            this.frame = 0;
            this.timer = 1;
            }
        }
        this.runAnimations = function()
        {
			this.timer++;
            if (this.timer>this.fs)
            {
				this.timer = 0
            }
            if (this.timer == 0 && this.vheight == 0)
            {
                this.frame++;
            }
            if (this.frame > this.fn-1)
            {
				if (this.freset == true)
				{
					this.changeAnimation("default");
					this.inAction = false;
				}
				this.frame = 0;
            }
            ctx.beginPath();
            ctx.arc(this.x + this.width/2 + 5, this.y + this.height/2 + 5, this.vheight/-10 + 6, 0, 2 * Math.PI, false);
            ctx.fillStyle = "rgba(0,0,0,0.25)"
            ctx.fill();
            ctx.drawImage(this.currentSheet, this.frame * this.fwidth, 0, this.fwidth, this.fheight, this.x + this.foffsetx, this.y + this.vheight + this.foffsety, this.fwidth, this.fheight)
        }
}
//Skull Enemy
function skull(_x, _y)
{
    this.x = _x;
    this.y = _y;
    this.xvel = 0;
    this.yvel = 0;
    this.width = 10;
    this.height = 10;
    this.nextPoint = 0;
    this.vel = 0.65;
    this.velDefault = this.vel;
    this.health = 10;
    this.currentSheet = skulldown;
    this.fheight = 0;
    this.fwidth = 0;
    this.fn = 0;
    this.freset = false;
    this.currentSheetName;
    this.lastDir;
    this.foffsetx = 0;
    this.foffsety = 0;
    this.fs = 0;
    this.vheight = 0;
    this.vyvel = 0;
	this.theta = 0;
    this.calcNewPos = function()
    {
        this.x+=this.xvel;
        this.y+=this.yvel;
    }
    this.update = function()
    {
		this.ai(player1);
		this.calcNewPos();
    }
        this.ai = function(player)
        {
			var distfromplayer = collisionDetection.finddistance(this, player);
				this.theta = Math.atan(-(player.y - this.y) / (player.x - this.x));
				if (player.x > this.x) {
				   this.yvel = Math.sin(this.theta) * -this.vel;
				   this.xvel = Math.cos(this.theta) * this.vel;
				}
				else {
					this.yvel = Math.sin(this.theta) * this.vel;
					this.xvel = Math.cos(this.theta) * -this.vel;
				}
			//adding the velosity to the x/y position   
			this.x = this.x + this.xvel;
			this.y = this.y + this.yvel;
			if (distfromplayer < 70 && distfromplayer > 10 && this.vheight == 0)
			{

			}
			else
			{	      
				this.vel = this.velDefault;
			}
			if (this.vheight != 0){
				this.vel = 1.4;
			}
        }
        this.draw = function()
        {
            this.vyvel+=0.3;
            this.vheight += this.vyvel;
            if (this.vheight > 0)
            {
                this.vheight = 0;
            }
            if (this.yvel > Math.abs(this.xvel))
            {
				this.changeAnimation("down");
			}
            if (this.yvel < -1*Math.abs(this.xvel))
            {
				this.changeAnimation("up");
			}
            if (this.xvel > Math.abs(this.yvel))
            {
				this.changeAnimation("right");
			}
            if (this.xvel < -1*Math.abs(this.yvel))
            {
				this.changeAnimation("left");
			}

			this.runAnimations();
			//ctx.fillStyle = "black";
			//ctx.fillRect(this.x, this.y, this.width, this.height);
		}
		this.changeAnimation = function(x)
        {
            if (x !== this.currentSheetName)
            {
                switch (x)
				{
                    case "down":
					this.currentSheet = skulldown;
                    this.fn = 4;
                    this.fwidth = 24;
					this.fheight = 42;
                    this.freset = false;
                    this.fs = 6;
					this.foffsetx = -2;
					this.foffsety = -32;
                    break;
                case "up":
                    this.currentSheet = skullup;
                    this.fn = 4;
                    this.fwidth = 24;
                    this.fheight = 42;
                    this.freset = false;
                    this.fs = 6;
					this.foffsetx = -12;
					this.foffsety = -32;
                    break;
                case "right":
                    this.currentSheet = skullright;
                    this.fn = 4;
                    this.fwidth = 24;
                    this.fheight = 42;
                    this.freset = false;
                    this.fs = 6;
					this.foffsetx = -6;
					this.foffsety = -32;
                    break;
                case "left":
                    this.currentSheet = skullleft;
                    this.fn = 4;
                    this.fwidth = 24;
                    this.fheight = 42;
                    this.freset = false;
                    this.fs = 6;
					this.foffsetx = -10;
					this.foffsety = -32;
                    break;
                }                               
            this.currentSheetName = x;
            this.frame = 0;
            this.timer = 1;
            }
        }
        this.runAnimations = function()
        {
			this.timer++;
            if (this.timer>this.fs)
            {
				this.timer = 0
            }
            if (this.timer == 0 && this.vheight == 0)
            {
                this.frame++;
            }
            if (this.frame > this.fn-1)
            {
				if (this.freset == true)
				{
					this.changeAnimation("default");
					this.inAction = false;
				}
				this.frame = 0;
            }
            ctx.beginPath();
            ctx.arc(this.x + this.width/2 + 5, this.y + this.height/2 + 5, this.vheight/-10 + 6, 0, 2 * Math.PI, false);
            ctx.fillStyle = "rgba(0,0,0,0.25)"
            ctx.fill();
            ctx.drawImage(this.currentSheet, this.frame * this.fwidth, 0, this.fwidth, this.fheight, this.x + this.foffsetx, this.y + this.vheight + this.foffsety, this.fwidth, this.fheight)
        }
}