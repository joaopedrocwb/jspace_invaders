var player;
var enemyGroup;
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
    enemyGroup = new EnemyGroup(8, 3, 36);
});