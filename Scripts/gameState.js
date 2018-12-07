function gameState(container){

    var self = this;
    this.container = container;
    this.value = 'gameState';
    container.state = this;
    this.next = function(_state){
            canvas.removeEventListener('click', onClick, false);
            canvas.removeEventListener('mousemove', onClick, false);
            music.pause();
            if(_state == "endState"){
                return new endState(self);
            }else if(_state == "titleState"){
                return new titleState(self);
            }
    }

    this.finishGame = function(){
        window.cancelAnimationFrame(requestId);

        setTimeout(function(){

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(backgrounds[3],0,0);
            ctx.drawImage(backgrounds[2],0,0);

            ctx.drawImage(gameOverUI, canvas.width/2-gameOverUI.width/2, canvas.height/2-gameOverUI.height/2);

            ctx.drawImage(backgrounds[1],0,0);
            ctx.drawImage(backgrounds[0],0,0);
        }, 0);

        setTimeout(function(){
            currentState.state = currentState.changeState("endState");
        }, 1000);
    }

    var stop;
    this.stopLoop = function(){
        if(!stop) stop = true;
        else stop = false;
    }

    var mouse = {
        x: 0,
        y: 0
    };

    var canvas,
        canvasLeft,
        canvasTop,
        ctx;

    var requestId;

    var lastRender = 0;
            
    var pj;
    var caramelos = [];

    var music;
    var candySound;

    var pauseButton;
    var resumeButton;
    var backButton;

    var pause = false;

    function create(){
        canvas = document.getElementById('gameCanvas');
        canvasLeft = canvas.offsetLeft;
        canvasTop = canvas.offsetTop;
        ctx = canvas.getContext('2d');

        pj = new Jugador(canvas);
        kidSpawner = new spawner(canvas);

        canvas.addEventListener('click', onClick, false);
        canvas.addEventListener("mousemove", function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        stop = false;
        candySound=new Audio("Audio/fx_caramelo.mp3");
        candySound.volume=0.088;
        music = ost[1];
        music.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        },false);
        music.volume = 0.04*4.3 ;
        music.currentTime = 0;
        music.play();
     
        pauseButton = new Button(pauseButtonUI, canvas.width-playButtonUI.width/2, playButtonUI.height/4, canvas);
        resumeButton = new Button(resumeGameUI, canvas.width/1.8-resumeGameUI.width/2, canvas.height/2-resumeGameUI.height/2, canvas);
        backButton = new Button(backButtonUI, canvas.width/2.3-backButtonUI.width/2, canvas.height/2-backButtonUI.height/2, canvas)
     
        requestId = window.requestAnimationFrame(loop);
    }

    function update(progress) {
        if(progress > 20) progress = 16;

        if(!pause){
            pauseButton.update(mouse);

            caramelos.forEach( function(valor, i, array){
                caramelos[i].update(progress);
                if(caramelos[i].destroyed) caramelos.splice(i,1);
            });
            pj.update();
            kidSpawner.update(progress);

        }else{
            resumeButton.update(mouse);
            backButton.update(mouse);
        }
    }
        
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(backgrounds[3],0,0);
        ctx.drawImage(backgrounds[2],0,0);

        pj.draw();

        caramelos.forEach( function(valor, i, array){
            caramelos[i].draw();
        });

        kidSpawner.draw();

        ctx.drawImage(backgrounds[1],0,0);
        ctx.drawImage(backgrounds[0],0,0);

        pauseButton.draw();

        if(pause){
            ctx.globalAlpha = 0.6;
            ctx.fillRect(0,0,canvas.width, canvas.height);
            ctx.globalAlpha = 1.0;

            ctx.drawImage(placeholderUI, canvas.width/2-placeholderUI.width/2, canvas.height/2-placeholderUI.height/2)
            resumeButton.draw();
            backButton.draw();
        }
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
        var newKid = kidSpawner.click(x,y);
        if (newKid != null && newKid.target == null) {
            var dir = [0,0];
            dir.x = newKid.x+25 - (pj.x + pj.spriteWidth/2);
            dir.y = newKid.y+40 - (pj.y + pj.spriteHeight/2);
            var mod = Math.sqrt((dir.x*dir.x)+(dir.y*dir.y));
            dir.x = dir.x/mod;
            dir.y = dir.y/mod;
            newKid.target = true;
            candySound.play();
            caramelos.push(new Caramelo(canvas, newKid, dir, pj.x + pj.spriteWidth/2, pj.y + pj.spriteHeight/2));
            pj.throw(x);
        }

        if((x > pauseButton.x && x < pauseButton.x + pauseButton.width) && (y > pauseButton.y && y < pauseButton.y + pauseButton.height) && !pause){
            pause = true;
        }else if((x > resumeButton.x && x < resumeButton.x + resumeButton.width) && (y > resumeButton.y && y < resumeButton.y + resumeButton.height) && pause){
            pause = false;
        }else if((x > backButton.x && x < backButton.x + backButton.width) && (y > backButton.y && y < backButton.y + backButton.height) && pause){
            currentState.state = currentState.changeState("titleState");
        }
        
    }

    create();
}