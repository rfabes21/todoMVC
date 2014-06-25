define(function( require, exports, module ){

var backbone = require('backbone');

var Todo = backbone.Model.extend({
    defaults: {
        label: '',
        completed: false
    },

    initialize: function(){

    },

    toggle: function(){
        return this.set('completed', !this.get('completed'));
    },

});

exports.Todo = Todo;

});
