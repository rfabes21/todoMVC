define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!tpl/footer');

var FooterView = marionette.ItemView.extend({
    el : 'footer',
    template : template,
    ui : {

    },

    events : {

    },

    initialize : function(){

    }
});

exports.FooterView = FooterView;

});
