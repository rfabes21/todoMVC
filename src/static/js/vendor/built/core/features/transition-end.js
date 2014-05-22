define(function(require, exports, module){


// Module
function supported(){
    // No credit here, see :
    // http://www.modernizr.com/

    var element = document.createElement('built');

    var transitionEndEventNames = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd otransitionend',
        'transition'       : 'transitionend',
    };

    for (var name in transitionEndEventNames) {
        if (element.style[name] !== undefined) {
            return transitionEndEventNames[name];
        }
    }

    return false;
}

// Exports
exports.supported = supported;

});
