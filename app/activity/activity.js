define(function(require, exports, module) {

var vent = require('built/app/vent').vent;
var events = require('./events');
var count = 0;


function presentNetworkActivityIndicator(){
    count++;
    vent.trigger(events.PRESENT);
}

function dismissNetworkActivityIndicator(){
    count--;

    if(count <= 0){
        count = 0;
        vent.trigger(events.DISMISS);
    }
}

exports.presentNetworkActivityIndicator = presentNetworkActivityIndicator;
exports.dismissNetworkActivityIndicator = dismissNetworkActivityIndicator;

});

