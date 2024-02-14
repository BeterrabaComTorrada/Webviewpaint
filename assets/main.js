var mouseEvent = "empty";
var lastPositionOfX, lastPositionOfY;
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var color = "black";
var widthOfLine = 1;
var isSprayMode = false; // Variável para alternar entre pincel e spray
var isEraserMode = false; // Variável para alternar entre pincel e borracha

// Adiciona evento de clique ao botão para alternar para o modo pincel
document.getElementById("pencilButton").addEventListener("click", function() {
    isSprayMode = false; // Desativa o modo spray
    isEraserMode = false; // Desativa o modo borracha
});

// Adiciona evento de clique ao botão para alternar para o modo spray
document.getElementById("sprayButton").addEventListener("click", function() {
    isSprayMode = true; // Ativa o modo spray
    isEraserMode = false; // Desativa o modo borracha
});

// Adiciona evento de clique ao botão para alternar para o modo borracha
document.getElementById("eraserButton").addEventListener("click", function() {
    isSprayMode = false; // Desativa o modo spray
    isEraserMode = true; // Ativa o modo borracha
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
            // Lógica para o modo spray
            for (var i = 0; i < 20; i++) {
                var randomX = currentPositionOfMouseX + Math.random() * 10 - 5;
                var randomY = currentPositionOfMouseY + Math.random() * 10 - 5;
                ctx.fillStyle = color;
                ctx.fillRect(randomX, randomY, 1, 1);
            }
        } else if (isEraserMode) {
            // Lógica para o modo borracha
            ctx.clearRect(currentPositionOfMouseX - widthOfLine / 2, currentPositionOfMouseY - widthOfLine / 2, widthOfLine, widthOfLine);
        } else {
            // Lógica para o modo pincel
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
        // Lógica para o modo spray
        for (var i = 0; i < 20; i++) {
            var randomX = currentPositionOfTouchX + Math.random() * 10 - 5;
            var randomY = currentPositionOfTouchY + Math.random() * 10 - 5;
            ctx.fillStyle = color;
            ctx.fillRect(randomX, randomY, 1, 1);
        }
    } else if (isEraserMode) {
        // Lógica para o modo borracha
        ctx.clearRect(currentPositionOfTouchX - widthOfLine / 2, currentPositionOfTouchY - widthOfLine / 2, widthOfLine, widthOfLine);
    } else {
        // Lógica para o modo pincel
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
