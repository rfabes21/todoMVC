define(function(require, exports, module){

// Imports
var marionette = require('marionette');
var _          = require('underscore');
var helpers    = require('built/core/utils/helpers');

// Module

var ScrollResponder = marionette.Controller.extend({

    EVENT_SCROLL: 'scroll.built.responders.scroll',

    el: null,
    scrollDebounce: null,

    // Backbone & marionette overrides

    /**
     * Initialize ScrollResponder
     * @param  {object} options options literal
     * @return {undefined}
     *
     * @example
     * var scrollResponder = new ScrollResponder(
     *     {
     *         el: $('.scrollable-element'),  // required, window must be passed in as $(window)
     *         scrollDebounce: 300,           // optional, default 0, 0 disables debounce
     *         scroll: this.scrollCallback,   // optional
     *     }
     * );
     */
    initialize: function(options) {
        // apply options to this scope
        _.extend(this, options);

        // bind correct scope
        _.bindAll(
            this,
            '_didReceiveScroll'
        );

        this.$el = helpers.registerElement(this.el);

        // decorate internal _didReceiveScroll if debounce is enabled
        if(this.scrollDebounce > 0) {
            this._didReceiveScroll = _.debounce(
                this._didReceiveScroll, this.scrollDebounce);
        }

        this.$el.on(this.EVENT_SCROLL, this._didReceiveScroll);
    },

    onClose: function() {
        this.$el.off(this.EVENT_SCROLL, this._didReceiveScroll);
    },

    // Internal event delegates

    // Binding to internal callbacks, instead of straight to
    // whatever the user passes in for "scroll" allows a known,
    // single-point to detach listeners. This should prevent most
    // memory leaks typically associated with event delegates when
    // "close" is run on this object.
    _didReceiveScroll: function(e) {
        this.scroll(this, e);
    },

    // Optional, user-defined delegates

    scroll: function(responder, e) {
        // noop
    },

}); // eof ScrollResponder

// Exports
module.exports.ScrollResponder = ScrollResponder;

}); // eof define
