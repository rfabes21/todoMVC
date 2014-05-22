define(function (require, exports, module) {
var DragAndDropCollectionView = require('built/ui/views/collection/drag-and-drop').DragAndDropCollectionView;
var marionette = require('marionette');
var mixins = require('built/core/utils/helpers').mixins;

var DragAndDropCompositeView = marionette.CompositeView.extend({
    initialize: function(){
        DragAndDropCollectionView.prototype.initialize.apply(this,arguments);
        if(this.itemViewContainer){
            this.on('composite:model:rendered', this.onCompositeModelRendered);
        }
    },
    onCompositeModelRendered: function(){
        this.dragDropList.setDropElement(this.$el.find(this.itemViewContainer));
    },
});

mixins(DragAndDropCollectionView, DragAndDropCompositeView,
    'onShow',
    'onClose',
    'getViewForEl',
    '_onRender',
    'getDragImage',
    'renderPlaceholderForData',
    'getViewForId',
    'getDragDataForElement',
    'serializeModel',
    'deserializeModel',
    'dropResponderPerformDragOperation',
    'draggingEndedRestoreElementAtPosition',
    'appendHtml');

exports.DragAndDropCompositeView = DragAndDropCompositeView;

});
