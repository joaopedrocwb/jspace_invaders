Fx.Steppable = new Class({
    "Extends": Fx.Morph,
    "step": function() {
        this.fireEvent("step");
        this.parent();
    }
});