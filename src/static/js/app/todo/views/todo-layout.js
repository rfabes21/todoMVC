define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/todo-layout');
var TodoCollection = require('../collections/todo-collection').TodoCollection;
var TodoListView = require('./todo-list-view').TodoListView;
var HeaderView = require('./header').HeaderView;
var FooterView = require('./footer').FooterView;

var TodoLayout = marionette.Layout.extend({
    template : template,
    regions: {
        header: 'header',
        todoList: '.todo-list',
        footer: 'footer'
    },
    onShow : function(){
        this.collection = new TodoCollection();
        this.header.show(new HeaderView({
            collection:this.collection
        }));

        this.todoList.show(new TodoListView({
            collection:this.collection
        }));

        this.footer.show(new FooterView({
            collection:this.collection
        }));
    }
});

exports.TodoLayout = TodoLayout;

});
