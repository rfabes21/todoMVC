define(function( require, exports, module ){

var backbone = require('backbone');
var Todo = require('./models/todo').Todo;

var TodoCollection =  backbone.Collection.extend({
    model: Todo,
});

exports.TodoCollection = TodoCollection;

});
