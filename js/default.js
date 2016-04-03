//setting up the canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
c.tabIndex = 1;
c.focus();
//loading in all the images
c.addEventListener("keydown", onKeyDown, true);
c.addEventListener("keyup", onKeyUp, true);
c.addEventListener("mousedown", mouseDown, true);
c.addEventListener("mouseup", mouseUp, true);
c.width = window.innerWidth-50;
c.height = window.innerHeight-50;
var mouse =
    {
        X: 0,
        Y: 0
    }
window.onmousemove = function (e) {
    var bbox = c.getBoundingClientRect();

    mouse.X = e.clientX - bbox.left * (c.width / bbox.width) - 10;
    mouse.Y = e.clientY - bbox.top * (c.height / bbox.height) - 10;
}
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
function game(){
	this.pointArray = [];
	this.paused = false;
	this.canvastranslatex = 0;
	this.canvastranslatey = 0;
	this.addToPointArray = function(_x, _y)
	{
		this.pointArray[this.pointArray.length] = new Point(_x, _y);
	}
	this.exit = new Point (10000, 10000);
	this.addExitToArray = function()
	{
		this.addToPointArray(this.exit.x, this.exit.y);
	}
}
Game = new game;
function Point(_x, _y)
{
	this.x = _x;
	this.y = _y;
}


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
	this.health = 110;
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
	this.moveToPoint = function(_point)
	{
		this.theta = Math.atan(-(_point.y - this.y) / (_point.x - this.x));
        if (_point.x > this.x) {
            this.yvel = Math.sin(this.theta) * -this.vel;
            this.xvel = Math.cos(this.theta) * this.vel;
        }
        else {
            this.yvel = Math.sin(this.theta) * this.vel;
            this.xvel = Math.cos(this.theta) * -this.vel;
        }
	}
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
		if (collisionDetection.finddistance(this, player) < 40 && this.vheight == 0)
		{
			this.vyvel = -2;
		}
	}
	this.draw = function()
	{
		this.vyvel+=0.05;
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
		console.log(this.fs + "," + this.timer);
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
		//if (this.vheight < 0)
		//{
			//ctx.fillRect(this.x, this.y, 10, 10);
			ctx.beginPath();
			ctx.arc(this.x + this.width/2 + 5, this.y + this.height/2 + 5, this.vheight/-10 + 6, 0, 2 * Math.PI, false);
			ctx.fillStyle = "rgba(0,0,0,0.25)"
			ctx.fill();
		//}
		ctx.drawImage(this.currentSheet, this.frame * this.fwidth, 0, this.fwidth, this.fheight, this.x + this.foffsetx, this.y + this.vheight + this.foffsety, this.fwidth, this.fheight)
	}
}
function platform(_x, _y, _width, _height, image, ioffsetx, ioffsety)
{
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.type;
	this.image = image;
	this.ioffsetx = ioffsetx;
	this.ioffsety = ioffsety;
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
		ctx.fillRect(this.x, this.y-40, this.width, 40 + this.height);
		ctx.fillStyle = "rgb(100, 100, 100)";
		ctx.fillRect(this.x, this.y-40, this.width, this.height);
		ctx.fillStyle = "rgb(80, 80, 80)";
		ctx.fillRect(this.x, this.y-40, 2, this.height+40);
		ctx.fillRect(this.x+this.width-2, this.y-40, 2, this.height+40);
		ctx.fillRect(this.x, this.y+this.height-2, this.width, 2);
		ctx.fillRect(this.x, this.y-40, this.width, 2);
		ctx.fillRect(this.x, this.y+this.height-40, this.width, 2);
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
    var fps = 60;
    function draw() {
        setTimeout(function () {
            requestAnimationFrame(draw);
		ctx.translate(Game.canvastranslatex * -1, Game.canvastranslatey * -1);
		ctx.clearRect(-10000, -10000,100000,100000);
		ctx.fillStyle = "rgba(50,200,100, 1)";
		ctx.fillRect(-10000, -10000,100000,100000);
		for (i = 0; i < platformCollection.count(); i++)
		{
			collisionDetection.stopplayer(player1, platformCollection.array[i]);
		}
		platformCollection.drawShadows();
		Renderer.execute();
		ctx.translate(Game.canvastranslatex, Game.canvastranslatey);
		Camera.follow(player1);
		Camera.setTranslate();
        }, 1000 / fps);
    }
diagonalWall.prototype = Object.create(platform.prototype);
collisionDetection = new collisiondetection();
Renderer = new renderer();
sceneryCollection = new scenery();
for (i=0;i<20;i++)
{
sceneryCollection.add(Math.floor(Math.random()*500), Math.floor(Math.random()*500), 0, 0, "grass");
}
enemyCollection = new enemies();
platformCollection = new platforms();
platformCollection.add(300, 100, 100, 100, "box50x50");
platformCollection.add(100, 100, 100, 100, 0);
platformCollection.add(0, 500, 74, 6, 0);
platformCollection.add(74, 500, 74, 6, 0);
platformCollection.add(148, 500, 74, 6, 0);
enemyCollection.add(0,0);
enemyCollection.add(400,0);
enemyCollection.add(0,400);
enemyCollection.add(400,400);
projectileCollection = new projectiles();
projectileCollection.add("fireBall", 30, 30);
player1 = new Player(10, 10);
collisionDetection = new collisiondetection();
fireCollection = new fires();
enemyCollection.add(0,0);
Game.addExitToArray();
var cheight = c.height;
var keypressed =
{
    w: false,
    s: false,
    a: false,
    d: false,
    space: false,
    z: false,
    shootcooldown: false,
    x: false,
    e: false,
    f: false,
    mouse: false,
    k: false,
    q: false,
    r: false
};
platformside = {
	bottom: 1,
	top: 2,
	left: 3,
	right: 4
}
draw()
Camera = new camera(0,0);
setInterval(gameLoop, 15);
function gameLoop() {
	if (!Game.paused)
	{

		enemyCollection.update();
		player1.update();
		projectileCollection.update();

	}
}