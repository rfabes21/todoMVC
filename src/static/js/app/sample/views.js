define(function(require, exports, module) {

var marionette = require('marionette');
var modals = require('built/app/modals');

var templateSample = require('hbs!app/sample/templates/sample');
var templateModal = require('hbs!app/sample/templates/modal');

var MySampleView = marionette.ItemView.extend({
    template: templateSample
});


var MyModalView = marionette.ItemView.extend({
    template: templateModal,

    events:{
        'click .actions .btn.close': 'wantsCloseModal'
    },

    // Required Method
    // Enables you to pass any information from this
    // modal view to the thing that cares about it.
    //
    // This is your bridge.
    getData: function(){
        return {foo: 'foo', bar: 'bar'};
    },

    wantsCloseModal: function(){
        this.trigger(modals.events.COMPLETE);
    }
});



exports.MySampleView = MySampleView;
exports.MyModalView = MyModalView;

});