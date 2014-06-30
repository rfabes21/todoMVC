var _ = require('vendor/underscore/lodash');
var backbone = require('backbone');
var EventHandler = require('famous/event-handler');


function Controller(options) {
    options = options || {};

    this.eventInput = new EventHandler();
    this.eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this.eventInput);
    EventHandler.setOutputHandler(this, this.eventOutput);

    this.initialize.apply(this, arguments);
}

Controller.extend = backbone.View.extend;

_.extend(Controller.prototype, {

    initialize: function(){},

    trigger: function(type, event){
        this.eventOutput.emit(type, event);
    },
});

module.exports.Controller = Controller;
