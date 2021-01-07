arrastarDiv(document.getElementById("container__conteudo__lista__musica"));

function arrastarDiv(div) {

    var posicao1 = 0, posicao2 = 0, posicao3 = 0, posicao4 = 0;

    div.onmousedown = onMouseDown;
    
    function onMouseDown(e) {
        e = e || window.event;
    
        e.preventDefault();
    
        posicao3 = e.clienteX;
        posicao4 = e.clientY;
        document.onmouseup = onMouseUp;
        // call a function whenever the cursor moves:
        document.onmousemove = onMouseMove;    
    }

    function onMouseMove(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        posicao1 = posicao3 - e.clientX;
        posicao2 = posicao4 - e.clientY;
        posicao3 = e.clientX;
        posicao4 = e.clientY;
        // set the element's new position:
        div.style.top = (div.offsetTop - posicao2) + "px";
        div.style.left = (div.offsetLeft - posicao1) + "px";
      }
    
      function onMouseUp() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }

}

