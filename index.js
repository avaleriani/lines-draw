'use strict';
var $ = require("../jquery");
var shortid = require('../shortid');
var scrollMagic = require('../scrollmagic');
var point = require('./lib/point');
var line = require('./lib/line');
var linesDrawer = {
    linesToDraw: [],
    lines: [],

    getPoint: function (x, y) {
        return new point.Point(x, y);
    },

    getLine: function (p1, p2, col) {
        col = typeof col !== 'undefined' ? col : "#000000";
        return new line.Line(p1, p2, col);
    },

    addLine: function (lines) {
        Array.prototype.push.apply(this.linesToDraw, lines);
    },

    createAllLines: function (appendId) {
        this.linesToDraw.forEach(function (sl) {
            this.createLine(sl.startPoint, sl.endPoint, sl.colorSelected).appendTo(appendId);
        });
    },

    createLine: function (pointA, pointB, color) {
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
        this.lines.push($(line));

        return $(line);
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
        var duration = 400;
        var counter = 0;
        var controller = new scrollMagic.ScrollMagic.Controller();

        $.each(linesDrawer.lines, function () {
            var $obj = $("#point_" + counter);
            var height = $obj.css('height');
            var width = $obj.css('width');
            $obj.css('height', '0');
            $obj.css('width', '0');
            new scrollMagic.ScrollMagic.Scene({triggerElement: '#trigger' + counter})
                .setVelocity("#point_" + counter, {'opacity': 1, width: width, height: height}, {duration: duration})
                .addTo(controller);
            counter = counter + 1;
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