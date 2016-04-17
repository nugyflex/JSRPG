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
	this.inAction = false;
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
	this.attack = function(x)
	{
		this.inAction = true;

		switch (x)
		{
			case "skeleton_sprite":
				this.changeAnimation("walk_skel_down");
				break;
			case "half_spin":
				switch(this.lastDir)
				{
					case "up":
						this.changeAnimation("half_spin_left");
						this.lastDir = "right";
						break;
					case "down":
						this.changeAnimation("half_spin_right");
						this.lastDir = "left";
						break;
					case "left":
						this.changeAnimation("half_spin_left");
						this.lastDir = "right";
						break;
					case "right":
						this.changeAnimation("half_spin_right");
						this.lastDir = "left";
						break;
				}
				this.inflictDamage(30, 5);
				this.xVel = 0;
				this.yVel = 0;
				break;
			case "sword_swing":
				this.changeAnimation(this.getSheetByDirection(this.lastDir, "sword_swing"));
				this.inflictDamage(20, 11);
				this.xVel = 0;
				this.yVel = 0;
				break;				
			case "whirl_wind":
				this.changeAnimation("whirl_wind");
				this.xVel = 0;
				this.yVel = 0;
	
				break;			
		}

	}
	this.getSheetByDirection = function(dir, string)
	{
		result = string + "_" + dir;
		return result;
	}
	this.inflictDamage = function(range, damage)
	{
		for (i = 0; i < enemyCollection.array.length; i++)
		{
			if (collisionDetection.finddistance(this, enemyCollection.array[i]) < range)
			{
				enemyCollection.array[i].health -= damage;
			}
		}	
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
							this.changeAnimation("walk_down_sword")
						}
						else
						{
							if (this.lastDir == "right")
							{
								this.changeAnimation("walk_right_sword")
							}
							else
							{
								this.changeAnimation("walk_down_sword")
								this.changeAnimation("half_spin")
							}
						}
				}
				else
				{
					if (this.yVel == 0)
					{
						this.changeAnimation("walk_right_sword")
						this.lastDir = "right";
					}
					else
					{
						if (this.lastDir == "up")
						{
							this.changeAnimation("walk_up_sword")
						}
						else
						{
							if (this.lastDir == "right")
							{
								this.changeAnimation("walk_right_sword")
							}
							else
							{
								this.changeAnimation("walk_up_sword")
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
						this.changeAnimation("walk_down_sword")
						this.lastDir = "down";
					}
					else
					{
						if (this.yVel == 0)
						{
							switch(this.lastDir)
							{
								case "up":
									this.changeAnimation("standing_sword_up");
									break;
								case "down":
									this.changeAnimation("standing_sword_down");
									break;
								case "left":
									this.changeAnimation("standing_sword_left");
									break;
								case "right":
									this.changeAnimation("standing_sword_right");
									break;
							}
						}
						else
						{
							this.changeAnimation("walk_up_sword")
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
							this.changeAnimation("walk_down_sword")
						}
						else
						{
							if (this.lastDir == "left")
							{
								this.changeAnimation("walk_left_sword")
							}
							else
							{
								this.changeAnimation("walk_down_sword")
							}
						}
					}
					else
					{
						if (this.yVel == 0)
						{
							this.lastDir = "left";
							this.changeAnimation("walk_left_sword")
						}
						else
						{
							if (this.lastDir == "up")
							{
								this.changeAnimation("walk_up_sword")
							}
							else
							{
								if (this.lastDir == "left")
								{
									this.changeAnimation("walk_left_sword")
								}
								else
								{
									this.changeAnimation("walk_up_sword")
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
				this.frame = 0;
			}
			this.xlatch = false
		}
		else
		{
			this.xlatch = true;
		}
	}
	this.changeAnimation = function(x)
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
		if (x !== this.currentSheetName)
		{
		switch (x)
		{
			case "walk_skel_down":
				this.currentSheet = walkSkelDown;
				this.fn = 8;
				this.fwidth = 70;
				this.fheight = 70;
				this.freset = false;
				this.foffsetx = -35;
				this.foffsety = -35;
				this.fs = 5;
				break;
			case "walk_right_sword":
				this.currentSheet = walkrightsword;
				this.fn = 4
				this.fwidth = 34;
				this.fheight = 50;
				this.freset = false;
				this.foffsetx = -6;
				this.foffsety = -40;
				this.fs = 6;
				break;
			case "walk_left_sword":
				this.currentSheet = walkleftsword;
				this.fn = 4
				this.fwidth = 34;
				this.fheight = 50;
				this.freset = false;
				this.foffsetx = -18;
				this.foffsety = -40;
				this.fs = 6;
				break;
			case "walk_down_sword":
				this.currentSheet = walkdownsword;
				this.fn = 4
				this.fwidth = 24;
				this.fheight = 50;
				this.freset = false;
				this.foffsetx = -4;
				this.foffsety = -40;
				this.fs = 10;
				break;
			case "walk_up_sword":
				this.currentSheet = walkupsword;
				this.fn = 4
				this.fwidth = 24;
				this.fheight = 50;
				this.freset = false;
				this.foffsetx = -10;
				this.foffsety = -40;
				this.fs = 10;
				break;
			case "sword_stab":
				this.currentSheet = swordstab;
				this.fn = 6;
				this.fwidth = 46;
				this.fheight = 46;
				this.freset = true;
				this.fs = 6; 
				break;
			case "sword_swing_left":
				this.currentSheet = swordswingleft;
				this.fn = 6;
				this.fwidth = 42;
				this.fheight = 48;
				this.freset = true;
				this.fs = 2;
				this.foffsetx = -22;
				this.foffsety = -38;
				break;
			case "sword_swing_right":
				this.currentSheet = swordswingright;
				this.fn = 6;
				this.fwidth = 42;
				this.fheight = 48;
				this.freset = true;
				this.fs = 2;
				this.foffsetx = -10;
				this.foffsety = -38;
				break;
			case "sword_swing_down":
				this.currentSheet = swordswingdown;
				this.fn = 6;
				this.fwidth = 36;
				this.fheight = 50;
				this.freset = true;
				this.fs = 4;
				this.foffsetx = -16;
				this.foffsety = -40;
				break;
			case "sword_swing_up":
				this.currentSheet = swordswingup;
				this.fn = 6;
				this.fwidth = 36;
				this.fheight = 50;
				this.freset = true;
				this.fs = 4;
				this.foffsetx = -10;
				this.foffsety = -40;
				break;
			case "standing_sword_down":
				this.currentSheet = standingdown;
				this.fn = 1;
				this.fwidth = 34;
				this.fheight = 50;
				this.freset = false;
				this.foffsetx = -2;
				this.foffsety = -40;
				break;
			case "standing_sword_up":
				this.currentSheet = standingup;
				this.fn = 1;
				this.fwidth = 22;
				this.fheight = 50;
				this.freset = false;
				this.foffsetx = -10;
				this.foffsety = -40;
				break;
			case "standing_sword_left":
				this.currentSheet = standingleft;
				this.fn = 1;
				this.fwidth = 34;
				this.fheight = 46;
				this.freset = false;
				this.foffsetx = -18;
				this.foffsety = -36;
				break;
			case "standing_sword_right":
				this.currentSheet = standingright;
				this.fn = 1;
				this.fwidth = 34;
				this.fheight = 46;
				this.freset = false;
				this.foffsetx = -6;
				this.foffsety = -36;
				break;
			case "half_spin_left":
				this.currentSheet = halfspinleft;
				this.fn = 9;
				this.fwidth = 62;
				this.fheight = 48;
				this.freset = true;
				this.foffsetx = -26;
				this.foffsety = -38;
				this.fs = 2;
				break;
			case "half_spin_right":
				this.currentSheet = halfspinright;
				this.fn = 9;
				this.fwidth = 62;
				this.fheight = 48;
				this.freset = true;
				this.foffsetx = -26;
				this.foffsety = -38;
				this.fs = 2;
				break;
			case "whirl_wind":
				this.currentSheet = whirlwind;
				this.fn = 8;
				this.fwidth = 116.3;
				this.fheight = 116.3;
				this.freset = true;
				this.foffsetx = -116.2/2;
				this.foffsety = -116.2/2;
				this.fs = 2;
				break;
			case "spider":
				this.currentSheet = spider;
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
		if (this.timer == 0)
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
		ctx.arc(this.x + this.width/2, this.y + this.height/2, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(0,0,0,0.35)"
        ctx.fill();
		ctx.drawImage(this.currentSheet, this.frame * this.fwidth, 0, this.fwidth, this.fheight, this.x + this.foffsetx, this.y + this.foffsety, this.fwidth, this.fheight);
	}
	this.shoot = function()
	{
		
	}
	this.changeAnimation("standing_sword_right");
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
			}/*
			if (keypressed.r){
				this.attack("skeleton_sprite");
			}*/
		}		
	}
}