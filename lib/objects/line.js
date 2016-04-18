'use strict';

var Line = function (startPoint, endPoint, colorSelected, trigger) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.colorSelected = colorSelected;
    this.trigger = trigger;
    return this;
};
module.exports = Line;
