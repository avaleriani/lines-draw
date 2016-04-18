'use strict';
var $ = require("jquery");
var shortid = require('shortid');

var point = require('./objects/point');
var line = require('./objects/line');
var trigger = require('./objects/trigger');

var css = require('../css/basic-styles.css');

var linesDrawer = {
    linesToDraw: [],
    lines: [],
    options: {
        'triggersContainerAppendTo': 'body',
        'triggersContainerId': '#triggers', //container where all the triggers will be created
        'animationDuration': 400, //duration for the effect when scroll in microseconds
        'triggerScroll': '#scrollTrigger' //where the trigger scroll starts to search for triggers TODO
    },

    getPoint: function (x, y) {
        return new point(x, y);
    },

    getLine: function (p1, p2, color, trigger) {
        color = typeof color !== 'undefined' ? color : "#000000";
        return new line(p1, p2, color, trigger);
    },

    getTrigger: function (top) {
        if (Number(top) === top && top % 1 === 0) {
            var trigger = new Trigger(top);
            var triggerContainer = document.getElementById(this.options['triggersContainerId']);
            if (triggerContainer === null) {
                var triggers = document.createElement('div');
                triggers.id = this.options['triggersContainerId'];
                triggers.className = 'trigger';
                $(this.options['triggersContainerAppendTo']).appendChild(triggers);
                triggerContainer = triggers;
            }
            triggerContainer.appendChild($(trigger));
            return trigger;
        } else {
            console.log('Only Integer allowed');
        }
    },

    addLine: function (lines) {
        Array.prototype.push.apply(this.linesToDraw, lines);
    },

    createLine: function (pointA, pointB, color, trigger) {
        var uuid = shortid.generate();
        var length, height, width, float = 'left';
        var line = document.createElement("div");
        var pointX = pointA.x;

        length = this.calculateLenght(pointA, pointB);
        if (this.calculateDirection(pointA, pointB) == 'horizontal') {
            height = '2px';
            width = length;
        } else {
            height = length;
            width = '2px';
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
        line.setAttribute('id', "point_" + uuid);
        line.setAttribute('class', 'drawed_line');
        line.setData(trigger); //todo:: check this is trigger id
        this.addLine($(line));

        return $(line);
    },

    createAllLines: function (appendId) {
        var that = this;
        this.linesToDraw.forEach(function (sl) {
            that.createLine(sl.startPoint, sl.endPoint, sl.colorSelected).appendTo(appendId);
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

    scrollAnimate: function () {
        var duration = this.options['animationDuration'];
        var controller = new scrollMagic.Controller();

        this.lines.forEach(function () {
            var line = $(this);
            var height = line.css('height');
            var width = line.css('width');
            line.css('height', '0');
            line.css('width', '0');
            new scrollMagic.Scene({triggerElement: line.getData()}) //todo:: here recieves trigger id? check
                .setVelocity(line.getAttribute('id'), {
                    'opacity': 1,
                    width: width,
                    height: height
                }, {duration: duration}) //todo:: check line id is correct
                .addTo(controller);
        });
    },

    mouseCoordenatesOnTitle: function () {
        document.onmousemove = function (e) {
            var cursorX = e.pageX;
            var cursorY = e.pageY;
            $('title').html('x:' + cursorX + ' - y:' + cursorY);
        }
    }
};

module.exports = linesDrawer;