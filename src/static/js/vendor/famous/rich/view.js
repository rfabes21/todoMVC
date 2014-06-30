define(function (require, exports, module) {

var _ = require('underscore');
var backbone = require('backbone');

var FamousView = require('famous/view');
var Surface  = require('famous/surface');
var Modifier = require('famous/modifier');


function View(options) {
    options = options || {};
    this.model = options.model || null;

    this.constructor.DEFAULT_OPTIONS = this.DEFAULT_OPTIONS;
    FamousView.prototype.constructor.apply(this, arguments);

    this.surfaces = this.surfaces || {};
    this.modifiers = this.modifiers || {};
    this.events = this.events || {};
    this.surfaceEvents = this.surfaceEvents || {};

    _.bindAll(this, 'allocateImage', 'allocateText');
    this.initialize.apply(this, arguments);

    this.buildSurfaces();
    this.bindSurfaceEvents();
    this.bindViewEvents();
    this.onReady();
}


View.extend =  backbone.View.extend;

_.extend(View.prototype, FamousView.prototype, {
    DEFAULT_OPTIONS: {},

    initialize: function(){},
    onReady: function(){},

    trigger: function(type, event){
        this.eventOutput.emit(type, event);
    },

    addChild: function(renderable, modifier){
        if(modifier){
            return this._add(modifier).link(renderable);
        }

        return this._add(renderable);
    },

    bindSurfaceEvents: function(){
        var events = this.surfaceEvents;
        this.bindEvents(this.surfaces, events);
    },

    bindViewEvents: function(){
        var events = this.events;
        this.bindEvents(this, events);
    },

    buildSurfaces: function(){
        _.each(this.surfaces, function(model, key){
            this.initializeSurface(key, model);
        }, this);
    },

    initializeSurface: function(key, model){
        var parts = this.buildSurface(model);
        var surface = parts[0];
        var modifier = parts[1];
        this.addSurface(key, surface, modifier);
    },

    buildSurface: function(model){
        var modifier;
        var surface;
        var content = this.allocateContent(model.content);
        var properties = model.properties || undefined;
        var classes = model.classes || undefined;
        var opacity = model.opacity || undefined;
        var size = model.size || undefined;

        var obj = {
            content: content,
            size: size,
            opacity: opacity,
            properties: properties,
            classes: classes
        };

        surface = new Surface(obj);

        if(model.modifier){
            modifier = new Modifier(model.modifier);
        }

        if(model.pipe){
            surface.pipe(this.eventOutput);
        }

        return [surface, modifier];
    },

    addSurface: function(key, surface, modifier){
        this.surfaces[key] = surface;

        if(modifier){
            this.modifiers[key] = modifier;
            return this.addChild(surface, modifier);
        }

        return this.addChild(surface);
    },

    bindEvents: function(context, events){
        _.each(events, function(action, selector){
            this.bindEvent(context, selector, action);
        }, this);
    },

    bindEvent: function(context, selector, action){
        var parts = selector.split(' ');
        var target = null;
        var event = parts[0];
        var renderable = parts[1] || null;

        target = renderable ? context[renderable] : context;

        var func = this[action];
        if(!func) return;
        try{
            target.on(event, _.bind(func, this));
        } catch(e) {
            throw new Error('Unable to bind event for \'' + selector + '\'');
        }
    },


    allocateContent: function(model){
        if(!model) return undefined;

        var map = {
            'image': this.allocateImage,
            'text': this.allocateText,
        };

        var action = map[model.type] || function(){};
        return action(model);
    },

    allocateImage: function(model){
        var size = _.pick(model, 'width', 'height');
        var attrs = [];

        // preload image
        if(model.src){
            new Image().src = model.src;
        }

        _.each(size, function(value, key){
            attrs.push(key + '="' + value + '"');
        });

        var template = '<img ' + attrs.join(' ') + 'src="' + model.src + '">';
        return template;
    },

    allocateText: function(model){
        var template = model.text;
        return template;
    }
});

exports.View = View;

});
