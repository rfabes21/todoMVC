define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!tpl/header');

var HeaderView = marionette.ItemView.extend({
    el : 'header',
    template : template,
    ui : {
        input: '.new-todo'
    },
    events : {
        'keypress .new-todo': 'onInputKeypress'
    },
    initialize : function(){
        debugger;
    },

    // TODO* change to built version
    onInputKeypress : function(evt) {
      var ENTER_KEY = 13;
      var todoText = this.ui.input.val().trim();

      if ( evt.which === ENTER_KEY && todoText ) {
        this.collection.create({
          title : todoText
        });
        this.ui.input.val('');
      }
    }
});

exports.HeaderView = HeaderView;

});
