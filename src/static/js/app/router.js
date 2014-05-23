define(function (require, exports, module) {

var marionette = require('marionette');
var AppDelegate = require('app/delegate').AppDelegate;

var AppRouter  =  marionette.AppRouter.extend({
    controller: new AppDelegate(),
    appRoutes:{
        '*index':'index',
    }
});

exports.AppRouter = AppRouter;

});
