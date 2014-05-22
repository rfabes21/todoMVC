define(function (require, exports, module) {

var _            = require('underscore');
var Marionette   = require('marionette');
var InputSelect  = require('built/core/controls/forms/input-select').InputSelect;
var focus        = require('built/core/events/focus');
var events       = require('built/core/events/event');
var getElementId = require('built/core/utils/helpers').getElementId;

var InputSelectMarionette = InputSelect.extend({

    onClose : function(){
        this.marionetteDict = [];
    },

    initialize : function() {

        InputSelect.prototype.initialize.apply(this,arguments);
        this.on(focus.BLUR, this._onItemBlur);
        this.on(focus.FOCUS, this._onItemFocus);
        this.on(events.SELECT, this._onItemSelect);
    },

    setViews : function(children){
        var elements = [];
        var views = children.toArray();
        _.each(views, function(each){
            elements.push(each.$el[0]);
        });
        this.setElements($(elements));
        var marionetteDict = this.marionetteDict = {};
        _.each(views, function(each){
            var key = getElementId(each.$el);
            marionetteDict[key] = each;
            elements.push(each.$el[0]);
        });
    },

    _triggerEventOnViewForElement : function(event, $element){
        var key = getElementId($element);
        var itemView = this.marionetteDict[key];
        if(itemView){
            itemView.trigger(event);
        }
    },

    _onItemBlur : function(input, $element){
        this._triggerEventOnViewForElement(focus.BLUR, $element);
    },

    _onItemFocus : function(input, $element){
        this._triggerEventOnViewForElement(focus.FOCUS, $element);
    },

    _onItemSelect : function(input, $element){
        this._triggerEventOnViewForElement(events.SELECT, $element);
    }
});

exports.InputSelectMarionette = InputSelectMarionette;

});
