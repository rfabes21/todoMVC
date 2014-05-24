define(function (require, exports, module) {

var marionette = require('marionette');
var  TodoItem = require('./todo-item').TodoItem;
var template = require('hbs!tpl/todo-list');

var TodoListView =  marionette.CompositeView.extend({
    template : template,
    itemView : TodoItem,
    itemViewContainer : '.todo-list',

    ui : {

    },

    events : {

    },

    initialize : function(){

    },
});

exports.TodoListView = TodoListView;

});
