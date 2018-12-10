function loaderState(container) {
    var self = this;
    this.container = container;
    this.value = 'loaderState';
    container.state = this;

    this.next = function (_state) {
        canvas.removeEventListener('click', onClick, false);
        canvas.removeEventListener('mousemove', onClick, false);
        if (_state == "titleState") {
            return new titleState(self);
        }
    }

    var requestId;
    var lastRender = 0;

    var stop = true;
    this.stopLoop = function () {
        if (!stop) stop = true;
        else {
            requestId = window.requestAnimationFrame(loop);
            stop = false;
        }
    }

    var canvas,
        canvasLeft,
        canvasTop,
        ctx;

    var mouse = {
        x: 0,
        y: 0
    };

    canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasLeft = canvas.offsetLeft;
    canvasTop = canvas.offsetTop;

    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.loadButton;
    loadButtonUI = new Image();
    loadButtonUI.addEventListener('load', function () {
        loaded++;
        currentState.state.loadButton = new Button(loadButtonUI, canvas.width / 2 - loadButtonUI.width / 2, canvas.height / 1.8 - loadButtonUI.height / 2, canvas);
    }, false);
    loadButtonUI.src = uiFiles[12];

    var bgloading = 0;

    fondoOscurecidoUI = new Image();
    fondoOscurecidoUI.addEventListener('load', function () {
        bgloading++;
        loaded++;
        if (bgloading == 1) {
            ctx.drawImage(fondoOscurecidoUI, 0, 0);
        } else {
            ctx.drawImage(fondoOscurecidoUI, 0, 0);
            ctx.drawImage(loadingUI, canvas.width / 2 - loadingUI.width / 2, canvas.height / 2 - loadingUI.height / 2);
        }
    }, false);
    fondoOscurecidoUI.src = uiFiles[3];
    loadingUI = new Image();
    loadingUI.addEventListener('load', function () {
        bgloading++;
        loaded++;
        if (bgloading == 2) {
            ctx.drawImage(loadingUI, canvas.width / 2 - loadingUI.width / 2, canvas.height / 2 - loadingUI.height / 2);
        } else {
            ctx.drawImage(fondoOscurecidoUI, 0, 0);
            ctx.drawImage(loadingUI, canvas.width / 2 - loadingUI.width / 2, canvas.height / 2 - loadingUI.height / 2);
        }
    }, false);
    loadingUI.src = uiFiles[11];


    function loading() {

        ctx.drawImage(loadingUI, 0, 0);

        for (var i = 0; i < audioFiles.length; i++) {
            audios[i] = preloadAudio(audioFiles[i]);
        }
        for (var i = 0; i < musicFiles.length; i++) {
            ost[i] = preloadAudio(musicFiles[i]);
        }
        for (var i = 0; i < backgroundFiles.length; i++) {
            backgrounds[i] = preloadImage(backgroundFiles[i]);
        }
        backButtonUI = preloadImage(uiFiles[0]);
        creditsButtonUI = preloadImage(uiFiles[1]);
        easyButtonUI = preloadImage(uiFiles[2]);
        gameOverUI = preloadImage(uiFiles[4]);
        normalButtonUI = preloadImage(uiFiles[5]);
        placeholderUI = preloadImage(uiFiles[6]);
        playButtonUI = preloadImage(uiFiles[7]);
        pauseButtonUI = preloadImage(uiFiles[8])
        resumeGameUI = preloadImage(uiFiles[9]);
        rankingUI = preloadImage(uiFiles[10]);
        resumebuttonUI = preloadImage(uiFiles[13]);
        exitbuttonUI = preloadImage(uiFiles[14]);

        canvas.addEventListener("click", onClick, false);
        canvas.addEventListener("mousemove", function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

    }

    function update(progress) {
        currentState.state.loadButton.update(mouse);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageProp(ctx, fondoOscurecidoUI, 0,0,canvas.width,canvas.height);
        ctx.drawImage(loadingUI, canvas.width / 2 - loadingUI.width / 2, canvas.height / 2 - loadingUI.height / 2);

        currentState.state.loadButton.draw();
    }

    function loop(timestamp) {
        if (!stop) {
            requestId = window.requestAnimationFrame(loop);

            var progress = timestamp - lastRender;

            update(progress);
            draw();

            lastRender = timestamp;
        } else {
            window.cancelAnimationFrame(requestId);
        }
    }

    function onClick(event) {
        var x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;
        if (loaded == backgroundFiles.length + audioFiles.length + uiFiles.length + musicFiles.length) {
            if (x > currentState.state.loadButton.x && x < currentState.state.loadButton.x + currentState.state.loadButton.width) {
                if (y > currentState.state.loadButton.y && y < currentState.state.loadButton.y + currentState.state.loadButton.height) {
                    currentState.state.stopLoop();
                    currentState.state = currentState.changeState("titleState");
                }
            }
        }
    }
    loading();
}