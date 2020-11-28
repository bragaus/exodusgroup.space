// quando toc

let playlist = document.getElementById("TABLE__")
let play = document.getElementById("PLAY__")
let pause = document.getElementById("PAUSE__")
let proximaMusica = document.getElementById("PROXIMA__MUSICA")
let musicaAnterior = document.getElementById("MUSICA__ANTERIOR")
var musicaAtual = 0

const conteudo = [
    {nome: "lucky strike", src: "./lucky.wav"},
    {nome: "outra", src: "./dark.wav"},
]

function trocarDeMusica(proximaMusica) {
    
    if (proximaMusica) {
        if (musicaAtual < conteudo.length - 1) {
            musicaAtual += 1
        } else {
            musicaAtual = 0
        }
    }

    if (!proximaMusica) {
        if (musicaAtual > 0) {
            musicaAtual -= 1
        } else {
            musicaAtual = 0
        }
    }


    IniciarNovaMusica(musicaAtual).play()

}

proximaMusica.addEventListener("click", () => trocarDeMusica(true))
musicaAnterior.addEventListener("click", () => trocarDeMusica(false))

function IniciarNovaMusica(musicaAtual) {
    if (typeof(musica) !== "undefined")
        musica.pause()

    var tr = document.getElementsByTagName("TR")
    console.log(tr)

    // .style.backgroundColor = "grey"   
    document.getElementById(conteudo[musicaAtual].nome).style.backgroundColor = "aqua"
    
    return musica = new Audio(conteudo[musicaAtual].src);
 
}

play.addEventListener("click", () => {

    play.style.display = "none"
    pause.style.display = "block"
    musica.play()


})

pause.addEventListener("click", () => {
    play.style.display = "block"
    pause.style.display = "none"
    musica.pause()
})


conteudo.forEach((e) => {
    playlist.innerHTML += 
    `<tr id="${e.nome}">
        <td>${e.nome}</td>
        <td>${e.src}</tr>
    </tr>`
})
