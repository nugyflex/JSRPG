//An object that has multiple methods, but has the core task of keeping the game1.time in both milliseconds and seconds.
function gameTimer(game, loopSpeed){
	this.mTime = 0;
	this.milliTime = 0;
	this.paused = 0;
	this.time = 0;
	this.speed = 1;
	this.dayTime = 0;
	this.days = 0;
	this.nightAlphaMax = 0.95;
	this.nightAlpha = 0;
	this.sunPos = {x: 0, y: -50000, z: 0};
	this.sunMaxX = 50000;
	this.sunMaxZ = 50000;
	//Proportions based roughly on the idea that we have about 3 hours of dusk (partial sun), which is 1/8 of the day
	this.sunTiming = {day: 3/8, night: 3/8, trans: 2/8};
	this.sunTiming.trans /= 2;
	this.dayState = 'night';
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
			if (this.getDayTime() <= game.dayLength * this.sunTiming.night){
				//night time
				this.nightAlpha = this.nightAlphaMax;
				this.dayState = 'night';
			}
			else if (this.getDayTime() >= game.dayLength * this.sunTiming.night && this.getDayTime() <= game.dayLength * this.sunTiming.night + game.dayLength * this.sunTiming.trans){
				//transition from night to day
				this.nightAlpha = (1 - (this.getDayTime() - game.dayLength * this.sunTiming.night)/(game.dayLength * this.sunTiming.trans)) * this.nightAlphaMax;
				this.dayState = 'trans';
			}
			else if (this.getDayTime() >= game.dayLength * (1 - this.sunTiming.trans)){
				//transition from day to night
				this.nightAlpha = (this.getDayTime() - (game.dayLength - game.dayLength * this.sunTiming.trans))/(game.dayLength * this.sunTiming.trans) * this.nightAlphaMax;
				this.dayState = 'trans';
			}
			else {
				//day time
				this.nightAlpha = 0;
				this.dayState = 'day';
			}
			if (this.getDayTime() >= game.dayLength * this.sunTiming.night){
				//console.log( 'psihdif');
				//add and then subtract 50,000 to allow us a negative portion of the sun's x position
				this.sunPos.x = (this.getDayTime() - game.dayLength * this.sunTiming.night) / (game.dayLength - game.dayLength * this.sunTiming.night) * this.sunMaxX * 2 - this.sunMaxX;
				if (this.getDayTime() - game.dayLength * this.sunTiming.night <= (game.dayLength - game.dayLength * this.sunTiming.night) / 2){
					this.sunPos.z = (this.getDayTime() - game.dayLength * this.sunTiming.night) / ((game.dayLength - game.dayLength * this.sunTiming.night) / 2) * this.sunMaxZ;
				}
				else {
					this.sunPos.z = (1 - (this.getDayTime() - game.dayLength * this.sunTiming.night - (game.dayLength - game.dayLength * this.sunTiming.night) / 2) / ((game.dayLength - game.dayLength * this.sunTiming.night) / 2)) * this.sunMaxZ;
				}
			}
			else {
				this.sunPos.x = 0;
				this.sunPos.z = 0;
			}
			this.sunPos.x *= -1;
			//console.log(this.getDayTime());
			console.log(Math.floor(this.sunPos.x), this.sunPos.y, this.sunPos.z);
			/*
			if (this.getDayTime() == 0 || this.getDayTime() / game.dayLength <= 1 / 3){
				if (this.getDayTime() == 0){
					this.nightAlpha = this.nightAlphaMax;
				}
				else {
					this.nightAlpha = (1 - this.getDayTime() / (game.dayLength * 1 / 3)) * this.nightAlphaMax;
					console.log('tick');
				}
			}
			else if (this.getDayTime() / game.dayLength >= 2/3){
				this.nightAlpha = (this.getDayTime() - game.dayLength * 2 / 3) / (game.dayLength * 1 / 3) * this.nightAlphaMax;
				console.log('tick');
			}
			else {
				this.nightAlpha = 0;
			}
			if (this.mTime >= (1000/loopSpeed) / this.speed){
				this.time += 1;
				
				this.mTime = 0;
			}
			if (this.getDayTime() == 0){
				this.sunPos.x = -50000;
				this.sunPos.z = 0;
			}
			else {
				this.sunPos.x = this.getDayTime() / game.dayLength * 100000 - 50000;
				if (this.getDayTime() / game.dayLength  <= 1 / 2){
					this.sunPos.z = this.getDayTime() / (game.dayLength * 1 / 2) * 100000;
				}
				else {
					this.sunPos.z = (1 - (this.getDayTime() - game.dayLength * 1 / 2) / (game.dayLength * 1 / 2)) * 100000
				}
			}
			*/
			this.milliTime++;
			this.dayTime++;
			this.mTime++;
			if (this.getDayTime() >= game.dayLength){
				this.dayTime = 0;
				this.days++;
			}
		}
	}
	//Method for returning the game1.time in seconds and milliseconds
	this.getTime = function(){
		return this.milliTime / (1000 / loopSpeed);
	}
	this.getDayTime = function(){
		return this.dayTime / (1000 / loopSpeed);
	}
	//Restart the timer, mostly for testing purposes
	this.reset = function(){
		this.time = 0;
	}
	//Can speed up the timer, allowing for certain game1.time-related power-ups such as reduced cool-down game1.time
	this.changeSpeed = function(mult){
		this.speed = mult;
	}
	this.timeElapse = function(curTime, max){
		if (this.milliTime / (1000 / loopSpeed) - curTime >= max){
			return true;
		}
		else {
			return false;
		}
	}
}

