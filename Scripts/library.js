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

var backgroundFiles = [
    "Sprites/background0.png",
    "Sprites/background1.png",
    "Sprites/background2.png",
    "Sprites/background3.png"
];
var backgrounds = [];

function preloadAudio(url, i) {
    audios[i] = new Audio();
    audios[i].addEventListener('canplaythrough', loadedAudio, false);
    audios[i].src = url;
}

var loaded = 0;
function loadedAudio() {
    loaded++;
    if (loaded == backgroundFiles.length + audioFiles.length){
        currentState.state.playButton.draw();
    }
}

function preloadImage(url, i){
    backgrounds[i] = new Image();
    backgrounds[i].addEventListener('load', loadedImage, false);
    backgrounds[i].src = url;
}

function loadedImage() {
    loaded++;
    if (loaded == backgroundFiles.length + audioFiles.length){
        currentState.state.playButton.draw();
    }
}