var EnemyGroup = new Class({
    "initialize": function(cols, rows, distance) {
		this.create(cols, rows, distance);
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
		
	}
});