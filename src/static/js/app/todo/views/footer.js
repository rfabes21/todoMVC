define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/footer');

var FooterView = marionette.ItemView.extend({
    template : template,
    ui : {
        count: '.count strong',
        edit: '.edit'
    },

    events : {
        'click a': 'wantsFilterList',
        'click .clear-complete': 'wantsClearCompleted'
    },

    initialize : function(options){
        this.collection = options.collection || null;
        this.listenTo(this.collection, 'add remove', this.updateList);
    },

    wantsDisplayFooter: function(){
        var footer = this.$el.parent('footer');
        if (this.collection.length === 0) {
            footer.css('display', 'none');
        } else {
            footer.css('display', 'block');
        }
    },

    wantsFilterList: function(e){
        e.preventDefault();
        var $target = $(e.currentTarget);
        var filterName = $target.attr('href');
        backbone.history.navigate(filterName, true);
    },

    updateList: function(){
        this.ui.count.html(this.collection.length);
        this.wantsDisplayFooter();
    },

    wantsClearCompleted: function(){

    },

});

exports.FooterView = FooterView;

});
