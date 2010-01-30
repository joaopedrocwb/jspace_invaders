var player;
var enemy;
var GameCollision = new GameCollision({
    objectEvent: "collide",
    //globalEvent: function() {
    //    GameCollision.stop();
    //    console.log("dadsf adsf");
    //},
    mode: "async",
    fps: 30
});
GameCollision.start();

window.addEvent("domready", function() {
    player = new GamePlayer();
    
	stage = new GameStages();
});