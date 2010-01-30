var EnemyGroup = new Class({
    "initialize": function() {
		this.create();
    },
    /*"position": function() {
        var rect = this.object.getCoordinates("stage");
        return {
            "x": rect.left,
            "y": rect.top
        };
    },*/
	"create": function() {
		this.object = new Element("div", {});
		
		var cols = 8;
		var rows = 3;
		
		for(top=0; rows > top; top++) {
			for(left=0; cols > left; left++) {
				
				var enemy = new GameEnemy({
					"styles": {
						"background": "yellow",
						"left": left * 34,
						"top": top * 34
					}
				}, this.object);
			}
		}
		
        this.object.inject("stage");
	}
});