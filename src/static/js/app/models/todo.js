define(function( require, exports, module ){

var backbone = require('backbone');

var Todo = backbone.Model.extend({
    defaults: {
        title: '',
        completed: false,
        created: 0
    },

    initialize: function(){

    },
});

exports.Todo = Todo;

});
