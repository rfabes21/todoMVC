define(function(require, exports, module) {
    var marionette = require('marionette');
    var app = new marionette.Application();

    app.addRegions({
        window: '#window',
        modal: '#modal',
        activity: '#activity'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: false
        });
    });


    return app;
});