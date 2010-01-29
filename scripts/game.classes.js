var GameObject = new Class({
    "initialize": function(type) {
        this.object = new Element("div", {
            "class": type
        });
        this.object.inject("stage");
        GameCollision.add(this.position());
    },
    "position": function() {
        var rect = this.object.getCoordinates("stage");
        return this.rect = {
            "h": rect.height,
            "w": rect.width,
            "x": rect.left,
            "y": rect.top
        };
    }
});

var GamePlayer = new Class({
    "Extends": GameObject,
    "initialize": function() {
        this.parent("player");
        
        // bind the onKeyDown event to this.respondToKey
        document.addEvent("keydown", this.respondToKey.bind(this));
    },
    "move": function(direction) {
        var position = this.rect.x + direction * 34;
        if(this.canMoveTo(position)) {
            GameCollision.update(this.rect);
            this.rect.x = position;
            this.object.setStyle("left", this.rect.x + "px");
        }
    },
    "canMoveTo": function(position) {
        return position >= 0 && position <= 642 - 30;
    },
    "fire": function() {
        new GameShot().fire([this.rect.x + 13, this.rect.y - 20], "top");
    },
    "respondToKey": function(e) {
        switch(e.key) {
            case "left":
                return this.move(-1);
            case "right":
                return this.move(1);
            case "space":
                return this.fire();
        }
        return true;
    }
});

var GameShot = new Class({
    "Extends": GameObject,
    "initialize": function() {
        this.parent("shot");
    },
    "fire": function(position, direction) {
        this.object.setStyles({
            "left": position[0],
            "top": position[1]
        });
        this.position();
        var properties = {
            "top": direction == "top" ? 0 : 465
        };
        new Fx.Steppable(this.object, {
            "transition": "linear",
            "duration": 1000,
            "onComplete": this.destroy.bind(this),
            "onStep": this.step.bind(this),
            "fps": 20
        }).start(properties);
    },
    "destroy": function() {
        this.object.destroy();
    },
    "step": function(position) {
        this.rect.y = Math.round(position.top[0].value);
        GameCollision.update(this.coords);
    }
});

var GameEnemy = new Class({
    "Extends": GameObject,
    "initialize": function() {
        this.parent("enemy");
    }
});

// stub
var GameCollision = {
    add: function(){},
    update: function(){}
}