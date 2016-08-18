'use strict';
var shortid = require('shortid');
var scrollMagic = require('ScrollMagic');
var velocity = require('velocity');
require('animation.velocity');

var Point = require('./objects/point');
var Line = require('./objects/line');
var Trigger = require('./objects/trigger');

var css = require('../css/basic-styles.css');

var linesDrawer = {
    linesToDraw: [],
    lines: [],
    options: {
        'triggersContainerAppendTo': 'body',
        'triggersContainerId': '#triggers', //container where all the triggers will be created with opacity 0
        'animationDuration': 400, //duration for the effect when scroll in miliseconds
        'triggerScroll': '#scrollTrigger', //where the trigger scroll starts to search for triggers TODO
        'addScrollmagicIndicators': false
    },

    getPoint: function (x, y) {
        return new Point(x, y);
    },

    getLine: function (p1, p2, color, trigger) {
        color = typeof color !== 'undefined' ? color : "#000000";
        return new Line(p1, p2, color, trigger);
    },

    getTrigger: function (top) {
        if (Number(top) === top && top % 1 === 0) {
            var trigger = new Trigger(top);
            var triggerContainer = document.getElementById(this.options['triggersContainerId']);
            if (triggerContainer === null) {
                var triggers = document.createElement('div');
                triggers.id = this.options['triggersContainerId'];
                triggers.className = 'trigger';
                if (this.options['triggersContainerAppendTo'] === 'body') {
                    document.getElementsByTagName('body')[0].appendChild(triggers);
                } else {
                    document.getElementById(this.options['triggersContainerAppendTo']).appendChild(triggers);
                }
                triggerContainer = triggers;
            }
            triggerContainer.appendChild(trigger);
            return trigger;
        } else {
            console.log('Only Integer allowed!');
        }
    },

    addDrawedLine: function (line) {
        this.lines.push(line);
    },

    addLines: function (lines) {
        Array.prototype.push.apply(this.linesToDraw, lines);
    },

    createLine: function (pointA, pointB, color, triggerObj) {
        var uuid = shortid.generate();
        var length, height, width, float = 'left';
        var line = document.createElement("div");
        var pointX = pointA.x;

        length = this.calculateLenght(pointA, pointB);
        if (this.calculateDirection(pointA, pointB) == 'horizontal') {
            height = '2';
            width = length;
        } else {
            height = length;
            width = '2';
        }
        if (this.calculateLoR(pointA, pointB) == 'right') {
            float = 'right';
            if (pointA.x > pointB.x) {
                float = 'right';
                pointX = window.innerWidth - width - pointB.x - 19;
            }
        }

        var styles = 'border: 1px solid ' + color + '; '
            + 'width: ' + width + 'px; '
            + 'height: ' + height + 'px;'
            + 'top: ' + pointA.y + 'px; '
            + float + ': ' + pointX + 'px; '
            + 'float: ' + float + '; ';
        line.setAttribute('style', styles);
        line.setAttribute('id', "line_" + uuid);
        line.setAttribute('class', 'drawed_line');
        line.setAttribute('data-trigger', triggerObj.id);
        this.addDrawedLine(line);
        return line;
    },

    createAllLines: function (appendId) {
        var that = this;
        var ln = null;
        this.linesToDraw.forEach(function (sl) {
            ln = that.createLine(sl.startPoint, sl.endPoint, sl.colorSelected, sl.triggerObj);
            appendId.appendChild(ln);
        });
    },

    calculateLenght: function (p1, p2) {
        var pa = p1.x - p2.x,
            pb = p1.y - p2.y;
        return Math.sqrt(pa * pa + pb * pb);
    },

    calculateDirection: function (p1, p2) {
        var pa = p1.x - p2.x;
        if (pa == 0) {
            return 'vertical';
        } else {
            return 'horizontal';
        }
    },

    //Calculate if line direction is left or right
    calculateLoR: function (p1, p2) {
        if (p1.x > p2.x) {
            return 'right';
        } else {
            return 'left';
        }
    },

    //calculate if line direction is up or down
    calculateUoD: function (p1, p2) {
        if (p1.y > p2.y) {
            return 'up';
        } else {
            return 'down';
        }
    },

    callback: function (event) {
        console.log("Event fired! (" + event.type + ")");
    },


    scrollAnimate: function () {
        var duration = this.options['animationDuration'];

        if (this.options['addScrollmagicIndicators'] === true) {
            require('debug');
        }

        // var controller = new scrollMagic.Controller({addIndicators:this.options['addScrollmagicIndicators']});
        var controller = new scrollMagic.Controller({addIndicators: true});
        this.lines.forEach(function (line) {
            var height = line.style.height;
            var width = line.style.width;
            line.style.height = 0;
            line.style.width = 0;
            console.log(line.getAttribute('data-trigger'));
            var scene = new scrollMagic.Scene({
                triggerElement: line.getAttribute('data-trigger'), loglevel: 3
            });
            scene.setVelocity(line.getAttribute('id'), {
                opacity: 1,
                    width: width,
                    height: height
            }, {duration: duration});
            scene.addTo(controller);
        });
    },


    mouseCoordenatesOnTitle: function () {
        document.onmousemove = function (e) {
            var cursorX = e.pageX;
            var cursorY = e.pageY;
            document.getElementsByTagName('body')[0].innerHTML('x:' + cursorX + ' - y:' + cursorY);
        }
    }
};

module.exports = linesDrawer;