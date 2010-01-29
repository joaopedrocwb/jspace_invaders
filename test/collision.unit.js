module("collision");
test("instances", function() {
	expect(3);
	ok(!!GameCollision,'exists')
	var collision_a = new GameCollision();
	var collision_b = GameCollision();
	ok(collision_a instanceof GameCollision, 'init with new');
	ok(collision_b instanceof GameCollision, 'init without new');
});

test("add/remove objects in sync mode",function(){
	expect(6);

	try{
		collision_a.add({wrong:0});
	}catch(e){
		ok(true,'rejected invalid object')
	}

	var collision_a = new GameCollision({
		globalEvent:function(){
			ok(true, 'collided globalEvent');
		},
		objectEvent: 'mineCallback'
	});
	var ob1 = {rect:{x:10,y:10,h:10,w:10}};
	ok(collision_a.add(ob1), 'added object');
	
	var ob2 = {rect:{x:21,y:21,h:10,w:10}};
	ok(collision_a.add(ob2), 'added object');
	// var do_not_colide = function() {
	// 	ok(false,'colided before start');
	// }
	collision_a.update(ob2);
	
	ob2.rect.x = 19; ob2.rect.y = 19;
	
	collision_a.update(ob2); // must not collide
	
	collision_a.remove(ob2);

	collision_a.update(ob1); // must not collide
	
	var ob3 = {rect:{x:12,y:12,h:10,w:10},mineCallback:function(){
		ok(true,'collided objectEvent');
	}};
	
	collision_a.add(ob3);
});

asyncTest("add/remove objects in async mode",function(){
	expect(6);
	stop();
	
	var collision_a = new GameCollision({
		mode:'async',
		globalEvent:function(){
			ok(true, 'collided globalEvent');
		},
		objectEvent: 'mineCallback',
		fps:4
	});
	
	var ob1 = {rect:{x:1,y:1,h:5,w:5},mineCallback:function(){
		ok(true,'collided objectEvent');
	}};
	var ob2 = {rect:{x:3,y:3,h:5,w:5}};
	
	collision_a.add(ob1);
	collision_a.add(ob2);
	
	collision_a.start();
	
	// in 600 ms the collision must be checked 3 times
	// one sincronouslly, the second and third within framerate
	// then it shoud stop.
	setTimeout(function() {
		collision_a.stop();
		// after stopping we wait a little more just
		//to be shure other frame don't fire
		setTimeout(function(){
			start();
		},260)
	}, 600);
});