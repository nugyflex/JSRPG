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

    mouse.x = e.clientX + Game.canvastranslatex - bbox.left * (c.width / bbox.width) - 10;
    mouse.y = e.clientY + Game.canvastranslatey - bbox.top * (c.height / bbox.height) - 10;
}


function game(){
	this.pointArray = [];
	this.paused = false;
	this.canvastranslatex = 0;
	this.canvastranslatey = 0;
	this.screenShakex = 0;
	this.screenShakey = 0;
	this.shakeIntensity = 0;
	this.shakeDecrementAmount = 0.4;
	this.dayLength = 10;
	this.addToPointArray = function(_x, _y)
	{
		this.pointArray[this.pointArray.length] = new Point(_x, _y);
	}
	this.exit = new Point (10000, 10000);
	this.addExitToArray = function()
	{
		this.addToPointArray(this.exit.x, this.exit.y);
	}
	this.setScreenshake = function(_intensity)
	{
		this.shakeIntensity = _intensity;
	}
	this.manageScreenshake = function()
	{
		this.screenShakex = -this.shakeIntensity/2 + Math.random()*this.shakeIntensity;
		this.screenShakey = -this.shakeIntensity/2 + Math.random()*this.shakeIntensity;		
		this.settleScreenshake();
	}
	this.settleScreenshake = function()
	{
		if (this.shakeIntensity > 0)
		{
			this.shakeIntensity-=this.shakeDecrementAmount;
		}
		else
		{
			this.shakeIntensity+=this.shakeDecrementAmount;
		}
		if (this.shakeIntensity > -this.shakeDecrementAmount && this.shakeIntensity < this.shakeDecrementAmount)
		{
			this.shakeIntensity = 0;
		}
	}
}
Game = new game;
function Point(_x, _y)
{
	this.x = _x;
	this.y = _y;
}

var fps = 60;
var testAlpha = 0;
var dir = 1;
function draw() {
	setTimeout(function () {
		requestAnimationFrame(draw);
		ctx.translate((Game.canvastranslatex) * -1, (Game.canvastranslatey) * -1);
		ctx.clearRect(-10000, -10000,20000,20000);
		ctx.fillStyle = "rgba(50,200,100, 1)";
		ctx.fillRect(-10000, -10000,20000,20000);
		bloodCollection.draw();
		Renderer.execute();
		//Game.manageScreenshake();
		ctx.fillStyle = "rgba(0, 2, 20," + gameTime.nightAlpha + ")";
		ctx.fillRect(-10000, -10000,20000,20000);		
		//ctx.translate(Game.canvastranslatex + Game.screenShakex, Game.canvastranslatey + Game.screenShakey);
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
bloodCollection = new bloods();
//platformCollection.add(300, 100, 100, 100, "box50x50");
platformCollection.add(100, 100, 100, 100, 40, 0);
platformCollection.add(230, 100, 100, 100, 140, 0);
platformCollection.add(80, -30, 20, 100, 140, 0);
platformCollection.add(0, 500, 74, 6, 40, 0);
platformCollection.add(74, 500, 74, 6, 40, 0);
platformCollection.add(148, 500, 74, 6, 40, 0);
platformCollection.add(500, 500, 74*3, 6, 40, 0);
platformCollection.add(-100, 500, 74, 6, 40, 0);
/*enemyCollection.add(0,0);
enemyCollection.add(400,0);
enemyCollection.add(0,400);
enemyCollection.add(400,400);*/
projectileCollection = new projectiles();
projectileCollection.add("fireBall", 30, 30);
player1 = new Player(10, 10);
collisionDetection = new collisiondetection();
fireCollection = new fires();
enemyCollection.add(0,0);
Game.addExitToArray();
var cheight = c.height;

platformside = {
	bottom: 1,
	top: 2,
	left: 3,
	right: 4
}
draw()
Camera = new camera(0,0);
setInterval(gameLoop, 15);

sun = new light(0, -10000, 10000, 0.4);
sun2 = new light(0, 0, 0, 0.4);
debug = 1;

gameTime = new gameTimer(Game, 15);

function gameLoop() {
	gameTime.timer();
	if (!Game.paused)
	{
		//sun.x = mouse.x*100;
		//sun.y = mouse.y*100;
		enemyCollection.update();
		player1.update();
		projectileCollection.update();
		bloodCollection.update();
		for (i = 0; i < platformCollection.count(); i++)
		{
			collisionDetection.stopplayer(player1, platformCollection.array[i]);
		}
		sun.x = gameTime.sunPos.x;
		sun.y = gameTime.sunPos.y;
		sun.z = gameTime.sunPos.z;
		sun2.x = sun.x * -1;
		sun2.y = 30000;
		sun2.z = sun.z;
		//sun.intensity = 1 - gameTime.nightAlpha;
		//if (sun.intensity > 0.5){
		//	sun.intensity = 0.5;
		//}
		//console.log(gameTime.nightAlpha);
	}
	else {
		gameTime.pause();
	}
	
}
function posOnCircle(cx, cy, r, angle){
	angle *= Math.PI/180;
	fx = cx + Math.cos(angle) * r;
	fy = cy + Math.sin(angle) * r;
	
	return {x: fx, y: fy};
}