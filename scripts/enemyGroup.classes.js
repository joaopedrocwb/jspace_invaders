var EnemyGroup = new Class({
    "initialize": function(cols, rows, distance, stage) {
		this.create(cols, rows, distance);
		this.totalEnemys = cols*rows;
		this.goto = 'right';
		this.stageWidth = 674;
		this.enemyWidth = 34;
		
		this.setPosition(cols, rows, distance);
		
		this.speed = 1000 / stage;
		
		/*var that = this;
		setTimeout(function()
		{
			this.move.call(that);
		}, 50);*/
		this.move();
    },
    
    "position": function() {
        var rect = this.object.getCoordinates("stage");
        return {
            "x": rect.left,
            "y": rect.top
        };
    },
    
	"create": function(cols, rows, distance) {
		this.object = new Element("div", {
			"class": "group"
		});
        this.object.inject("stage");
		
		for(top=0; rows > top; top++) {
			for(left=0; cols > left; left++) {
				
				var enemy = new GameEnemy({
					"styles": {
						"left": left * distance,
						"top": top * distance
					},
					"id": "enemy-" + left + "-" + top,
					"class": "enemy"
				}, this.object);
			}
		}
	},
	
	"remove": function()
	{
		this.totalEnemys--;
	},
	
	"checkTotalEnemys" : function()
	{
		if(this.totalEnemys <= 0) this.destroy();
	},
	
	"destroy": function()
	{
		this.object.destroy();
	},
	
	"setPosition": function(cols, rows, distance)
	{
		var dif = distance - this.enemyWidth;
		
		this.objWidth = cols * distance - dif;
		this.objHeight = rows * distance - dif;
		this.top = 0;
		this.left = this.stageWidth/2 - this.objWidth / 2;
		
		this.object.setStyles(
		{
			"width": this.objWidth,
			"height": this.objHeight,
			"left": this.left
		});
	},
		
	"move": function()
	{
		this.checkTotalEnemys();
		
		if(this.goto == "right")
		{
			this.top += 2;
			this.left += 10;
		}
		else
		{
			this.top += 2;
			this.left -= 10;
		}
		
		if(this.left <= 0)
		{
			this.left = 0;
			this.goto = "right";
		}
		
		if(this.left >= this.stageWidth - this.objWidth - this.enemyWidth)
		{
			this.left = this.stageWidth - this.objWidth - this.enemyWidth;
			this.goto = "left";
		}
		
		
		this.object.setStyles({
			"top": this.top,
			"left": this.left
		});
		
		setTimeout(this.move.bind(this), this.speed);
	}
});