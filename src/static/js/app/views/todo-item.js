define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!tpl/todo-item');

var TodoItem = marionette.ItemView.extend({
    tagname: 'li',
    template : template,
    ui : {

    },
    events : {

    },
    initialize : function(){

    },
});

exports.TodoItem = TodoItem;

});
