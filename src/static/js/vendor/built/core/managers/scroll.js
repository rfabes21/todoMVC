define(function(require, exports, module){

// Imports
var _          = require('underscore');
var marionette = require('marionette');

var helpers         = require('built/core/utils/helpers');
var ScrollResponder = require('built/core/responders/scroll').ScrollResponder;
var RangeManager    = require('built/core/managers/range').RangeManager;
var events          = require('built/core/events/event');

// Module

var ScrollManager = marionette.Controller.extend({

    $scrollable: null,

    _defaults       : null,
    _scrollResponder: null,
    _rangeManager   : null,

    // Backbone & Marionette overrides

    /**
     * initialize the ScrollManager
     * @param  {object} options options literal
     * @return {undefined}
     *
     * @example
     * var scrollManager = new ScrollManager(
     *     {
     *         el : $(window),     // required, can be any element or $element;
     *                               though window must be passed in as $(window)
     *         scrollDebounce: 0,  // optional, default 0, debounces calls to scroll listeners
     *     }
     * );
     */
    initialize: function(options) {
        this.options = options;
        _.defaults(this.options, this._getDefaults());

        this.$el              = helpers.registerElement(this.options.el);
        this.$scrollable      = this._initializeScrollable(this.$el);
        this._scrollResponder = this._initializeScrollResponder(this.options);
        this.rangeManager     = this._initializeRangeManager(this.options);
        this._elementMarkers  = {};

        // compose range manager methods
        helpers.composeAll(
            this,
            this.rangeManager,
            'getMarkers',
            'addMarkerPositions',
            'removeMarkerPositions',
            'addMarkerValues',
            'removeMarkerValues',
            'calculatePositionForValue',
            'calculateValueForPosition'
        );
    },

    onClose: function() {
        this._scrollResponder.close();
        this.rangeManager.close();
    },

    // Initialization

    _initializeScrollable: function($el) {
        var isWindow;

        isWindow = window === _.identity($el[0]);
        $el = (isWindow) ? this._getWindowScrollable() : $el;
        return $el;
    },

    _getWindowScrollable: function() {

        // seems to work everywhere
        // personally tested in:
        // safari 6.0.1 (lion, mtn-lion, mav)
        // chrome 31
        // firefox 24
        // ie(8-10, win7)
        // see: http://stackoverflow.com/a/9820017
        return $(document);
    },

    _initializeScrollResponder: function(options) {
        return new ScrollResponder({
            el: options.el,
            scroll: _.bind(this._didReceiveScroll, this),
            scrollDebounce: options.scrollDebounce
        });
    },

    _didReceiveScroll: function(responder, e) {
        // var scrollable;
        // scrollable = this.$scrollable[0];
        this.rangeManager.setValue(this.$scrollable.scrollTop());
    },

    _initializeRangeManager: function(options) {
        var manager, max, listener, scrollable, start;

        max = this._computeMaxScroll();
        manager = new RangeManager({
            max  : max
        });

        this.listenTo(manager, 'change', _.bind(this._dispatchScroll, this));
        this.listenTo(manager, 'marker', _.bind(this._dispatchMarker, this));

        return manager;
    },

    // Helpers

    _getDefaults: function() {
        return {
            el: null,
            scrollDebounce: 0
        };
    },

    _scrollElement: function($el, value) {
        // $el[0].scrollTop = value;
        $el.scrollTop(value);
    },

    _getViewportSize: function($el) {
        var isWindow;

        isWindow = window === _.identity($el[0]);

        if(isWindow) {
            return this._getWindowViewportSize($el);
        }
        else {
            return this._getElementViewportSize($el);
        }

        throw new Error('coult not determine viewport size!');
    },

    _getWindowViewportSize: function($el) {
        var height, width, win, doc, docEl, body;

        // local refs
        win = $el[0];
        doc = $el[0].document;

        docEl = doc.documentElement;
        body = doc.getElementsByTagName('body')[0];
        width = win.innerWidth || docEl.clientWidth || body.clientWidth;
        height = win.innerHeight || docEl.clientHeight || body.clientHeight;

        return {width: width, height: height};
    },

    _getElementViewportSize: function($el) {
        var el, width, height;

        el = $el[0];
        width = el.clientWidth;
        height = el.clientHeight;

        return {width: width, height: height};
    },

    _getScrollSize: function($el) {
        var isWindow;

        isWindow = window === _.identity($el[0]);

        if(isWindow) {
            return this._getWindowScrollSize($el);
        }
        else {
            return this._getElementScrollSize($el);
        }

        throw new Error('coult not determine viewport size!');
    },

    // see: http://bit.ly/1dXjsmd
    _getWindowScrollSize: function($el) {
        var doc, docEl, width, height;

        doc = document;
        docEl = doc.documentElement;
        body = doc.body;

        width = Math.max(
            body.scrollWidth, docEl.scrollWidth,
            body.offsetWidth, docEl.offsetWidth,
            body.clientWidth, docEl.clientWidth
        );
        height = Math.max(
            body.scrollHeight, docEl.scrollHeight,
            body.offsetHeight, docEl.offsetHeight,
            body.clientHeight, docEl.clientHeight
        );

        return {width: width, height: height};
    },

    _getElementScrollSize: function($el) {
        var el, width, height;

        el = $el[0];
        width = el.scrollWidth;
        height = el.scrollHeight;

        return {width: width, height: height};
    },

    _computeMaxScroll: function() {
        var viewportSize, scrollSize;

        viewportSize = this._getViewportSize(this.$el);
        scrollSize = this._getScrollSize(this.$el);

        max = scrollSize.height - viewportSize.height;

        return max;
    },

    // Public API

    // a special version of the internal _computeMaxScroll that is more useful
    // for the end user as it also updates the max of the internal range
    calculateMaxScroll: function() {
        var oldScrollValue, max;

        oldScrollValue = this.getScrollValue();
        max = this._computeMaxScroll();

        this.rangeManager.setMax(max);

        // reset the range's value to the old/current scroll value
        this.rangeManager.setValue(oldScrollValue);

        return this.rangeManager.getMax();
    },

    getMaxScrollValue: function() {
        return this.rangeManager.getMax();
    },

    getMinScrollValue: function() {
        return this.rangeManager.getMin();
    },

    getScrollPosition: function() {
        return this.rangeManager.getPosition();
    },

    setScrollPosition: function(position) {
        var value;

        value = this.rangeManager.calculateValueForPosition(position);
        this.setScrollValue(value);
    },

    getScrollValue: function() {
        return Math.floor(this.rangeManager.getValue());
    },

    setScrollValue: function(value) {
        this._scrollElement(this.$scrollable, value);
    },

    /**
     * Add markers using the 'top' position of the elements
     * @param {jquery selector} $elements the elements to add markers for
     *
     * @returns {object} a reference dictionary, {position: $element}
     *
     * @notes
     * - This function WILL NOT add markers for element's who's top is
     *   greater than the max scroll.
     */
    addMarkersUsingElements: function($elements) {
        var $el, $position, dict, top, position, positions;
        var range = this.rangeManager;

        function iterator(el, i, list) {
            $el       = $(el);
            $position = $el.position();
            top       = $position.top;

            helpers.registerElement($el);

            // Only add a marker that is less than range max.
            // This seems redundant, but this avoids a bunch of
            // mysterious markers at position 1 (range will squash any value
            // that results in a position > 1). I would rather avoid
            // adding these all together, than filtering them out later.
            shouldAddMarker = top < this.rangeManager.getMax();

            if(shouldAddMarker) {
                position            = range.calculatePositionForValue(top);
                dict[position + ''] = $el;

                positions.push(position);
            }
        }

        positions = [];
        dict      = {};

        // iterate over elements
        _.each($elements, iterator, this);

        this.addMarkerPositions.apply(this, positions);

        // This is a convenience return value that maps {markerPosition: $element}
        // I thought it would be useful information for the user.
        // example: {'0.1': $elementRef}
        this._mergeElementMarkers(dict);
        return dict;
    },

    _mergeElementMarkers: function(dict){
        var markers = this._elementMarkers;

        _.each(dict, function($el, key){
            var data = markers[key] = markers[key] || {};
            var id = helpers.getElementId($el);
            data[id] = $el[0];
        });
    },

    _removeElementMarkers: function(positions){
        var markers = this._elementMarkers = this._elementMarkers || {};

        _.each(positions, function(position){
            delete markers[position];
        });
    },

    removeMarkersUsingElements: function($elements) {
        var $el, $position, top, position, positions;

        function iterator(el, i, list) {
            $el       = $(el);
            $position = $el.position();
            top       = $position.top;

            return this.rangeManager.calculatePositionForValue(top);
        }

        positions = _.map($elements, iterator, this);

        this.removeMarkerPositions.apply(this, positions);
        this._removeElementMarkers(positions);
    },

    // Event dispatchers

    _dispatchScroll: function(sender, position, value) {
        this.trigger(events.SCROLL, this, position, value);
    },

    _dispatchMarker: function(sender, markers, direction) {
        this.trigger(events.MARKER, this, markers, direction);

        _.each(markers, function(position){
            var matches = this._elementMarkers[position];

            var elements = _.map(matches, function(el){
                return $(el);
            });

            this.trigger(events.MARKER_ELEMENT, this, markers, elements, direction);

        }, this);
    }

}); // eof ScrollManager

// Exports
module.exports.ScrollManager = ScrollManager;

}); // eof define
