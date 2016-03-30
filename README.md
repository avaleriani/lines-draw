
# linesDraw

Draw lines with html divs.

## Getting Started

```
    npm install linesDraw
```

## Running the tests

TODO

## Example

Line example

```

line = [
   startPoint=[
        x = 450,
        Y = 220,
    ],
    finishPoint = [
        x= 650,
        y= 220,
    ],
    colorSelected="#112211"
]

```


Add the line

```
linesDrawer.addLine(line);
```
 
 
 Draw It!

```
 
   linesDrawer.createAllLines('#container');

```

You could do this call to get your mouse coordenates(needed for every point of the lines) on your page title

```
   linesDrawer.mouseCoordenatesOnTitle();
```