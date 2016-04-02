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
function enemies() {
    this.count = function () {
        return this.array.length;
    }
    this.array = [];
    this.add = function (x, y) {
        var i = this.count();
            this.array[i] = new enemy(x, y);
    }
	this.update = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			this.array[i].update();
		}
	}
	this.draw = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			this.array[i].draw();
		}		
	}
    this.remove = function (index) {
        var initialcount = this.array.length;
        for (i = index; i < initialcount; i++) {

            if (i < initialcount - 1) {
                this.array[i] = this.array[i + 1];
                this.array[i].index = this.array[i].index - 1;
            }
            if (i == initialcount - 1) {
                this.array.length = this.array.length - 1;
            }

        }
    }
}
function projectiles() {
    this.count = function () {
        return this.array.length;
    }
    this.array = [];
    this.add = function (type, x, y) {
        var i = this.count();
            this.array[i] = new projectile(type, x, y);
			this.array[i].xVel = 1;
			this.array[i].yVel = 1;
    }
	this.update = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			this.array[i].update();
		}
	}
	this.draw = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			this.array[i].draw();
		}		
	}
    this.remove = function (index) {
        var initialcount = this.array.length;
        for (i = index; i < initialcount; i++) {

            if (i < initialcount - 1) {
                this.array[i] = this.array[i + 1];
                this.array[i].index = this.array[i].index - 1;
            }
            if (i == initialcount - 1) {
                this.array.length = this.array.length - 1;
            }

        }
    }
}
function platforms() {
    this.count = function () {
        return this.array.length;
    }
    this.array = [];
    this.add = function (x, y, width, height, type) {
        var i = this.count();
		if (type == "diagonalWall")
		{
			this.array[i] = new diagonalWall(x, y, width, height);
		}
		else
		{
		if (type == "pillar")
		{
			this.array[i] = new pillar(x, y);
		}
		else
		{
            this.array[i] = new platform(x, y, width, height);
		}
		}
	}
	this.update = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			this.array[i].update();
		}
	}
	this.drawShadows = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			this.array[i].drawShadow();
			console.log("Asd");
		}		
	}
    this.remove = function (index) {
        var initialcount = this.array.length;
        for (i = index; i < initialcount; i++) {

            if (i < initialcount - 1) {
                this.array[i] = this.array[i + 1];
                this.array[i].index = this.array[i].index - 1;
            }
            if (i == initialcount - 1) {
                this.array.length = this.array.length - 1;
            }

        }
    }
}

