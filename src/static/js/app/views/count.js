define(function (require, exports, module) {

var marionette = require('marionette');

var Count = marionette.ItemView.extend({
    tagName: '.count strong',
    initialize : function(){
        this.bindTo(this.collection, 'all', this.render, this);
    },

    onRender: function(){
        this.$el.html(this.collection.getActive().length);
    },
});

exports.Count = Count;

});
