var player;
var enemyGroup;
var GameCollision = new GameCollision({
    objectEvent: "collide",
    mode: "async",
    fps: 30
});
GameCollision.start();

window.addEvent("domready", function() {
    player = new GamePlayer();
    
	stage = new GameStages();
});