function fires() {
    this.count = function () {
        return this.array.length;
    }
    this.array = [];
    this.add = function (type, x, y) {
        var i = this.count();
            this.array[i] = new fire(type, x, y);
    }
	this.update = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			this.array[i].update();

		}
		for (i = 0; i < this.count(); i++)
		{
			if (this.array[i].timer > 60 - this.array[i].size)
			{
				this.remove(i);
				i--;
			}
	}
	}
	this.draw = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			if (this.array[i].type == 1)
			{
			this.array[i].draw();
			}
		}
		for (i = 0; i < this.count(); i++)
		{
			if (this.array[i].type == 2)
			{
			this.array[i].draw();
			}
		}
		for (i = 0; i < this.count(); i++)
		{
			if (this.array[i].type == 3)
			{
			this.array[i].draw();
			}
		}		
		for (i = 0; i < this.count(); i++)
		{
			if (this.array[i].type == 4)
			{
			this.array[i].draw();
			}
		}		
	}
    this.remove = function (index) {
        var initialcount = this.array.length;
        for (i = index; i < initialcount; i++) {

            if (i < initialcount - 1) {
                this.array[i] = this.array[i + 1];
                this.array[i].index = this.array[i].index - 1;
            }
            if (i == initialcount - 1) {
                this.array.length = this.array.length - 1;
            }

        }
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
var walkright = new Image();
walkright.src = './Images/walk_right.png';
var walkdown = new Image();
walkdown.src = './Images/walk_down.png';
var swordswing = new Image();
swordswing.src = './Images/sword_swing.png';
var swordstab = new Image();
swordstab.src = './Images/sword_stab.png';
var standing = new Image();
standing.src = './Images/standing_sword.png';
function Player(_x, _y)
{
	this.x = _x;
	this.y = _y;
	this.width = 20;
	this.height = 20;
	this.xVel = 0;
	this.yVel = 0;
	this.frame = 0;
	this.timer = 0;
	this.xlatch = true;
	this.update = function()
	{
		this.inputs();
		this.calcNewPos();
		if (keypressed.mouse)
		{
			this.shoot();
		}
		this.onGround = false;
	}
	this.calcNewPos = function()
	{
		this.x += this.xVel;
		this.y += this.yVel;
	}

	this.draw = function()
	{
		//ctx.fillStyle = "white";
		//ctx.fillRect(this.x, this.y-50, this.width, this.height+50);
		this.timer++;
		if (this.timer>4)
		{
			this.timer = 0
		}
		if (this.timer == 2)
		{
			this.frame++;
		}
		if (this.frame<6)
		{
			if (keypressed.z)
			{
				ctx.drawImage(swordstab, this.frame * 19, 0, 19, 24, this.x, this.y, 19, 24);
			}
			else
			{
			ctx.drawImage(swordswing, this.frame * 21, 0, 21, 24, this.x, this.y, 21, 24);
			}
		}
		else
		{
			ctx.drawImage(standing, this.x, this.y);
		}
		if (keypressed.x)
		{
			if (this.xlatch)
			{
				this.frame = 0;
			}
			this.xlatch = false
		}
		else
		{
			this.xlatch = true;
		}
	}
	this.shoot = function()
	{
		
	}
	this.inputs = function()
	{
		this.xVel = 0;
		this.yVel = 0;
		if (keypressed.w )
		{
			this.yVel = -2;
		}
		else
		{
			this.jumpLatch = true;
		}
		if (keypressed.a)
		{
			this.xVel = -2;
		}	
		if (keypressed.s)
		{
			this.yVel = 2;
		}
		if (keypressed.d)
		{
			this.xVel = 2;
		}		
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
	this.vel = 1;
	this.health = 110;
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
		this.calcNewPos();
	}
	this.draw = function()
	{
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = "white";
		ctx.fillRect(this.x, this.y-20, this.health, 10);	
	}
}
function platform(_x, _y, _width, _height)
{
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.type;
	this.update = function()
	{
		
	}
	this.draw = function()
	{
		ctx.fillStyle = "grey";
		ctx.fillRect(this.x, this.y-40, this.width, 40 + this.height);
		ctx.fillStyle = "rgb(100, 100, 100)";
		ctx.fillRect(this.x, this.y-40, this.width, this.height);
		ctx.fillStyle = "rgb(80, 80, 80)";
		ctx.fillRect(this.x, this.y-40, 2, this.height+40);
		ctx.fillRect(this.x+this.width-2, this.y-40, 2, this.height+40);
		ctx.fillRect(this.x, this.y+this.width-2, this.width, 2);
		ctx.fillRect(this.x, this.y-40, this.width, 2);
		ctx.fillRect(this.x, this.y+this.width-40, this.width, 2);
	}
	this.drawShadow = function()
	{
		ctx.fillStyle = "rgba(15,165, 65, 1)";
		ctx.fillRect(this.x-3, this.y-3, this.width + 6, this.height + 6);		
	}
}
function pillar(_x, _y)
{
	platform.call(this, _x, _y, 10, 10);
	this.draw = function()
	{
		ctx.fillStyle = "grey";
		ctx.fillRect(this.x, this.y-100, 10, 110);
		ctx.fillStyle = "rgb(100, 100, 100)";
		ctx.fillRect(this.x, this.y-100, 10, 10);
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
		this.x = object.x + object.xVel;
		this.y = object.y + object.yVel;
	}
	this.setTranslate = function()
	{
		Game.canvastranslatex = this.x - Math.floor(c.width/2);
		Game.canvastranslatey = this.y - Math.floor(c.height/2);
	}
}
    var fps = 60;
    function draw() {
        setTimeout(function () {
            requestAnimationFrame(draw);
		ctx.translate(Game.canvastranslatex * -1, Game.canvastranslatey * -1);
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
pillar.prototype = Object.create(platform.prototype);
diagonalWall.prototype = Object.create(platform.prototype);
collisionDetection = new collisiondetection();
Renderer = new renderer();
enemyCollection = new enemies();
platformCollection = new platforms();
platformCollection.add(100, 100, 100, 100, 0);
platformCollection.add(100, 100, 100, 100, 0);
platformCollection.add(0, 500, 74, 6, 0);
platformCollection.add(74, 500, 74, 6, 0);
platformCollection.add(148, 500, 74, 6, 0);
platformCollection.add(260, 500, 0, 0, "pillar");
enemyCollection.add(0,0);
projectileCollection = new projectiles();
projectileCollection.add("fireBall", 30, 30);
player1 = new Player(10, 10);
collisionDetection = new collisiondetection();
fireCollection = new fires();
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