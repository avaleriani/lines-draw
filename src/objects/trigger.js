'use strict';
var shortid = require('shortid');

var Trigger = function (top) {
    var uuid = shortid.generate();
    var trigger = document.createElement('div');

    trigger.style.top = top;

    trigger.setAttribute('id', 'trigger_' + uuid);
    trigger.setAttribute('class', 'trigger');
    return trigger;
};
module.exports = Trigger;
