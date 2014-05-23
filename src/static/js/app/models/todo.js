define(function( require, exports, module ){

var backbone = require('backbone');

var Todo = backbone.Model.extend({
    defaults: {
        title: '',
        complete: false,
        created: 0
    },

    initialize: function(){
        if (this.isNew()) {
            this.set('created', Date.now());
        }
    },

    toggle: function(){
        return this.set('complete', !this.get('complete'));
    },
});

exports.Todo = Todo;

});
