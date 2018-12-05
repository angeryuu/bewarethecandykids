function loaderState(container){
    var self = this;
    this.container = container;
    this.value = 'loaderState';
    container.state = this;
    this.next = function(_state){
        canvas.removeEventListener('click', onClick, false);
        if(_state == "titleState"){
            return new titleState(self);
        }
    }
    
    var canvas,
        canvasLeft,
        canvasTop,
        ctx;

    canvas = document.getElementById('gameCanvas');
    canvasLeft = canvas.offsetLeft;
    canvasTop = canvas.offsetTop;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadButtonUI = preloadImage(uiFiles[12]);
    this.loadButton = new Button(loadButtonUI, canvas.width/2-loadButtonUI.width/2, canvas.height/1.8-loadButtonUI.height/2, canvas);

    var bgloading = 0;

    fondoOscurecidoUI = new Image();
    fondoOscurecidoUI.addEventListener('load', function(){
        bgloading++;
        loaded++;
        if(bgloading == 1){
            ctx.drawImage(fondoOscurecidoUI, 0,0);
        }else{
            ctx.drawImage(fondoOscurecidoUI, 0,0);
            ctx.drawImage(loadingUI, canvas.width/2-loadingUI.width/2, canvas.height/2-loadingUI.height/2);
        }
    },false);
    fondoOscurecidoUI.src = uiFiles[3];
    loadingUI = new Image();
    loadingUI.addEventListener('load', function(){
        bgloading++;
        loaded++;
        if(bgloading == 2){
            ctx.drawImage(loadingUI, canvas.width/2-loadingUI.width/2, canvas.height/2-loadingUI.height/2);
        }else{
            ctx.drawImage(fondoOscurecidoUI, 0,0);
            ctx.drawImage(loadingUI, canvas.width/2-loadingUI.width/2, canvas.height/2-loadingUI.height/2);
        }
    },false);
    loadingUI.src = uiFiles[11];


    function loading(){

        ctx.drawImage(loadingUI,0,0);

        for (var i=0; i<audioFiles.length;i++) {
            audios[i] = preloadAudio(audioFiles[i]);
        }
        for (var i=0; i<musicFiles.length;i++) {
            ost[i] = preloadAudio(musicFiles[i]);
        }
        for (var i=0; i<backgroundFiles.length;i++) {
            backgrounds[i] = preloadImage(backgroundFiles[i]);
        }
        backButtonUI = preloadImage(uiFiles[0]);
        creditsButtonUI = preloadImage(uiFiles[1]);
        easyButtonUI = preloadImage(uiFiles[2]);
        gameOverButtonUI = preloadImage(uiFiles[4]);
        normalButtonUI = preloadImage(uiFiles[5]);
        placeholderUI = preloadImage(uiFiles[6]);
        playButtonUI = preloadImage(uiFiles[7]);
        pausebuttonUI = preloadImage(uiFiles[8])
        resumeGameUI = preloadImage(uiFiles[9]);
        rankingUI = preloadImage(uiFiles[10]);

        canvas.addEventListener("click", onClick, false);
    }

    function onClick(event){
        var x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;
        if(loaded == backgroundFiles.length + audioFiles.length + uiFiles.length + musicFiles.length){
            if(x > currentState.state.loadButton.x && x < currentState.state.loadButton.x + currentState.state.loadButton.width){
                if(y > currentState.state.loadButton.y && y < currentState.state.loadButton.y + currentState.state.loadButton.height){
                    currentState.state = currentState.changeState("titleState");
                }
            }
        }
    }

    loading();
}