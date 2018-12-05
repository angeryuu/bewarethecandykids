var audioFiles = [
    "Audio/Vampiro/v_aparece.mp3",
    "Audio/Vampiro/v_mastica.mp3",
    "Audio/Frankestein/f_aparece.mp3",
    "Audio/Frankestein/f_bocado.mp3",
    "Audio/Frankestein/f_mastica.mp3",
    "Audio/Lobo/l_aparece.mp3",
    "Audio/Lobo/l_desplaza.mp3",
    "Audio/Lobo/l_mastica.mp3",
    "Audio/Bruja/b_aparece.mp3",
    "Audio/Bruja/b_tele.mp3",
    "Audio/Bruja/b_mastica.mp3",
    "Audio/Demonio/d_aparece.mp3",
    "Audio/Demonio/d_divide.mp3",
    "Audio/Demonio/d_mastica.mp3"
];
var audios = [];

var musicFiles = [
    "Audio/ckmenuTheme.mp3",
    "Audio/ckgameTheme.mp3"
];
var ost = [];

var backgroundFiles = [
    "Sprites/background0.png",
    "Sprites/background1.png",
    "Sprites/background2.png",
    "Sprites/background3.png"
];
var backgrounds = [];

var uiFiles = [
    "img/UI/backbutton.png",
    "img/UI/creditsbutton.png",
    "img/UI/easybutton.png",
    "img/UI/fondoOscurecido.png",
    "img/UI/gameOver.png",
    "img/UI/normalbutton.png",
    "img/UI/placeholder.png",
    "img/UI/playbutton.png",
    "img/UI/pausebutton.png",
    "img/UI/resumeGame.png",
    "img/UI/ranking.png",
    "img/UI/loading.png",
    "img/UI/loadbutton.png"
];

var backButtonUI;
var creditsButtonUI;
var easyButtonUI;
var fondoOscurecidoUI;
var gameOverUI;
var normalButtonUI;
var placeholderUI;
var playButtonUI;
var pausebuttonUI;
var resumeGameUI;
var rankingUI;
var loadingUI;
var loadbuttonUI;

function preloadAudio(url) {
    var audio = new Audio();
    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.src = url;
    return audio;
}

var loaded = 0;
function loadedAudio() {
    loaded++;
    if (loaded == backgroundFiles.length + audioFiles.length + uiFiles.length + musicFiles.length){
        currentState.state.loadButton.draw();
    }
}

function preloadImage(url){
    var image = new Image();
    image.addEventListener('load', loadedImage, false);
    image.src = url;
    return image;
}

function loadedImage() {
    loaded++;
    if (loaded == backgroundFiles.length + audioFiles.length + uiFiles.length + musicFiles.length){
        currentState.state.loadButton.draw();
    }
}