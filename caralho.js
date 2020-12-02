let playlist = document.getElementById("TABLE__")
let play = document.getElementById("PLAY__")
let pause = document.getElementById("PAUSE__")
let proximaMusica = document.getElementById("PROXIMA__MUSICA")
let musicaAnterior = document.getElementById("MUSICA__ANTERIOR")
let containerAlbumCover = document.getElementById("container--album--cover")
let tr = document.getElementsByClassName("TR_PLAYLIST_INNERHTML")
let estilo = document.head.appendChild(document.createElement("style"))
let divPlaylist = document.getElementById("_PLAY__LIST_")

var musicaAtual = 0

divPlaylist.style.display = "none"
play.style.display = "block"

const conteudo = [
    {nome: "lucky strike", src: "./lucky.wav"},
    {nome: "outra", src: "./dark.wav"},
    {nome: "caralho", src: "./lucky.wav"},
    {nome: "porra", src: "./dark.wav"},
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
        } else if (musicaAtual === 0) {
            musicaAtual = conteudo.length - 1
        }
    }

    colorirLinhaMusicaAtiva(musicaAtual)
    // IniciarNovaMusica(musicaAtual).play()

    // if (play.style.display === "block") {
    //     play.style.display = "none"
    //     pause.style.display = "block"
    //     divPlaylist.style.display = "block"
    //     estilo.innerHTML = "#container--album--cover:before {opacity: 100}"
    // }
}

proximaMusica.addEventListener("click", () => trocarDeMusica(true))
musicaAnterior.addEventListener("click", () => trocarDeMusica(false))

function colorirLinhaMusicaAtiva(musicaAtual) {
    for (var i = 0; i < tr.length; i++) {
        tr[i].style.backgroundColor = "#363636"
        tr[i].style.color = "white"
    }
    document.getElementById(conteudo[musicaAtual].nome).style.color = "black"
    document.getElementById(conteudo[musicaAtual].nome).style.backgroundColor = "aqua"
    return musica = new Audio(conteudo[musicaAtual].src);
}

function IniciarNovaMusica(musicaAtual) {
    if (typeof(musica) !== "undefined")
        musica.pause()

    // var tr = document.getElementsByClassName("TR_PLAYLIST_INNERHTML")
    
    // for (var i = 0; i < tr.length; i++) {
    //     tr[i].style.backgroundColor = "#363636"
    //     tr[i].style.color = "white"
    // }
    // document.getElementById(conteudo[musicaAtual].nome).style.backgroundColor = "aqua"
    colorirLinhaMusicaAtiva(musicaAtual)
    estilo.innerHTML = "#container--album--cover:before {opacity: 100}"
    if (divPlaylist.style.display === "none") divPlaylist.style.display = "block"
    return musica = new Audio(conteudo[musicaAtual].src);
    
}

play.addEventListener("click", () => {

    play.style.display = "none"
    pause.style.display = "block"
    estilo.innerHTML = "#container--album--cover:before {opacity: 100}"
    if (divPlaylist.style.display === "none") divPlaylist.style.display = "block"

    if (typeof musica === "undefined") {
        IniciarNovaMusica(musicaAtual).play()
    } else {
        musica.play()
    }

})

pause.addEventListener("click", () => {
    play.style.display = "block"
    pause.style.display = "none"
    estilo.innerHTML = "#container--album--cover:before {opacity: 0.50}"
    musica.pause()
})

var contadorAuxiliarPlaylistInnerHTML = 0
conteudo.forEach((e) => {

    playlist.innerHTML += 
    `<tr id="${e.nome}" class="TR_PLAYLIST_INNERHTML" onClick="IniciarMusicaApartirDoClique(${contadorAuxiliarPlaylistInnerHTML})">
        <td>${e.nome}</td>
        <td>${e.src}</tr>
    </tr>`

    contadorAuxiliarPlaylistInnerHTML += 1
})

function IniciarMusicaApartirDoClique(musicaAtual) {
    IniciarNovaMusica(musicaAtual).play()

    if (play.style.display === "block") {
        play.style.display = "none"
        pause.style.display = "block"
    }    
}