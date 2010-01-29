module("collision");
test("instances", function() {
	expect(3);
	ok(!!GameCollision,'exists')
	var collision_a = new GameCollision();
	var collision_b = GameCollision();
	ok(collision_a instanceof GameCollision, 'init with new');
	ok(collision_b instanceof GameCollision, 'init without new');
});

test("add/remove objects",function(){
	expect(2);
	var collision_a = new GameCollision();
	var ob1 = {rect:{x:10,y:10,h:10,w:10}};
	ok(collision_a.add(ob1), 'added one object');
	try{
		collision_a.add({wrong:0});
	}catch(e){
		ok(true,'rejected invalid object')
	}
});