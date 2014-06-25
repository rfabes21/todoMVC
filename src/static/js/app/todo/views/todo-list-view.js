define(function (require, exports, module) {

var marionette = require('marionette');
var ListViewCell = require('./cells/list-view-cell').ListViewCell;

var TodoListView =  marionette.CollectionView.extend({
    itemView : ListViewCell,
    initialize : function(){

    },
    ui : {

    },
    events : {

    }
});

exports.TodoListView = TodoListView;

});
