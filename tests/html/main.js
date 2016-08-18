var linesDrawer = require("../../dist/build.js");

linesDrawer.options['addScrollmagicIndicators'] = true;

// TODO:: ver como hacer para que las lineas sean mobile, supongo que multiplicando por un numero magico que de 0 en la resolucion que lo
// hice = window.innerWidth * 1920

var p1 = linesDrawer.getPoint(200, 400);
var p2 = linesDrawer.getPoint(600, 400);
var p3 = linesDrawer.getPoint(600, 100);
var p4 = linesDrawer.getPoint(100, 400);

linesDrawer.addLines([linesDrawer.getLine(p1, p2, "#000000", linesDrawer.getTrigger(1500)), linesDrawer.getLine(p2, p3, "#000000", linesDrawer.getTrigger(400))]);
linesDrawer.addLines([linesDrawer.getLine(p3, p4, "#000000", linesDrawer.getTrigger(800))]);

linesDrawer.createAllLines(document.getElementById('lines-container'));
linesDrawer.scrollAnimate();
//  linesDrawer.mouseCoordenatesOnTitle();
