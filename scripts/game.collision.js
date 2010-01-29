
(function(){
	
	var defaultSettings = {
		mode: 'sync', // async or sync
		offsetY : 0,
		offsetX : 0,
		fps: 60
	};
	var timer;
	
	function internalTimer() {
		var len = this.objects.length,
			i=0;
		for(;i<len;i++){
			testCollision.call(this,this.objects[i],i);
		}
		if (this.running) {
			var that = this;
			timer = setTimeout(function(){
				internalTimer.call(that);		
			},1000/this.settings.fps);
		}
	};
	
	function testCollision(test,skip) { // skip used internally to avoid testing reundantlly
		if(this.settings.mode == 'async' && !this.running) {
			return;
		}
		var offX=this.settings.offsetX,
			offY=this.settings.offsetY,
			collided=true,
			curr,
			len = this.objects.length,
			i=0;
		var count = 0; // debug infinite loop protection
		for(;i<len;i++){
			if(count>100) {return}; // debug infinite loop protection
			curr = this.objects[i];
			if (!curr || test == curr || (skip && skip > i)) {
				continue;
			}
			if (
				(test.rect.y + test.rect.h - (offY * 2) < curr.rect.y + offY) ||
				(test.rect.y + offY > curr.rect.y + curr.rect.h - (offY * 2)) ||
				(test.rect.x + test.rect.w - (offX * 2) < curr.rect.x + offX) ||
				(test.rect.x + offX > curr.rect.x + curr.rect.w - (offX * 2))
				) {
				collided = false;
			} else {
				// honor object callback settings
				if(typeof this.settings.globalEvent == "function") {
					this.settings.globalEvent.call(window,test,curr);
				}
				if(typeof test[this.settings.objectEvent] == "function") {
					test[this.settings.objectEvent].call(test,curr);
				}
				if(typeof curr[this.settings.objectEvent] == "function") {
					curr[this.settings.objectEvent].call(curr,test);
				}
			}
		}
		return false;
	};
	
	function isValidObject(obj) {
		return obj.rect && typeof obj.rect.x == 'number' && typeof obj.rect.y == 'number' && typeof obj.rect.h == 'number' && typeof obj.rect.w == 'number';
	};
	
	function GameCollision(userSettings) {
		var set;
		// avoid problems when not called preceeded by `new`
		if(!this.add) {
			return new GameCollision(userSettings);
		}
		// settings init
		this.settings = {};
		for(set in defaultSettings) {
			this.settings[set] = defaultSettings[set];
		}
		for(set in userSettings) {
			this.settings[set] = userSettings[set];
		}
		
		this.objects = [];
		this.objByHash = {};
		this.uniIds = 0;
		this.timestamp = ''+(new Date()).getTime();
		this.running = false;
		return this;
	};
	
	// public methods
	GameCollision.prototype = {
		add: function(obj){
			if(isValidObject(obj)) {
				// make this object unique
				obj['collidable'+this.timestamp] = this.uniIds;
				this.objects[this.uniIds] = obj;
				this.uniIds++;
				if(this.settings.mode == 'sync') {
					testCollision.call(this,obj);
				}
				return true;
			} else {
				throw "GameCollision.create(obj) obj must be like {rect:{x:0,y:0,h:1,w:1}}";
				return false;
			}
		},
		remove: function(obj){
			try{
				this.objects[obj['collidable'+this.timestamp]] = undefined;
			}catch(e){
				// object not found, do nothing for cleaness
			}
		},
		update: function(obj){
			if(this.settings.mode == 'sync' && typeof obj['collidable'+this.timestamp] != 'undefined') {
				this.objects[obj['collidable'+this.timestamp]] = obj; // just for shure
				testCollision.call(this,obj);
			}
		},
		start:function() {
			if(this.settings.mode == 'async') {
				this.running = true;
				internalTimer.call(this);
			} else {
				throw "GameCollision.start() is for use with async mode";
			}
		},
		stop:function(){
			if(this.settings.mode == 'async') {
				this.running = false;
				clearTimeout(timer);
			} else {
				throw "GameCollision.stop() is for use with async mode";
			}
		}
	};
	
	// export public constructor
	window.GameCollision = GameCollision;

})();

