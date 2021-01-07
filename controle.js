  
let atributoMusicaTocando = document.querySelectorAll('[auxiliarOpacidade="musicaTocando"]'),
    atributoMusicaPausada = document.querySelectorAll('[auxiliarOpacidade="musicaPausada"]'),
    controleMusicaBtnIniciar = document.getElementById("controle__musica__btn__iniciar"),
    controleMusicaBtnPausar = document.getElementById("controle__musica__btn__pausar"),
    containerArcoSpectrum = document.getElementById("container__arco__spectrum"),
    musicaAtual = 0,
    musica = new Audio();

const listaDeMusicas = [
    {nome: "Lucky Strike", src: "./SONG/lucky.mp3", artista: "Tuka Trip"},
    {nome: "Dark Trap", src: "./SONG/dark.mp3", artista: "Tuka Trip"},
    {nome: "Feat com os manos", src: "./SONG/lucky.mp3", artista: "Tuka Trip, Verks, Wizzy"},
    {nome: "Pussy faz splash", src: "./SONG/dark.mp3", artista: "Tuka Trip"},
    {nome: "Holy baby", src: "./SONG/dark.mp3", artista: "Tuka Trip"},
    {nome: "Shark boy", src: "./SONG/dark.mp3", artista: "Tuka Trip"},
    {nome: "Não tinha nada", src: "./SONG/dark.mp3", artista: "Tuka Trip"},
    {nome: "É o Triiii", src: "./SONG/dark.mp3", artista: "Tuka Trip"},
    {nome: "Vinnie Jones", src: "./SONG/dark.mp3", artista: "Tuka Trip, Kubark"}
]

controleMusicaBtnIniciar.addEventListener("click", () => controlarAcaoDoUsuario(true));
controleMusicaBtnPausar.addEventListener("click", () => controlarAcaoDoUsuario(false));

function controlarAcaoDoUsuario(tocarMusica) {

    if (tocarMusica) {
        lidarComOpacidadeDoContainerAcaoUsuario(100, 0);
        lidarComOpacidadeArteCapa(100);
    } else {
        lidarComOpacidadeDoContainerAcaoUsuario(0, 100);
        lidarComOpacidadeArteCapa(0.50);
    }

    controlarMusica(tocarMusica);    

} controlarAcaoDoUsuario(false);

function controlarMusica(tocarMusica) {
    if (tocarMusica) {
        iniciarNovaMusica();
    } else {
        pausarMusica();
    }
}

function iniciarNovaMusica() {
    musica = new Audio(listaDeMusicas[musicaAtual].src);
    musica.play();

    var primeiraVez = true
    musica.addEventListener("timeupdate", () => {

        if (primeiraVez) {
            controlarSpectrumDaMusica(true)
            primeiraVez = false
        }

    }, false);
}

function pausarMusica() {
    musica.pause()
    controlarSpectrumDaMusica(false);
}

function controlarSpectrumDaMusica(musicaTocando) {
    let GifArcoSpectrum = new Image();

    if (musicaTocando) {
        GifArcoSpectrum.src = "./IMG/lucky.gif";
        containerArcoSpectrum.removeChild(containerArcoSpectrum.firstElementChild);
        containerArcoSpectrum.appendChild(GifArcoSpectrum);
    } else {
        GifArcoSpectrum.src = "./IMG/arco.png";
        containerArcoSpectrum.removeChild(containerArcoSpectrum.firstElementChild);
        containerArcoSpectrum.appendChild(GifArcoSpectrum);
    }

}

function lidarComOpacidadeArteCapa(opacidade) {
    document.getElementById("imagem__arte__capa").style.opacity = opacidade;
}

function lidarComOpacidadeDoContainerAcaoUsuario(opacidadeMusicaTocando, opacidadeMusicaPausada) {
    for(i = 0, l = atributoMusicaTocando.length; i < l; i++) {
        atributoMusicaTocando[i].style.opacity = opacidadeMusicaTocando;
    }
    for(i = 0, l = atributoMusicaPausada.length; i < l; i++) {
        atributoMusicaPausada[i].style.opacity = opacidadeMusicaPausada;
    }
}