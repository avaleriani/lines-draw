'use strict';

var Line = function (startPoint, endPoint, colorSelected, triggerObj) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.colorSelected = colorSelected;
    this.triggerObj = triggerObj;
};


module.exports = Line;
