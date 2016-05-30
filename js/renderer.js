function thing(index, type, y, height)
{
	this.index = index;
	this.height = height;
	this.type = type;
	this.y = y;
	this.drawn = false;
}
function renderer() {
	this.drawarray = [];
    this.count = function () {
        return this.drawarray.length;
    }
    this.add = function (index, type, y, height) {
        var i = this.count();
        this.drawarray[i] = new thing(index, type, y, height);
    }
	this.drawShadows = function(){
		if (gameTime.dayState != 'night'){
			for (s = 0; s < platformCollection.array.length; s++){
				sun.castShadows(platformCollection.array[s]);
				var ts = platformCollection.array[s].shadow;
				//ctx.strokeStyle = 'red';
				ctx.beginPath();
				ctx.moveTo(ts[0].x, ts[0].y);
				for (t = 1; t < ts.length; t++){
					ctx.lineTo(ts[t].x, ts[t].y);
				}
				//ctx.stroke();
				//ctx.fillStyle = 'rgba(0, 0, 0, ' + platformCollection.array[s].shadowAlpha + ')';
				ctx.fillStyle = 'black';
				ctx.fill();
			}
		}
	}
    this.draw = function () {
        var currentmin;
        var currentmini;
		
        for (i = 0; i < this.drawarray.length  ; i++) {
			
            currentmin = 1000000000;
            currentmini = -1;
            for (drawcounter = 0; drawcounter < this.drawarray.length ; drawcounter++) {
                if (this.drawarray[drawcounter].y + this.drawarray[drawcounter].height < currentmin && this.drawarray[drawcounter].drawn == false) {
                    currentmin = this.drawarray[drawcounter].y + this.drawarray[drawcounter].height;
                    currentmini = drawcounter;
                }
            }
            if (currentmini > -1) {
                switch (this.drawarray[currentmini].type) {
                    case "platform":
						if (debug == 1){
							platformCollection.array[this.drawarray[currentmini].index].draw();
						}
						else {
							platformCollection.array[this.drawarray[currentmini].index].draw();
						}						
                        break;						

                    case "projectile":
                        projectileCollection.array[this.drawarray[currentmini].index].draw();
                        break;

                    case "explosion":
                        explosioncollection.array[this.drawarray[currentmini].index].draw();
                        break;

                    case "miscobject":
                        miscobjectcollection.array[this.drawarray[currentmini].index].draw();
                        break;
						
                    case "scenery":
                        sceneryCollection.array[this.drawarray[currentmini].index].draw();
                        break;
						
                  case "enemy":
                        enemyCollection.array[this.drawarray[currentmini].index].draw();
                        break;
						
                  case "blood":
                        bloodCollection.array[this.drawarray[currentmini].index].draw();
                        break;
						
				  case "player":
						player1.draw();
						break;

                }

                this.drawarray[currentmini].drawn = true;
            }
        }

    }
    this.finish = function () {
        //remove everything from the array, called at end of draw thing
        this.drawarray.length = 0;
    }
    this.load = function () {
        for (i = 0; i < platformCollection.count(); i++) {
            this.add(i, "platform", platformCollection.array[i].y, platformCollection.array[i].height);
        }
        for (i = 0; i < projectileCollection.count(); i++) {
            this.add(i, "projectile", projectileCollection.array[i].y, projectileCollection.array[i].height);
        }
        for (i = 0; i < sceneryCollection.count(); i++) {
            this.add(i, "scenery", sceneryCollection.array[i].y, sceneryCollection.array[i].height);
        }
        for (i = 0; i < enemyCollection.count(); i++) {
            this.add(i, "enemy", enemyCollection.array[i].y, enemyCollection.array[i].height);
        }
        for (i = 0; i < bloodCollection.count(); i++) {
			if (bloodCollection.array[i].vheight !== 0)
			{
				this.add(i, "blood", bloodCollection.array[i].y, bloodCollection.array[i].size);
			}
        }
        this.add(i, "player", player1.y, player1.height);
    }
    this.execute = function () {
        this.load();
        this.draw();
        this.finish();
    }
}