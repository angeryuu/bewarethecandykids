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
    this.playButton = new Button("PLAY", "#2bd5a2", 500, 500, 100, 50, canvas);

    function loading(){
        console.log("loading");
        for (var i=0; i<audioFiles.length;i++) {
            preloadAudio(audioFiles[i], i);
        }
        for (var i=0; i<backgroundFiles.length;i++) {
            preloadImage(backgroundFiles[i], i);
        }

        canvas.addEventListener("click", onClick, false);
    }

    function onClick(){
        var x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;
        if(loaded == backgroundFiles.length + audioFiles.length){
            if(x > currentState.state.playButton.x && x < currentState.state.playButton.x + currentState.state.playButton.width){
                if(y > currentState.state.playButton.y && y < currentState.state.playButton.y + currentState.state.playButton.height){
                    currentState.state = currentState.changeState("titleState");
                }
            }
        }
    }

    loading();
}