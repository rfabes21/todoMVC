define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../../templates/cells/list-view-cell');

var ListViewCell = marionette.ItemView.extend({
    className: 'row',
    template : template,
    ui : {
        edit: '.edit'
    },
    events : {
        'click .destroy' : 'wantsDestroyTodo',
        'dblclick .label': 'wantsEditLabel',
        'keypress .edit' : 'onEditKeypress',
        'click .toggle' : 'wantsToggleModel'
    },

    initialize: function(){

    },

    onRender: function(){
        this.checkActiveComplete();
    },

    checkActiveComplete: function(){
        this.$el.removeClass('active-item completed-item');
        if (this.model.get('completed-item')) {
            this.$el.addClass('completed-item');
        } else {
            this.$el.addClass('active-item');
        }
    },

    wantsDestroyTodo : function(){
        this.model.destroy();
    },

    wantsToggleModel: function(){
        this.model.toggleCompleted().save();
    },

    wantsEditLabel: function(){
        this.$el.addClass('editing');
        this.ui.edit.focus();
    },

    onEditKeypress: function(e){
        var ENTER_KEY = 13;
        var todoText = this.ui.edit.val().trim();

        if ( e.which === ENTER_KEY && todoText ) {
            this.model.set('label', todoText).save();
            this.render();
            this.$el.removeClass('editing');
        }
    },
});

exports.ListViewCell = ListViewCell;

});
