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
	expect(5);

	try{
		collision_a.add({wrong:0});
	}catch(e){
		ok(true,'rejected invalid object')
	}

	var collision_a = new GameCollision({
		globalEvent:function(){
			ok(true, 'collided');
		}
	});
	var ob1 = {rect:{x:10,y:10,h:10,w:10}};
	ok(collision_a.add(ob1), 'added object');
	
	var ob2 = {rect:{x:15,y:15,h:10,w:10}};
	ok(collision_a.add(ob2), 'added object');
	// var do_not_colide = function() {
	// 	ok(false,'colided before start');
	// }
	collision_a.update(ob2);
});