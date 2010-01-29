Fx.Steppable = new Class({
    "Extends": Fx.Morph,
    "step": function() {
        var time = $time();
        if(time < this.time + this.options.duration) {
            var delta = this.transition((time - this.time) / this.options.duration);
            var position = this.compute(this.from, this.to, delta);
            this.set(position);
        }
        else {
            var position = this.compute(this.from, this.to, 1);
            this.set(position);
            this.complete();
        }
        this.fireEvent("step", position);
    }
});