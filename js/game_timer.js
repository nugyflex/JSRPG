//An object that has multiple methods, but has the core task of keeping the game1.time in both milliseconds and seconds.
function gameTimer(){
	this.mTime = 0;
	this.milliTime = 0;
	this.paused = 0;
	this.time = 0;
	this.speed = 1;
	//Pause the timer, used for when the game itself is paused so that players cannot pause the game, wait for their cool-downs to finish, and then resume
	this.pause = function(){
		this.paused = 1;
	}
	//Resumes after pausing
	this.resume = function(){
		this.paused = 0;
	}
	//Core method, this is what keeps the game1.time. The game loop runs every 10ms, so the timer goes up every 1000/10 milliseconds, as this is one second. There is
	//also the millisecond timer for skill cool-downs, which often have 2.5 second cool-downs or other decimals.
	this.timer = function(){
		if (this.paused == 0){
			if (this.mTime >= 90 / this.speed){
				this.time += 1;
				this.mTime = 0;
			}
			this.milliTime++;
			this.mTime++;
		}
	}
	//Method for returning the game1.time in seconds and milliseconds
	this.getTime = function(){
		return this.milliTime/90;
	}
	//Restart the timer, mostly for testing purposes
	this.reset = function(){
		this.time = 0;
	}
	//Can speed up the timer, allowing for certain game1.time-related power-ups such as reduced cool-down game1.time
	this.changeSpeed = function(mult){
		this.speed = mult;
	}
}
//Very important function for returning true if a period of game1.time has elapsed, used in the cool-down of all skills and also in regulating console logging
function timeElapse(curTime, max){
	if (game1.time.milliTime/90 - curTime >= max){
		return true;
	}
	else {
		return false;
	}
}