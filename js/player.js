function Player(_x, _y)
{
	this.x = _x;
	this.y = _y;
	this.width = 10;
	this.height = 10;
	this.xVel = 0;
	this.yVel = 0;
	this.vel = 3;
	this.frame = 0;
	this.timer = 0;
	this.xlatch = true;
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
	this.animationSlots = [];
	this.animationSlots[0] = new animation();
	this.animationSlots[1] = new animation();
	this.inAction = false;
	this.damageBox = {
		offsetx: 0,
		offsety: 0,
		width: 0,
		height: 0,
		active: false
	}
	this.update = function()
	{
		this.inputs();
		this.calcNewPos();
		if (keypressed.mouse)
		{
			this.shoot();
		}
	}
	this.calcNewPos = function()
	{
		this.x += this.xVel;
		this.y += this.yVel;
	}
	this.changeDamageBox = function(_x, _y, _w, _h)
	{
		this.damageBox.offsetx = _x;
		this.damageBox.offsety = _y;
		this.damageBox.width = _w;
		this.damageBox.height = _h;
		console.log("asdasd");
	}
	this.attack = function(x)
	{
		this.inAction = true;

		switch (x)
		{
			case "skeleton_sprite":
				this.changeAnimation("walk_skel_down", 0, true);
				break;
			case "half_spin":
				switch(this.lastDir)
				{
					case "up":
						this.changeAnimation("half_spin_left", 0, true);
						this.lastDir = "right";
						console.log("asdasd");
						break;
					case "down":
						this.changeAnimation("half_spin_right", 0, true);
						this.lastDir = "left";
						break;
					case "left":
						this.changeAnimation("half_spin_left", 0, true);
						this.lastDir = "right";
						break;
					case "right":
						this.changeAnimation("half_spin_right", 0, true);
						this.lastDir = "left";
						break;
				}
				this.changeDamageBox(-15, -15, 40, 40);
				this.damageBox.active = true;
				this.inflictDamage(5);
				this.xVel = 0;
				this.yVel = 0;
				break;
			case "sword_swing":
				this.changeAnimation(this.getSheetByDirection(this.lastDir, "sword_swing"), 0, true);
				switch(this.lastDir)
				{
					case "up":
						this.changeDamageBox(-5, -15, 20, 14);
						break;
					case "down":
						this.changeDamageBox(-5, 10, 20, 15);
						break;
					case "left":
						this.changeDamageBox(-15, -5, 15, 20);
						break;
					case "right":
						this.changeDamageBox(10, -5, 15, 20);
						break;
				}
				this.inflictDamage(11);
				this.xVel = 0;
				this.yVel = 0;
				break;				
			case "whirl_wind":
				this.changeAnimation("whirl_wind", 0, true);
				this.xVel = 0;
				this.yVel = 0;
				break;
			case "orb_attack":
				this.changeAnimation("orb_lift", 1, true);
				this.changeAnimation("pentagram_fade", 0, false);
				this.lastDir = "down";
				this.xVel = 0;
				this.yVel = 0;
				this.changeDamageBox(-32, -28, 74, 66);
				this.damageBox.active = true;
				this.inflictDamage(10);
				break;					
		}

	}
	this.getSheetByDirection = function(dir, string)
	{
		result = string + "_" + dir;
		return result;
	}
	this.inflictDamage = function(damage)
	{
		console.log(this.x + this.damageBox.offsetx + "," + this.y + this.damageBox.offsety + "," + this.damageBox.width + "," + this.damageBox.height)
		for (i = 0; i < enemyCollection.array.length; i++)
		{
			if (collisionDetection.testcollisionep(enemyCollection.array[i], this.x + this.damageBox.offsetx, this.y + this.damageBox.offsety, this.damageBox.width, this.damageBox.height))
			{
				enemyCollection.array[i].health -= damage;
			}
		}	
	}
	this.drawDamageBox = function()
	{
		ctx.fillStyle = "rgba(200,50,50,0.4)";
		ctx.fillRect(this.x + this.damageBox.offsetx, this.y + this.damageBox.offsety, this.damageBox.width, this.damageBox.height);
	}
	this.draw = function()
	{
		if (!this.inAction)
		{
			if (this.xVel>0)
			{
				if (this.yVel > 0)
				{
						if (this.lastDir == "down")
						{
							this.changeAnimation("walk_down_sword", 0, true)
						}
						else
						{
							if (this.lastDir == "right")
							{
								this.changeAnimation("walk_right_sword", 0, true)
							}
							else
							{
								this.changeAnimation("walk_down_sword", 0, true)
							}
						}
				}
				else
				{
					if (this.yVel == 0)
					{
						this.changeAnimation("walk_right_sword", 0, true)
						this.lastDir = "right";
					}
					else
					{
						if (this.lastDir == "up")
						{
							this.changeAnimation("walk_up_sword", 0, true)
						}
						else
						{
							if (this.lastDir == "right")
							{
								this.changeAnimation("walk_right_sword", 0, true)
							}
							else
							{
								this.changeAnimation("walk_up_sword", 0, true)
							}
						}				
					}					
				}	
			}
			else
			{
				if (this.xVel==0)
				{
					if (this.yVel > 0)
					{
						this.changeAnimation("walk_down_sword", 0, true)
						this.lastDir = "down";
					}
					else
					{
						if (this.yVel == 0)
						{
							switch(this.lastDir)
							{
								case "up":
									this.changeAnimation("standing_sword_up", 0, true);
									break;
								case "down":
									this.changeAnimation("standing_sword_down", 0, true);
									break;
								case "left":
									this.changeAnimation("standing_sword_left", 0, true);
									break;
								case "right":
									this.changeAnimation("standing_sword_right", 0, true);
									break;
							}
						}
						else
						{
							this.changeAnimation("walk_up_sword", 0, true)
							this.lastDir = "up";					
						}					
					}	
				}
				else
				{
					if (this.yVel > 0)
					{
						if (this.lastDir == "down")
						{
							this.changeAnimation("walk_down_sword", 0, true)
						}
						else
						{
							if (this.lastDir == "left")
							{
								this.changeAnimation("walk_left_sword", 0, true)
							}
							else
							{
								this.changeAnimation("walk_down_sword", 0, true)
							}
						}
					}
					else
					{
						if (this.yVel == 0)
						{
							this.lastDir = "left";
							this.changeAnimation("walk_left_sword", 0, true)
						}
						else
						{
							if (this.lastDir == "up")
							{
								this.changeAnimation("walk_up_sword", 0, true)
							}
							else
							{
								if (this.lastDir == "left")
								{
									this.changeAnimation("walk_left_sword", 0, true)
								}
								else
								{
									this.changeAnimation("walk_up_sword", 0, true)
								}
							}
						}					
					}				
				}
			}
		}
		this.runAnimations();
		if (keypressed.x)
		{
			if (this.xlatch)
			{
				//this.animationSlots[i].frame = 0;
			}
			this.xlatch = false
		}
		else
		{
			this.xlatch = true;
		}
		//this.drawDamageBox();
	}
	this.changeAnimation = function(x, i, _setToDefault)
	{
		if (x == "default")
		{
			switch(this.lastDir)
			{
				case "up":
					x = "standing_sword_up";
					break;
				case "down":
					x = "standing_sword_down";
					break;
				case "left":
					x = "standing_sword_left";
					break;
				case "right":
					x = "standing_sword_right";
					break;
			}
		}
		this.animationSlots[i].setToDefault = _setToDefault;
		if (x !== this.animationSlots[i].currentSheetName)
		{
		switch (x)
		{
			case "pentagram_fade":
				this.animationSlots[i].currentSheet = pentagramfade;
				this.animationSlots[i].fn = 6;
				this.animationSlots[i].fwidth = 74;
				this.animationSlots[i].fheight = 66;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].foffsetx = -32;
				this.animationSlots[i].foffsety = -28;
				this.animationSlots[i].fs = 8;
				break;
			case "orb_lift":
				this.animationSlots[i].currentSheet = orblift;
				this.animationSlots[i].fn = 8;
				this.animationSlots[i].fwidth = 28;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].foffsetx = -8;
				this.animationSlots[i].foffsety = -40;
				this.animationSlots[i].fs = 6;
				break;
			case "walk_skel_down":
				this.animationSlots[i].currentSheet = walkSkelDown;
				this.animationSlots[i].fn = 8;
				this.animationSlots[i].fwidth = 70;
				this.animationSlots[i].fheight = 70;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -35;
				this.animationSlots[i].foffsety = -35;
				this.animationSlots[i].fs = 5;
				break;
			case "walk_right_sword":
				this.animationSlots[i].currentSheet = walkrightsword;
				this.animationSlots[i].fn = 4
				this.animationSlots[i].fwidth = 34;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -6;
				this.animationSlots[i].foffsety = -40;
				this.animationSlots[i].fs = 6;
				break;
			case "walk_left_sword":
				this.animationSlots[i].currentSheet = walkleftsword;
				this.animationSlots[i].fn = 4
				this.animationSlots[i].fwidth = 34;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -18;
				this.animationSlots[i].foffsety = -40;
				this.animationSlots[i].fs = 6;
				break;
			case "walk_down_sword":
				this.animationSlots[i].currentSheet = walkdownsword;
				this.animationSlots[i].fn = 4
				this.animationSlots[i].fwidth = 24;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -4;
				this.animationSlots[i].foffsety = -40;
				this.animationSlots[i].fs = 10;
				break;
			case "walk_up_sword":
				this.animationSlots[i].currentSheet = walkupsword;
				this.animationSlots[i].fn = 4
				this.animationSlots[i].fwidth = 24;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -10;
				this.animationSlots[i].foffsety = -40;
				this.animationSlots[i].fs = 10;
				break;
			case "sword_stab":
				this.animationSlots[i].currentSheet = swordstab;
				this.animationSlots[i].fn = 6;
				this.animationSlots[i].fwidth = 46;
				this.animationSlots[i].fheight = 46;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].fs = 6; 
				break;
			case "sword_swing_left":
				this.animationSlots[i].currentSheet = swordswingleft;
				this.animationSlots[i].fn = 6;
				this.animationSlots[i].fwidth = 42;
				this.animationSlots[i].fheight = 48;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].fs = 3;
				this.animationSlots[i].foffsetx = -22;
				this.animationSlots[i].foffsety = -38;
				break;
			case "sword_swing_right":
				console.log(this.animationSlots[0]);
				this.animationSlots[i].currentSheet = swordswingright;
				this.animationSlots[i].fn = 6;
				this.animationSlots[i].fwidth = 42;
				this.animationSlots[i].fheight = 48;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].fs = 3;
				this.animationSlots[i].foffsetx = -10;
				this.animationSlots[i].foffsety = -38;
				break;
			case "sword_swing_down":
				this.animationSlots[i].currentSheet = swordswingdown;
				this.animationSlots[i].fn = 6;
				this.animationSlots[i].fwidth = 36;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].fs = 3;
				this.animationSlots[i].foffsetx = -16;
				this.animationSlots[i].foffsety = -40;
				break;
			case "sword_swing_up":
				this.animationSlots[i].currentSheet = swordswingup;
				this.animationSlots[i].fn = 6;
				this.animationSlots[i].fwidth = 36;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].fs = 3;
				this.animationSlots[i].foffsetx = -10;
				this.animationSlots[i].foffsety = -40;
				break;
			case "standing_sword_down":
				this.animationSlots[i].currentSheet = standingdown;
				this.animationSlots[i].fn = 1;
				this.animationSlots[i].fwidth = 34;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -2;
				this.animationSlots[i].foffsety = -40;
				break;
			case "standing_sword_up":
				this.animationSlots[i].currentSheet = standingup;
				this.animationSlots[i].fn = 1;
				this.animationSlots[i].fwidth = 22;
				this.animationSlots[i].fheight = 50;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -10;
				this.animationSlots[i].foffsety = -40;
				break;
			case "standing_sword_left":
				this.animationSlots[i].currentSheet = standingleft;
				this.animationSlots[i].fn = 1;
				this.animationSlots[i].fwidth = 34;
				this.animationSlots[i].fheight = 46;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -18;
				this.animationSlots[i].foffsety = -36;
				break;
			case "standing_sword_right":
				this.animationSlots[i].currentSheet = standingright;
				this.animationSlots[i].fn = 1;
				this.animationSlots[i].fwidth = 34;
				this.animationSlots[i].fheight = 46;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].foffsetx = -6;
				this.animationSlots[i].foffsety = -36;
				break;
			case "half_spin_left":
				this.animationSlots[i].currentSheet = halfspinleft;
				this.animationSlots[i].fn = 9;
				this.animationSlots[i].fwidth = 62;
				this.animationSlots[i].fheight = 48;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].foffsetx = -26;
				this.animationSlots[i].foffsety = -38;
				this.animationSlots[i].fs = 2;
				break;
			case "half_spin_right":
				this.animationSlots[i].currentSheet = halfspinright;
				this.animationSlots[i].fn = 9;
				this.animationSlots[i].fwidth = 62;
				this.animationSlots[i].fheight = 48;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].foffsetx = -26;
				this.animationSlots[i].foffsety = -38;
				this.animationSlots[i].fs = 2;
				break;
			case "whirl_wind":
				this.animationSlots[i].currentSheet = whirlwind;
				this.animationSlots[i].fn = 8;
				this.animationSlots[i].fwidth = 116.3;
				this.animationSlots[i].fheight = 116.3;
				this.animationSlots[i].freset = true;
				this.animationSlots[i].foffsetx = -116.2/2;
				this.animationSlots[i].foffsety = -116.2/2;
				this.animationSlots[i].fs = 2;
				break;
			case "spider":
				this.animationSlots[i].currentSheet = spider;
				this.animationSlots[i].fn = 2;
				this.animationSlots[i].fwidth = 20;
				this.animationSlots[i].fheight = 14;
				this.animationSlots[i].freset = false;
				this.animationSlots[i].fs = 6;
				break;
		}
		this.animationSlots[i].currentSheetName = x;
		this.animationSlots[i].frame = 0;
		this.animationSlots[i].timer = 1;
		}
		this.animationSlots[i].isActive = true;
		
	}
	this.runAnimations = function()
	{
		for (i = 0; i < this.animationSlots.length; i++)
		{
			if (this.animationSlots[i].isActive)
			{
				this.animationSlots[i].timer++;
				if (this.animationSlots[i].timer>this.animationSlots[i].fs)
				{
					this.animationSlots[i].timer = 0
				}
				if (this.animationSlots[i].timer == 0)
				{
					this.animationSlots[i].increaseFrame();
					
				}
				if (this.animationSlots[i].frame > this.animationSlots[i].fn-1)
				{
					console.log("ASD");
					if (this.animationSlots[i].freset == true)
					{
						if (this.animationSlots[i].setToDefault)
						{
							this.changeAnimation("default", 0);
							this.inAction = false;
						}
						else
						{
							this.animationSlots[i].isActive = false;
						}
						
					}
					this.animationSlots[i].frame = 0;
					this.animationSlots[i].isActive = false;
				}
				ctx.beginPath();
				ctx.arc(this.x + this.width/2, this.y + this.height/2, 10, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgba(0,0,0,0.35)"
				ctx.fill();
				console.log(this.animationSlots[i].frame + "," + this.animationSlots[i].fn + "," + this.animationSlots[i].timer);
				ctx.drawImage(this.animationSlots[i].currentSheet, this.animationSlots[i].frame * this.animationSlots[i].fwidth, 0, this.animationSlots[i].fwidth, this.animationSlots[i].fheight, this.x + this.animationSlots[i].foffsetx, this.y + this.animationSlots[i].foffsety, this.animationSlots[i].fwidth, this.animationSlots[i].fheight);
			}
		}
	}
	this.shoot = function()
	{
		
	}
	this.changeAnimation("standing_sword_right", 0);
	this.inputs = function()
	{
		if (!this.inAction)
		{
			this.xVel = 0;
			this.yVel = 0;
			if (keypressed.w )
			{
				this.yVel = -this.vel;
			}
			else
			{
				this.jumpLatch = true;
			}
			if (keypressed.a)
			{
				this.xVel = -this.vel;
			}
			if (keypressed.s)
			{
				this.yVel = this.vel;
			}
			if (keypressed.d)
			{
				this.xVel = this.vel;
			}
			if (keypressed.d && keypressed.s)
			{
				this.xVel = 2;
				this.yVel = 2;
			}	
			if (keypressed.d && keypressed.w)
			{
				this.xVel = 2;
				this.yVel = -2;
			}	
			if (keypressed.a && keypressed.s)
			{
				this.xVel = -2;
				this.yVel = 2;
			}	
			if (keypressed.w && keypressed.a)
			{
				this.xVel = -2;
				this.yVel = -2;
			}	
			if (keypressed.d && keypressed.a)
			{
				this.xVel = 0;
			}
			if (keypressed.w && keypressed.s)
			{
				this.yVel = 0;
			}		
			if (keypressed.x)
			{
				this.attack("half_spin");
			}	
			if (keypressed.z)
			{
				this.attack("sword_swing");
			}
			if (keypressed.c)
			{
				this.attack("orb_attack");
			}			
			/*
			if (keypressed.r){
				this.attack("skeleton_sprite");
			}*/
		}		
	}
}