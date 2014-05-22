define(function(require, exports, module) {

// Imports

var Marionette = require('marionette');
var _          = require('underscore');

// Module

var WindowResponder = Marionette.Controller.extend({

    EVENT_ORIENTATION: 'orientationchange.built.responders.orientation',
    EVENT_RESIZE     : 'resize.built.responder.resize',

    acceptsOrientation: false,
    acceptsResize     : false,
    resizeDebounce    : 300,

    // Backbone & Marionette overrides

    /**
     * Initialize WindowResponder
     * @param  {object} options options literal
     * @return {undefined}
     *
     * @example
     * var windowResponder = new WindowResponder(
     *     {
     *         acceptsOrientation: true, // optional, default false, enables orientation delegation
     *         acceptsResize     : true, // optional, default false, enables resize delegation
     *         resizeDebounce    : 600,  // optional, default 300, debounces (or throttles) resize delegate calls. Pass in 0 to disable.
     *     }
     * );
     */
    initialize: function(options) {
        _.extend(this, options);

        _.bindAll(
            this,
            '_orientationChange',
            '_resize'
        );

        if(this.acceptsOrientation) {
            $(window).on(this.EVENT_ORIENTATION, this._orientationChange);
        }

        if(this.acceptsResize) {

            if(this.resizeDebounce > 0) {
                this._resize = _.debounce(
                    this._resize,
                    this.resizeDebounce
                );
            }

            $(window).on(this.EVENT_RESIZE, this._resize);
        }
    },

    onClose: function() {
        if(this.acceptsOrientation) {
            $(window).off(this.EVENT_ORIENTATION, this._orientationChange);
        }
        if(this.acceptsResize) {
            $(window).off(this.EVENT_RESIZE, this._resize);
        }
    },

    // Internal responder delgates

    _orientationChange: function(e) {
        this._interpretOrientationEvent(e);
    },

    _resize: function(e) {
        this.resize(this, e);
    },

    // User defined delegates

    resize: function(responder, e) {
        // noop
    },

    portrait: function(responder, e) {
         // noop
    },

    landscape: function(responder, e) {
         // noop
    },

    // Helpers

    _interpretOrientationEvent: function (e) {
        var orientation = e.target.orientation;

        if (orientation == 90 || orientation == -90) {
            this.landscape(this, e);
            return;
        }

        if(orientation === 0) {
            this.portrait(this, e);
            return;
        }
    }

}); // eof WindowResponder

// Exports

module.exports.WindowResponder = WindowResponder;

}); // eof define
