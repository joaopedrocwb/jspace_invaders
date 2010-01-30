var EnemyGroup = new Class({
    "initialize": function() {
		this.create();
    },
    "position": function() {
        var rect = this.object.getCoordinates("stage");
        return {
            "x": rect.left,
            "y": rect.top
        };
    },
	"create": function(cols, rows, distance) {
		this.object = new Element("div", {});
		
		for(top=0; rows > top; top++) {
			for(left=0; cols > left; left++) {
				
				var enemy = new GameEnemy({
					"styles": {
						"background": "yellow",
						"left": left * distance,
						"top": top * distance
					}
				}, this.object);
			}
		}
		
        this.object.inject("stage");
	}
});