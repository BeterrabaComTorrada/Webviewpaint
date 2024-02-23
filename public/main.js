var mouseEvent = "empty";
var lastPositionOfX, lastPositionOfY;
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var color = "black";
var widthOfLineInput = document.getElementById("widthOfLine");
var widthOfLine = parseInt(widthOfLineInput.value);
var isSprayMode = false;
var isEraserMode = false;
var selectedColor = null;

document.getElementById("pencilButton").addEventListener("click", function() {
    isSprayMode = false; 
    isEraserMode = false; 
});


document.getElementById("sprayButton").addEventListener("click", function() {
    isSprayMode = true; 
    isEraserMode = false; 
});

document.getElementById("eraserButton").addEventListener("click", function() {
    isSprayMode = false; 
    isEraserMode = true; 
});


canvas.addEventListener("mousedown", myMouseDown);

function myMouseDown(e) {
    color = document.getElementById("color").value;
    widthOfLine = document.getElementById("widthOfLine").value;

    mouseEvent = "mouseDown";
}

canvas.addEventListener("mousemove", myMouseMove);

function myMouseMove(e) {
    currentPositionOfMouseX = e.clientX - canvas.offsetLeft;
    currentPositionOfMouseY = e.clientY - canvas.offsetTop;

    if (mouseEvent == "mouseDown") {
        if (isSprayMode) {
            
            for (var i = 0; i < 50; i++) {
                var randomX = currentPositionOfMouseX + Math.random() * 10 - 5;
                var randomY = currentPositionOfMouseY + Math.random() * 10 - 5;
                ctx.fillStyle = color;
                ctx.lineWidth = widthOfLine;
                ctx.fillRect(randomX, randomY, 1, 1);
            }
        } else if (isEraserMode) {
            
            ctx.clearRect(currentPositionOfMouseX - widthOfLine / 2, currentPositionOfMouseY - widthOfLine / 2, widthOfLine, widthOfLine);
        } else {
           
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = widthOfLine;
            ctx.moveTo(lastPositionOfX, lastPositionOfY);
            ctx.lineTo(currentPositionOfMouseX, currentPositionOfMouseY);
            ctx.stroke();
        }
    }

    lastPositionOfX = currentPositionOfMouseX;
    lastPositionOfY = currentPositionOfMouseY;
}

canvas.addEventListener("mouseup", myMouseUp);

function myMouseUp(e) {
    mouseEvent = "mouseUP";
}

canvas.addEventListener("mouseleave", myMouseLeave);

function myMouseLeave(e) {
    mouseEvent = "mouseleave";
}

var lastPositionOfTouchX, lastPositionOfTouchY;
var width = screen.width;

var newWidth = screen.width - 70;
var newHeight = screen.height - 300;

if (width < 992) {
    document.getElementById("myCanvas").width = newWidth;
    document.getElementById("myCanvas").height = newHeight;
    document.body.style.overflow = "hidden";
}

canvas.addEventListener("touchstart", myTouchStart);

function myTouchStart(e) {
    color = document.getElementById("color").value;
    widthOfLine = document.getElementById("widthOfLine").value;

    lastPositionOfTouchX = e.touches[0].clientX - canvas.offsetLeft;
    lastPositionOfTouchY = e.touches[0].clientY - canvas.offsetTop;
}

canvas.addEventListener("touchmove", myTouchMove);

function myTouchMove(e) {
    currentPositionOfTouchX = e.touches[0].clientX - canvas.offsetLeft;
    currentPositionOfTouchY = e.touches[0].clientY - canvas.offsetTop;

    if (isSprayMode) {
       
        for (var i = 0; i < 20; i++) {
            var randomX = currentPositionOfTouchX + Math.random() * 10 - 5;
            var randomY = currentPositionOfTouchY + Math.random() * 10 - 5;
            ctx.fillStyle = color;
            ctx.lineWidth = widthOfLine;
            ctx.fillRect(randomX, randomY, 1, 1);
        }
    } else if (isEraserMode) {
        
        ctx.clearRect(currentPositionOfTouchX - widthOfLine / 2, currentPositionOfTouchY - widthOfLine / 2, widthOfLine, widthOfLine);
    } else {
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = widthOfLine;
        ctx.moveTo(lastPositionOfTouchX, lastPositionOfTouchY);
        ctx.lineTo(currentPositionOfTouchX, currentPositionOfTouchY);
        ctx.stroke();
    }

    lastPositionOfTouchX = currentPositionOfTouchX;
    lastPositionOfTouchY = currentPositionOfTouchY;
}
document.getElementById("bucketButton").addEventListener("click", function() {
    var fillColor = colorToRGBA(color);
    floodFill(0, 0, fillColor);
});

function colorToRGBA(hex) {

    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var a = 255;

    return [r, g, b, a];
}

function matchStartColor(pixelPos, targetColor, imageData) {
    var r = imageData.data[pixelPos];
    var g = imageData.data[pixelPos + 1];
    var b = imageData.data[pixelPos + 2];
    var a = imageData.data[pixelPos + 3];

    return (
        r === targetColor[0] &&
        g === targetColor[1] &&
        b === targetColor[2] &&
        a === targetColor[3]
    );
}
function colorPixel(pixelPos, fillColor, imageData) {
    imageData.data[pixelPos] = fillColor[0];
    imageData.data[pixelPos + 1] = fillColor[1];
    imageData.data[pixelPos + 2] = fillColor[2];
    imageData.data[pixelPos + 3] = fillColor[3];
}


function floodFill(x, y, fillColor) {
    var pixelStack = [[x, y]];
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var targetColor = getPixelColor(x, y, imageData);
    var pixelPos, reachLeft, reachRight;

    while (pixelStack.length) {
        var newPos = pixelStack.pop();
        x = newPos[0];
        y = newPos[1];

        pixelPos = (y * canvas.width + x) * 4;

        while (y-- >= 0 && matchStartColor(pixelPos, targetColor, imageData)) {
            pixelPos -= canvas.width * 4;
        }
        pixelPos += canvas.width * 4;
        ++y;
        reachLeft = false;
        reachRight = false;

        while (y++ < canvas.height - 1 && matchStartColor(pixelPos, targetColor, imageData)) {
            colorPixel(pixelPos, fillColor, imageData);

            if (x > 0) {
                if (matchStartColor(pixelPos - 4, targetColor, imageData)) {
                    if (!reachLeft) {
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if (reachLeft) {
                    reachLeft = false;
                }
            }

            if (x < canvas.width - 1) {
                if (matchStartColor(pixelPos + 4, targetColor, imageData)) {
                    if (!reachRight) {
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if (reachRight) {
                    reachRight = false;
                }
            }

            pixelPos += canvas.width * 4;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}


function getPixelColor(x, y, imageData) {
    var pixelPos = (y * imageData.width + x) * 4;
    return [
        imageData.data[pixelPos],
        imageData.data[pixelPos + 1],
        imageData.data[pixelPos + 2],
        imageData.data[pixelPos + 3]
    ];
}
canvas.addEventListener("mousedown", function(e) {
   
    if (selectedColor) {
        var x = e.clientX - canvas.offsetLeft;
        var y = e.clientY - canvas.offsetTop;

      
        ctx.fillStyle = selectedColor;
        ctx.fillRect(x, y, 1, 1);
    }
});
