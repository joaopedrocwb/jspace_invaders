var GameObject = new Class({
    "initialize": function(type, options, parent) {
        options = options || {};
        parent = parent || "stage";
        options.class = type;
        this.object = new Element("div", options);
        this.object.inject(parent);
        this.rect = this.position();
        GameCollision.add(this);
    },
    "position": function() {
        var rect = this.object.getCoordinates("stage");
        return {
            "h": rect.height,
            "w": rect.width,
            "x": rect.left,
            "y": rect.top
        };
    }
});

var GamePlayer = new Class({
    "Extends": GameObject,
    "direction": 0,
    "initialize": function() {
        this.parent("player");
        document.addEvent("keydown", this.keyDown.bind(this));
        document.addEvent("keyup", this.keyUp.bind(this));
    },
    "move": function(direction) {
        var position = this.rect.x + this.direction * 10;
        if(this.canMoveTo(position)) {
            this.rect.x = position;
            this.object.setStyle("left", this.rect.x + "px");
        }
    },
    "canMoveTo": function(position) {
        return position >= 0 && position <= 642 - 30;
    },
    "fire": function() {
        new GameShot({
            "top": this.rect.y - 20,
            "left": this.rect.x + 13
        }).fire("top");
    },
    "keyDown": function(e) {
        switch(e.key) {
            case "left":
                if(this.direction == 0) this.interval = setInterval(this.move.bind(this), 50);
                return this.direction = -1;
            case "right":
                if(this.direction == 0) this.interval = setInterval(this.move.bind(this), 50);
                return this.direction = 1;
            case "space":
                return this.fire();
        }
        return true;
    },
    "keyUp": function(e) {
        switch(e.key) {
            case "left":
            case "right":
                this.direction = 0;
                clearInterval(this.interval);
        }
        return true;
    }
});

var GameShot = new Class({
    "Extends": GameObject,
    "initialize": function(styles, direction) {
        this.parent("shot", {
            "styles": styles
        });
    },
    "fire": function(direction) {
        new Fx.Steppable(this.object, {
            "transition": "linear",
            "duration": 1000,
            "onComplete": this.destroy.bind(this),
            "onStep": this.step.bind(this),
            "fps": 25
        }).start({
            "top": direction == "top" ? 0 : 465
        });
    },
    "destroy": function() {
        this.object.destroy();
        GameCollision.remove(this);
    },
    "collide": function() {
        this.destroy();
    },
    "step": function(position) {
        this.rect.y = Math.round(position.top[0].value);
    }
});

var GameEnemy = new Class({
    "Extends": GameObject,
    "initialize": function(options, parent) {
        this.parent("enemy", options, parent);
    },
    "destroy": function() {
        GameCollision.remove(this);
        this.object.destroy();
    },
    "collide": function() {
        this.destroy();
        EnemyGroup.remove();
    }
});