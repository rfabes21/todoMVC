define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!tpl/footer');

var FooterView = marionette.ItemView.extend({
    el : 'footer',
    template : template,
    ui : {
        filter: '.filters a',
        clear: '.clear-complete'
    },

    events : {
        'click ui@clear': 'onClear'
    },

    initialize : function(){

    }
});

exports.FooterView = FooterView;

});
