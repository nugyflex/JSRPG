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
var walkright = new Image();
walkright.src = './Images/walk_right.png';
var walkdown = new Image();
walkdown.src = './Images/walk_down.png';
var swordswing = new Image();
swordswing.src = './Images/sword_swing.png';
var swordstab = new Image();
swordstab.src = './Images/sword_stab.png';
var standingdown = new Image();
standingdown.src = './Images/standing_sword_down.png';
var standingup = new Image();
standingup.src = './Images/standing_sword_up.png';
var standingleft = new Image();
standingleft.src = './Images/standing_sword_left.png';
var standingright = new Image();
standingright.src = './Images/standing_sword_right.png';
var walkrightsword = new Image();
walkrightsword.src = './Images/walk_right_sword.png';
var walkleftsword = new Image();
walkleftsword.src = './Images/walk_left_sword.png';
var walkdownsword = new Image();
walkdownsword.src = './Images/walk_down_sword.png';
var walkupsword = new Image();
walkupsword.src = './Images/walk_up_sword.png';
var box5050 = new Image();
box5050.src = './Images/scenery/box50x50.png';
var grass1 = new Image();
grass1.src = './Images/scenery/grass1.png';
var halfspin = new Image();
halfspin.src = './Images/half_spin.png';

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
			console.log("ASdasd")
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