define(function(require, exports, module) {
    var marionette = require('marionette');
    var AppDelegate = require('./delegate').AppDelegate;
    var app = new marionette.Application();

    app.addRegions({
        todo: '#todo'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: false
        });
        this.delegate = new AppDelegate({
            app: this
        });
    });


    return app;
});
