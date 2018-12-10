function difficultyState(container){
    var self = this;
    this.container = container;
    this.value = 'difficultyState';
    container.state = this;
    this.next = function(_state){
        canvas.removeEventListener('click', onClick, false);
        canvas.removeEventListener('mousemove', onClick, false);
        if(_state == "titleState") return new titleState(self);
        else if(_state == "gameState") return new gameState(self);
    }

    var canvas,
        canvasLeft,
        canvasTop,
        ctx;
        
    var easyButton;
    var normalButton;
    var backButton;

    var mouse = {
        x: 0,
        y: 0
    };

    var requestId;
    var lastRender = 0;

    var stop = false;
    this.stopLoop = function(){
        if(!stop) stop = true;
        else stop = false;
    }

    function create(){
        canvas = document.getElementById('gameCanvas');
        canvasLeft = canvas.offsetLeft;
        canvasTop = canvas.offsetTop;
        ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        easyButton = new Button(easyButtonUI, canvas.width/2-easyButtonUI.width/2, canvas.height/2.3-easyButtonUI.height/2, canvas);

        normalButton = new Button(normalButtonUI, canvas.width/2-normalButtonUI.width/2, canvas.height/1.7-normalButtonUI.height/2, canvas);
    
        backButton = new Button(backButtonUI, canvas.width/2.95-backButtonUI.width/2, canvas.height/1.55-backButtonUI.height/2, canvas)

        canvas.addEventListener("click", onClick, false);
        canvas.addEventListener("mousemove", function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        requestId = window.requestAnimationFrame(loop);
    }

    function update(progress){
        easyButton.update(mouse);
        normalButton.update(mouse);
        backButton.update(mouse);
    }

    function draw(){
        drawImageProp(ctx, fondoOscurecidoUI, 0,0,canvas.width,canvas.height);
        ctx.drawImage(placeholderUI, canvas.width/2-placeholderUI.width/2, canvas.height/2-placeholderUI.height/2);

        easyButton.draw();
        normalButton.draw();
        backButton.draw();
    }

    function loop(timestamp) {
        if(!stop){
            requestId = window.requestAnimationFrame(loop);
        
            var progress = timestamp - lastRender;
        
            update(progress);
            draw();
        
            lastRender = timestamp;
        }else{
            window.cancelAnimationFrame(requestId);
        }
    }

    function onClick(event){
        var x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;
        if((x > easyButton.x && x < easyButton.x + easyButton.width) && (y > easyButton.y && y < easyButton.y + easyButton.height)){
            menuMusic.pause();
            difficulty = false;
            currentState.state.stopLoop();
            currentState.state = currentState.changeState("gameState");
        }else if((x > normalButton.x && x < normalButton.x + normalButton.width) && (y > normalButton.y && y < normalButton.y + normalButton.height)){
            menuMusic.pause();
            currentState.state.stopLoop();
            difficulty = true;
            currentState.state = currentState.changeState("gameState");
        }else if((x > backButton.x && x < backButton.x + backButton.width) && (y > backButton.y && y < backButton.y + backButton.height)){
            currentState.state.stopLoop();
            currentState.state = currentState.changeState("titleState");
        }
    }

    create();
}
var difficulty;
