define(function( require, exports, module ){

var backbone = require('backbone');
var Todo = require('./models').Todo;

var TodoCollection =  backbone.Collection.extend({
    model: Todo,

    getCompleted: function() {
      return this.filter(isCompleted);
    },
    getActive: function() {
      return this.reject(isCompleted);
    },
    comparator: function(todo) {
      return todo.get('created');
    }
});



exports.TodoCollection = TodoCollection;

});
