define(function( require, exports, module ){

var backbone = require('backbone');
var Todo = require('../models/todo').Todo;
Backbone.LocalStorage = require("vendor/backbone/localStorage");

var TodoCollection =  backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    initialize: function(){

    },

    getCompleted: function(){
        return this.filter(isCompleted);
    },

    getActive: function(){
        return this.reject(isCompleted);
    },
});

exports.TodoCollection = TodoCollection;

});
