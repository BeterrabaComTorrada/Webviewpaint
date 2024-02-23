function downloadCanvasAsImage() {
 
    var canvas = document.getElementById("myCanvas");

    var link = document.createElement('a');
    link.download = 'meu_desenho.png'; 

    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
}
function setColor(Color) {
    color = newColor;
}

// Função para definir a largura da linha
function setLineWidth(widthOfLine) {
    widthOfLine = newWidth;
}
// Chamando a função setColor para definir a cor como vermelho
setColor("red");

// Chamando a função setLineWidth para definir a largura da linha como 3
setLineWidth(3);
