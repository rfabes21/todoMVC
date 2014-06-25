define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/header');
var Todo = require('../models/todo').Todo;

var HeaderView = marionette.ItemView.extend({
    template : template,
    ui : {
        input: '.new-todo'
    },
    events : {
        'keypress .new-todo': 'onInputKeypress'
    },
    initialize : function(options){
        this.collection = options.collection || null;
    },

    // TODO* change to built version
    onInputKeypress : function(e) {
        var ENTER_KEY = 13;
        var todoText = this.ui.input.val().trim();

        if ( e.which === ENTER_KEY && todoText ) {
            this.collection.add(new Todo({
                label: todoText
            }));
            this.ui.input.val('');
        }
    }
});

exports.HeaderView = HeaderView;

});
