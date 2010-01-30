var GameStages = new Class({
    "initialize": function() {
		this.stage = 0;
		this.nextStage();
    },
    
	"nextStage": function()
	{
		this.stage++;
		this.repeatStage();
	},
	
	"repeatStage": function()
	{
		if(typeof enemyGroup != "undefined") enemyGroup.destroy();
		
		enemyGroup = new EnemyGroup(8, 3, 50);
		this.setPosition(8, 3, 50);
	},
	
	"setPosition": function(cols, rows, distance)
	{
		dif = distance - 30;
		
		obj = enemyGroup.object;
		objWidth = cols * distance - dif;
		objHeight = rows * distance - dif;
		
		obj.setStyles(
		{
			"width": objWidth,
			"height": objHeight,
			"top": objHeight * -1, 
			"left": 674/2 - objWidth / 2
		});
	},
	
	"move": function()
	{
		
	}
});