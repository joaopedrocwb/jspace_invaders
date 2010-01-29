// 


var GameCollision;
(function(){
	
	var objects = [];
	var settings = {
		offsetY : 0,
		offsetX : 0
	}
	
	function testCollision(test) {
		var offX=settings.offsetX,
			offY=settings.offsetY,
			collided=true,
			curr,
			len = objects.length,
			i=len;
		for(curr=objects[--i];i>=0;){						
			if (test.y + test.h - (offY * 2) < curr.y + offY) ||
				(test.y + offY > curr.y + curr.h - (offY * 2)) ||
				(test.x + test.w - (offX * 2) < curr.x + offX) ||
				(test.x + offX > curr.x + curr.w - (offX * 2))
			{
					collided = false;
			}
		}
	};
	
	GameCollision = {
		create:function GameCollisionCreate (obj) {
			
		},
		remove:function GameCollisionRemove(obj) {
			
		},
		update:function GameCollisionUpdate(obj) {
			
		}
	};
	
})();
