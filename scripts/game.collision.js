
(function(){
	
	var settings = {
		offsetY : 0,
		offsetX : 0
	}
	
	function testCollision(test) {
		// console.info(this.objects)
		return false;
		var offX=settings.offsetX,
			offY=settings.offsetY,
			collided=true,
			curr,
			len = objects.length,
			i=len;
		for(curr=objects[--i];i>=0;){						
			if (
				(test.y + test.h - (offY * 2) < curr.y + offY) ||
				(test.y + offY > curr.y + curr.h - (offY * 2)) ||
				(test.x + test.w - (offX * 2) < curr.x + offX) ||
				(test.x + offX > curr.x + curr.w - (offX * 2))
				) {
				collided = false;
			} else {
				return curr;
			}
		}
		return false;
	};
	
	function isValidObject(obj) {
		return obj.rect && typeof obj.rect.x == 'number' && typeof obj.rect.y == 'number' && typeof obj.rect.h == 'number' && typeof obj.rect.w == 'number';
	};
	
	function GameCollision() {
		// avoid problems when not called preceeded by `new`
		if(!this.add) {
			return new GameCollision();
		}
		this.objects = [];
		this.timestamp = ''+(new Date()).getTime();
		return this;
	};
	
	// public methods
	GameCollision.prototype = {
		add: function(obj){
			if(isValidObject(obj)) {
				this.objects.push(obj);
				testCollision.call(this,obj);
				return true;
			} else {
				throw "GameCollision.create(obj) obj must be like {rect:{x:0,y:0,h:1,w:1}}";
				return false;
			}
		},
		remove: function(obj){},
		update: function(obj){
			
		}
	};
	
	// export public constructor
	window.GameCollision = GameCollision;

})();

