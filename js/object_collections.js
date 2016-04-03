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
		if (type == "box50x50")
		{
			this.array[i] = new platform(x, y, 50, 50, box5050, 0, -34);
		}
		else
		{
            this.array[i] = new platform(x, y, width, height, 0, 0, 0);
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
function scenery() {
    this.count = function () {
        return this.array.length;
    }
    this.array = [];
    this.add = function (x, y, width, height, type) {
        var i = this.count();
		if (type == "grass")
		{
			this.array[i] = new grass(x, y);
		}
		else
		{
            this.array[i] = new platform(x, y, width, height, 0, 0, 0);
		}
	}
	this.update = function()
	{
		for (i = 0; i < this.count(); i++)
		{
			this.array[i].update();
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