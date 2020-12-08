let playlist = document.getElementById("TABLE__")
let play = document.getElementById("PLAY__")
let pause = document.getElementById("PAUSE__")
let proximaMusica = document.getElementById("PROXIMA__MUSICA")
let musicaAnterior = document.getElementById("MUSICA__ANTERIOR")
let containerAlbumCover = document.getElementById("container--album--cover")
let tr = document.getElementsByClassName("TR_PLAYLIST_INNERHTML")
let estilo = document.head.appendChild(document.createElement("style"))
let divPlaylist = document.getElementById("_PLAY__LIST_")
let linhaDoTempo = document.getElementById("LINHA__DO__TEMPO")
let progressoPaNois = document.getElementById("PROGRESSO__PA__NOIS")
let timelineWidth = document.getElementById("PROGRESSO__PA__NOIS").offsetWidth
let titulo = document.getElementById("MEU__AMIGO__ARTISTE")
let subTitulo = document.getElementById("MUSICA_DO_MEU_AMIGO_ARTISTE")
let duration
var musicaAtual = 0

divPlaylist.style.display = "none"
play.style.display = "block"
musicaAnterior.style.opacity = 0
proximaMusica.style.opacity = 0
// pause.style.display = "block"
titulo.style.display = "none"
subTitulo.style.display = "none"

const conteudo = [
    {nome: "Lucky Strike", src: "./SONG/lucky.mp3", artista: "Tuka Trip"},
    {nome: "Dark Trap", src: "./SONG/dark.mp3", artista: "Tuka Trip"},
    {nome: "teste 3", src: "./SONG/lucky.mp3", artista: "Tuka Trip, Verks, Wizzy"},
    {nome: "teste 4", src: "./SONG/dark.mp3", artista: "Tuka Trip, Kubark"},
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
    progressoPaNois.style.width = 0;
    titulo.innerHTML = conteudo[musicaAtual].artista.toLocaleUpperCase()
    subTitulo.innerHTML = conteudo[musicaAtual].nome.toLocaleUpperCase()

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

    colorirLinhaMusicaAtiva(musicaAtual)
    estilo.innerHTML = "#container--album--cover:before {opacity: 100}"
    if (divPlaylist.style.display === "none") divPlaylist.style.display = "block"

    musica = new Audio(conteudo[musicaAtual].src)
    musica.addEventListener("canplaythrough", () => {
        duration = musica.duration
    }, false);
    musica.addEventListener("timeupdate", timeUpdate, false);
    return musica
}

play.addEventListener("click", () => {

    play.style.display = "none"
    pause.style.display = "block"
    estilo.innerHTML = "#container--album--cover:before {opacity: 100}"
    titulo.style.display = "block"
    subTitulo.style.display = "block"

    if (divPlaylist.style.display === "none") {
        divPlaylist.style.display = "block"
    }

    if (typeof musica === "undefined") {
        IniciarNovaMusica(musicaAtual).play()
    } else {
        musica.play()
    }

    musica.addEventListener("timeupdate", timeUpdate, false);
    titulo.innerHTML = conteudo[musicaAtual].artista.toLocaleUpperCase()
    subTitulo.innerHTML = conteudo[musicaAtual].nome.toLocaleUpperCase()
})

function timeUpdate() {
    progressoPaNois.style.width = 0;
    var playPercent = 250 * (musica.currentTime / duration);
    progressoPaNois.style.width = playPercent + "px";
    musica.onended = function () {
        trocarDeMusica(true)
        musica.play()
        musica.addEventListener("timeupdate", timeUpdate, false);
    }
}

pause.addEventListener("click", () => {
    play.style.display = "block"
    pause.style.display = "none"
    estilo.innerHTML = "#container--album--cover:before {opacity: 0.50}"
    musicaAnterior.style.opacity = 100
    proximaMusica.style.opacity = 100    
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
    musica.addEventListener("timeupdate", timeUpdate, false);
    titulo.innerHTML = conteudo[musicaAtual].artista.toLocaleUpperCase()
    subTitulo.innerHTML = conteudo[musicaAtual].nome.toLocaleUpperCase()
    if (play.style.display === "block") {
        play.style.display = "none"
        pause.style.display = "block"
    }    
}