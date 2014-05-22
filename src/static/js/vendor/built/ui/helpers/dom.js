define(function (require, exports, module) {

var marionette = require('marionette');

function getElement(value, $context){
    var $el;

    if(_.isString(value)){

        if($context)
            $el = $(value, $context);
        else
            $el = $(value);

    } else {
        $el = value;
    }

    return $el;
}

function getElementPosition ($el) {
    // http://stackoverflow.com/questions/4500758/getting-relative-mouse-x-y-in-javascript
    // http://www.quirksmode.org/js/findpos.html

    var curleft = 0;
    var curtop = 0;
    var obj;

    if($el.nodeName){
        obj = $el;
    } else {
        obj = $el[0];
    }

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return { x: curleft, y: curtop };
    }
}

function getElementBounds($el) {
    // https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIDOMClientRect
    // returns ClientRect: {'bottom', 'height', 'left', 'right', 'top', 'width'}

    // $el is raw dom element
    if($el.nodeName){
        return $el.getBoundingClientRect();
    }

    return $el[0].getBoundingClientRect();
}



function objectFromElement($element, map){
    var key;
    map = map || {};
    $element = getElement($element);
    var node = $element[0];
    var attrs = {};

    for(var i=0; i < node.attributes.length; i++){
        var obj = node.attributes[i];
        key = map[obj.name] || obj.name;
        attrs[key] = obj.value;
    }
    key = map['content'] || 'content';
    attrs[key] = $element.text();
    return attrs;
}

function modelFromElement($element, Model, map){
    Model = Model || Backbone.Model;
    map = map || {};
    $element = getElement($element);
    var obj = objectFromElement($element, map);
    return new Model(obj);
}

function modelFromElements($elements, Model, map){
    var arr = [];
    _.each($elements, function(element){
        arr.push(modelFromElement($(element), Model, map));
    });
    return arr;
}

exports.modelFromElement = modelFromElement;
exports.modelFromElements = modelFromElements;
exports.objectFromElement = objectFromElement;
exports.getElement = getElement;
exports.getElementBounds = getElementBounds;
exports.getElementPosition = getElementPosition;


});
