function difficultyState(container){
    var self = this;
    this.container = container;
    this.value = 'difficultyState';
    container.state = this;
    this.next = function(_state){
        canvas.removeEventListener('click', onClick, false);
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

        draw();
    }

    function draw(){
        ctx.drawImage(fondoOscurecidoUI, 0, 0);
        ctx.drawImage(placeholderUI, canvas.width/2-placeholderUI.width/2, canvas.height/2-placeholderUI.height/2);

        easyButton.draw();
        normalButton.draw();
        backButton.draw();
    }

    function onClick(event){
        var x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;
        if((x > easyButton.x && x < easyButton.x + easyButton.width) && (y > easyButton.y && y < easyButton.y + easyButton.height)){
            menuMusic.pause();
            difficulty = false;
            currentState.state = currentState.changeState("gameState");
        }else if((x > normalButton.x && x < normalButton.x + normalButton.width) && (y > normalButton.y && y < normalButton.y + normalButton.height)){
            menuMusic.pause();
            difficulty = true;
            currentState.state = currentState.changeState("gameState");
        }else if((x > backButton.x && x < backButton.x + backButton.width) && (y > backButton.y && y < backButton.y + backButton.height)){
            currentState.state = currentState.changeState("titleState");
        }
    }

    create();
}
var difficulty;
