define(function(require, exports, module){


// Module
function supported(){
    var element = document.createElement('x');
    element.style.cssText = 'pointer-events:auto';
    return element.style.pointerEvents === 'auto';
}

// Exports
exports.supported = supported;

});
