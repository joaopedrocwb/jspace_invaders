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
		
		enemyGroup = new EnemyGroup(8, 3, 50, this.stage);
	}
});