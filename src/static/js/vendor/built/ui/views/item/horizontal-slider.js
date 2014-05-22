define(function (require, exports, module) {

var SliderView = require('built/ui/views/item/slider').SliderView;
var HorizontalSliderControl = require('built/core/controls/sliders/horizontal').HorizontalSliderControl;

var HorizontalSliderView =  SliderView.extend({

    getDriver: function(options){
        return new HorizontalSliderControl(options);
    }
});

exports.HorizontalSliderView = HorizontalSliderView;

});


