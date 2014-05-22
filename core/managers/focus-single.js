define(function(require, exports, module){

// Imports
var FocusManager     = require('built/core/managers/focus').FocusManager;

// Module

var SingleFocusManager = FocusManager.extend({

    getFocusedIndex: function(){
        var index = -1;

        var obj = this._focusedObjects[0];
        if(obj){
            index = this._list.indexOf(obj);
        }

        return index;
    },

    getFocusedObject: function(){
        return this._focusedObjects[0];
    },

    focus: function(obj){
        var hasFocus = this._focusedObjects.indexOf(obj) > -1;
        var shouldBlur = hasFocus && this.allowsDeselect;

        if(shouldBlur){
            this.blur(obj);
            return;
        }

        if(!hasFocus){
            if(this._focusedObjects.length > 0){
                this.blur(this._focusedObjects[0]);
            }

            this._focusedObjects.push(obj);
            this._dispatchFocus(obj);
        }
    }
});

exports.SingleFocusManager = SingleFocusManager;

}); // eof define
