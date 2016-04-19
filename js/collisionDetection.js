function collisiondetection() {
    
    this.switch1 = 0;


    //tests for collision detection
    this.test1 = function (player, platform) {
        var result = false;
        if (player.x + player.width > platform.x) {
            result = true;

        }
        return result;
    }
	//10010100
    this.test2 = function (player, platform) {
        var result = false;
        if (player.x > platform.x) {
            result = true;
        }
        return result;
    }

    this.test3 = function (player, platform) {
        var result = false;
        if (player.x > platform.x + platform.width) {
            result = true;
        }
        return result;
    }

    this.test4 = function (player, platform) {
        var result = false;
        if (player.x + player.width > platform.x + platform.width) {
            result = true;
        }
        return result;
    }

    this.test5 = function (player, platform) {
        var result = false;
        if (player.y > platform.y) {
            result = true;
        }
        return result;
    }

    this.test6 = function (player, platform) {
        var result = false;
        if (player.y + player.height > platform.y) {
            result = true;
        }
        return result;
    }

    this.test7 = function (player, platform) {
        var result = false;
        if (player.y + player.height > platform.y + platform.height) {
            result = true;
        }
        return result;
    }
    this.test8 = function (player, platform) {
        var result = false;
        if (player.y > platform.y + platform.height) {
            result = true;
        }
        return result;
    }

    this.collision = function (player, platform) {
        var result;
        var testvar = 0;
        if (this.test1(player, platform))
        {
            testvar = testvar + 1;//
        }
        if (this.test2(player, platform)) {
            testvar = testvar + 2;
        }
        if (this.test3(player, platform)) {
            testvar = testvar + 4;
        }
        if (this.test4(player, platform)) {
            testvar = testvar + 8;//
        }
        if (this.test5(player, platform)) {
            testvar = testvar + 16;//
        }
        if (this.test6(player, platform)) {
            testvar = testvar + 32;//
        }
        if (this.test7(player, platform)) {
            testvar = testvar + 64;
        }
        if (this.test8(player, platform)) {
            testvar = testvar + 128;
        }
        if (platform.width == 60) {
        }

        switch (testvar)
        { 

        
            // 0,1,1,1,1,0,0,1=121
            case 121:
                result = platformside.bottom;
                break;

                //0,0,1,0,1,0,0,1=73
            case 73:
                result = platformside.top;
                break;

                //0,1,1,0,1,0,1,1
            case 107:
                result = platformside.right;
                break

                //0,1,1,0,0,0,0,1
            case 97:
                result = platformside.left;
                break;

                //0,0,1,0,0,0,1,1
            case 35:
                result = platformside.top;
                break;

                //0,0,1,1,0,0,0,1
            case 49:
                result = platformside.left;
                break;

                
                //0,0,1,1,1,0,1,1 = 59
                case 59:
            result = platformside.right;
                break;

                //0,1,1,1,0,0,1,1 = 115
            case 115:
                result = platformside.bottom;
                break;
            case 41:
                result = platformside.top;
                break;

                //top left corner
                //0,0,1,0,0,0,0,1
            case 33:
                if ((player.x + player.width) - platform.x > (player.y + player.height) - platform.y) {
                    result = platformside.top;
                }
                else {
                    result = platformside.left;
                }
                break;

                //top right corner
                //0,0,1,0,1,0,1,1 = 43
            case 43:
                if (platform.x + platform.width - player.x > (player.y + player.height) - platform.y) {
                    result = platformside.top;
                }
                else {
                    result = platformside.right;

                }
                break;

                //bottom left corner
                //0,1,1,1,0,0,0,1 = 113
            case 113:
                if (player.x + player.width - platform.x > platform.y + platform.height - (player.y)) {
                    
                    result = platformside.bottom;
                }
                else 
                {
                    result = platformside.left;
                }
                break;

                //bottom right corner
                //0,1,1,1,1,0,1,1 = 123
            case 123: 
                if (platform.x + platform.width - player.x > platform.y + platform.height - (player.y)) {
                    result = platformside.bottom;
                }
                else {
                    result = platformside.right;
                }
                break;
        }


        return result;
    }

    this.collisionrev = function (player, platform) {
        var result;
        var testvar = 0;
        if (this.test1(player, platform)) {
            testvar = testvar + 1;
        }
        if (this.test2(player, platform)) {
            testvar = testvar + 2;
        }
        if (this.test3(player, platform)) {
            testvar = testvar + 4;
        }
        if (this.test4(player, platform)) {
            testvar = testvar + 8;
        }
        if (this.test5(player, platform)) {
            testvar = testvar + 16;
        }
        if (this.test6(player, platform)) {
            testvar = testvar + 32;
        }
        if (this.test7(player, platform)) {
            testvar = testvar + 64;
        }
        if (this.test8(player, platform)) {
            testvar = testvar + 128;
        }
        if (platform.width == 60) {
            console.log(testvar);
        }

        switch (testvar) {


            // 0,1,1,1,1,0,0,1=121
            case 121:
                result = platformside.bottom;
                break;

                //0,0,1,0,1,0,0,1=73
            case 73:
                result = platformside.top;
                break;

                //0,1,1,0,1,0,1,1
            case 107:
                result = platformside.right;
                break

                //0,1,1,0,0,0,0,1
            case 97:
                result = platformside.left;
                break;

                //0,0,1,0,0,0,1,1
            case 35:
                result = platformside.top;
                break;

                //0,0,1,1,0,0,0,1
            case 49:
                result = platformside.left;
                break;


                //0,0,1,1,1,0,1,1 = 59
            case 59:
                result = platformside.right;
                break;

                //0,1,1,1,0,0,1,1 = 115
            case 115:
                result = platformside.bottom;
                break;

                //top left corner
                //0,0,1,0,0,0,0,1
            case 33:
                    result = platformside.topleft;
                    break;

                //top right corner
                //0,0,1,0,1,0,1,1 = 43
            case 43:
                    result = platformside.topright;
                break;

                //bottom left corner
                //0,1,1,1,0,0,0,1 = 113
            case 113:
                    result = platformside.bottomleft;
                break;

                //bottom right corner
                //0,1,1,1,1,0,1,1 = 123
            case 123:
                    result = platformside.bottomright;
                break;
        }


        return result;
    }


    
    this.testcollision = function (object1, object2) {
        this.object1 = object1;
        this.object2 = object2;
         if (object1.x + object1.width > object2.x && object1.x < object2.x + object2.width && object1.y + object1.height > object2.y && object1.y < object2.y + object2.height) {
            return true;
        }
        else {
            return false;
        }
    }
    this.testcollisionenemy = function (object1, object2) {
        this.object1 = object1;
        this.object2 = object2;
        if (object1.x + object1.hitoffsetx + object1.hitwidth > object2.x + object2.hitoffsetx && object1.x + object1.hitoffsetx < object2.x + object2.hitoffsetx + object2.hitwidth && object1.y + object1.hitoffsety + object1.hitheight > object2.y + object2.hitoffsety && object1.y < object2.y + object2.hitoffsety + object2.hitheight) {
            return 1;
        }
        else {
            return 0;
        }
    }
    this.testfeetcollision = function (player, object2) {
        this.player = player;
        this.object2 = object2;
        if (player.x + player.width > object2.x && player.x < object2.x + object2.width && player.y+(player.height-10) + 10 > object2.y && player.y+(player.height-10) < object2.y + object2.height) {
            return 1;
        }
        else {
            return 0;
        }
    }

    //called in the game loop, it stops the player from walking and falling through platforms
    this.stopplayer = function (player, platform) {
        if (this.collision(player, platform) == platformside.left) {
            if (player.xVel > 0) {
                player.xVel = 0;
            }
            player.x = platform.x - player.width;
        }


        if (this.collision(player, platform) == platformside.right) {
            if (player.xvel < 0) {
                player.xVel = 0;
            }
            player.x = platform.x + platform.width;

        }
        if (this.collision(player, platform) == platformside.bottom) {
            if (player.yVel < 0) {
                player.yVel = 0;
            }
            player.y = platform.y + platform.height;
        }
        if (this.collision(player, platform) == platformside.top) {
            if (player.yVel > 0) {
                player.yVel = 0;
            }
            player.y = platform.y - player.height;
			player.onGround = true;
        }
    }
    this.stopplayerrev = function (player, platform) {
        if (this.collisionrev(player, platform) == platformside.left) {
            //console.log("Collision")
            if (player.xvel < 0) {
                player.xvel = 0;
            }

        }
        if (this.collisionrev(player, platform) == platformside.right) {
            //console.log("Collision")
            if (player.xvel > 0) {
                player.xvel = 0;
            }
        }
        if (this.collisionrev(player, platform) == platformside.bottom) {
            //console.log("Collision")
            if (player.yvel > 0) {
                player.yvel = 0;
            }
        }
        if (this.collisionrev(player, platform) == platformside.top) {
            //console.log("Collision")
            if (player.yvel < 0) {
                player.yvel = 0;

            }
        }
        if (this.collisionrev(player, platform) == platformside.topleft) {
            //console.log("Collision")
            if (player.yvel < 0) {
                player.yvel = 0;

            }
            if (player.xvel < 0) {
                player.xvel = 0;

            }
        }
        if (this.collisionrev(player, platform) == platformside.topright) {
            //console.log("Collision")
            if (player.yvel < 0) {
                player.yvel = 0;

            }
            if (player.xvel > 0) {
                player.xvel = 0;

            }
        }
        if (this.collisionrev(player, platform) == platformside.bottomright) {
            //console.log("Collision")
            if (player.yvel > 0) {
                player.yvel = 0;

            }
            if (player.xvel > 0) {
                player.xvel = 0;

            }
        }
        if (this.collisionrev(player, platform) == platformside.bottomleft) {
            //console.log("Collision")
            if (player.yvel > 0) {
                player.yvel = 0;

            }
            if (player.xvel < 0) {
                player.xvel = 0;

            }
        }
    }
    this.checkifinside = function(player,object)
    {
        if (player.x>object.x&&player.x+player.width<object.x+object.width&&player.y>object.y&&player.y+player.height<object.y+object.height)
        {

            return true;

        }
        else {
            return false;
        }
    }
	    this.checkIfPointInside = function(player, x, y)
    {
        if (x >= player.x && x <= player.x + player.width && y >= player.y && y <= player.y + player.height)
        {
            return true;
        }
        else {
            return false;
        }
    }
    this.collisiondetectionradius = function(OB1, OB2) {
        var result = false;
        var ob1ymob2y = Math.pow((OB1.y - OB2.y), 2);
        var ob2ymob1y = Math.pow((OB2.y - OB1.y), 2);
        var ob1xmob2x = Math.pow((OB1.x - OB2.x), 2);
        var ob2xmob1x = Math.pow((OB2.x - OB1.x), 2);
        if (OB1.x > OB2.x) {
            if (OB1.y > OB2.y) {
                if (Math.sqrt(ob1ymob2y + ob1xmob2x) < OB1.radius) {
                    result = true;
                }
            }
            if (OB1.y < OB2.y) {
                if (Math.sqrt(ob2ymob1y + ob1xmob2x) < OB1.radius) {
                    result = true;
                }
            }
        }
        if (OB1.x < OB2.x) {
            if (OB1.y > OB2.y) {
                if (Math.sqrt(ob1ymob2y + ob2xmob1x) < OB1.radius) {
                    result = true;
                }
            }
            if (OB1.y < OB2.y) {
                if (Math.sqrt(ob2ymob1y + ob2xmob1x) < OB1.radius) {
                    result = true;
                }
            }
        }
        return result
    }
    this.finddistance = function (OB1, OB2) {
        var result = false;
        var ob1ymob2y = Math.pow((OB1.y - OB2.y), 2);
        var ob2ymob1y = Math.pow((OB2.y - OB1.y), 2);
        var ob1xmob2x = Math.pow((OB1.x - OB2.x), 2);
        var ob2xmob1x = Math.pow((OB2.x - OB1.x), 2);
        if (OB1.x > OB2.x) {
            if (OB1.y > OB2.y) {
                    result = Math.sqrt(ob1ymob2y + ob1xmob2x);
                
            }
            if (OB1.y < OB2.y) {
                    result = Math.sqrt(ob2ymob1y + ob1xmob2x);
            }
        }
        if (OB1.x < OB2.x) {
            if (OB1.y > OB2.y) {
                    result = Math.sqrt(ob1ymob2y + ob2xmob1x);
            }
            if (OB1.y < OB2.y) {
                    result = Math.sqrt(ob2ymob1y + ob2xmob1x);
            }
        }
        return result;
    }
	this.diagonalWallStop = function(player, wall)
	{
		//if (this.testcollision(player, wall))
		//{
			if (wall.point1.x<wall.point2.x)
			{
				if (wall.point1.y<wall.point2.y)
				{
					if (player.x < wall.point1.x + (player.y - wall.point1.y))
					{
						player.x = wall.point1.x + (player.y - wall.point1.y);
					}
				}
				else
				{
					if (player.x > wall.point1.x - (player.y - wall.point1.y))
					{
						player.x = wall.point1.x - (player.y - wall.point1.y);
					}	
				}
			}
			else
			{
				if (wall.point1.y<wall.point2.y)
				{
					if (player.x > wall.point1.x + (player.y - wall.point1.y))
					{
						player.x = wall.point1.x + (player.y - wall.point1.y);
					}
				}
				else
				{
					if (player.x > wall.point1.x - (player.y - wall.point1.y))
					{
						player.x = wall.point1.x - (player.y - wall.point1.y);
					}		
				}		
			}
		//}

	}
}
function pointCollide(p, a){
	if ((p.x > a.x && p.x < a.x + a.width) && (p.y > a.y && p.y < a.y + a.height)){
		return true;
	}
	else {
		return false;
	}	
}
function distance(obj1, obj2, centre){
	if (centre){
		this.distx = (obj1.x + (obj1.width/2)) - (obj2.x + obj2.width/2);
		this.disty = (obj1.y + (obj1.height/2)) - (obj2.y + (obj2.height/2));
		this.dst = Math.sqrt((this.distx*this.distx) + (this.disty*this.disty));
	}
	else {
		this.distx = (obj1.x) - (obj2.x);
		this.disty = (obj1.y) - (obj2.y);
		this.dst = Math.sqrt((this.distx*this.distx) + (this.disty*this.disty));
	}
	return dst;
}