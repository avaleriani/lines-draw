
#  WIP

![Lines Draw](http://i.imgur.com/zSLrLyu.png)

Draw lines in a web page with html divs.

## Getting Started

```
    npm install lines-draw
```

## Running the tests

TODO

## Installation

```
    var linesDrawer = require("lines-draw");
```
---
## Example

Line example

Define some triggers like these:

```
    <div class="triggers">
        <div class="trigger" id="trigger0"></div>
        <div class="trigger" id="trigger1"></div>
        <div class="trigger" id="trigger2"></div>
        <div class="trigger" id="trigger3"></div>
   </div>
```

Add position with css

```
    .triggers .trigger {
        position: absolute;
        height: 1px;
        width: 100%;
        opacity: 0;
    }

    #trigger0 {
        top: 590px;
    }
    
    #trigger1 {
        top: 710px;
    }
    
    #trigger2 {
        top: 730px;
    }
    
    #trigger3 {
        top: 910px;
    }
```

Define some points with the x and y coordinates

```
    var p1 = linesDrawer.getPoint(200,400);
    var p2 = linesDrawer.getPoint(600,400);
    var p3 = linesDrawer.getPoint(600,100);
    var p4= linesDrawer.getPoint(100,400);

```

Add the line

```
 
    linesDrawer.addLine([linesDrawer.getLine(p1,p2, "#000000"), linesDrawer.getLine(p2,p3, "#000000")]);
    linesDrawer.addLine([linesDrawer.getLine(p3,p4, "#000000")]);
    
```
 
 
 Draw It!

```
 
   linesDrawer.createAllLines('#container');

```

#Note

    Each line TRIGGER Y LINEA TIENEN EL MISMO NOMBRE LINEA X corresponde a TRIGGER X

You could do this call to get your mouse coordenates(needed to determinate every point of the lines) on your page title

```
   linesDrawer.mouseCoordenatesOnTitle();
```
