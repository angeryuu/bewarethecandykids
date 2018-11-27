function gameState(container){

    var self = this;
    this.container = container;
    this.value = 'gameState';
    container.state = this;
    this.next = function(){
            console.log("next");
            canvas.removeEventListener('click', onClick, false);
            return new endState(self);
    }

    var stop;
    this.stopLoop = function(){
        /*if (requestId) {
            window.cancelAnimationFrame(requestId);
        }*/
        stop = true;
    }

    var canvas,
        canvasLeft,
        canvasTop,
        ctx;

    var requestId;

    var background = [];
    for(var i=0; i<4; i++) {
        background[i] = new Image();
        background[i].src = "Sprites/background" + i + ".png";
    }
    //background[3] = new Image();
    //background[3] = "Sprites/background3.jpg";

    var lastRender = 0;
            
    var pj;
    var caramelos = [];

    function create(){
        canvas = document.getElementById('gameCanvas');
        canvasLeft = canvas.offsetLeft;
        canvasTop = canvas.offsetTop;
        ctx = canvas.getContext('2d');

        pj = new Jugador(canvas);
        kidSpawner = new spawner(canvas);

        canvas.addEventListener('click', onClick, false);

        requestId = window.requestAnimationFrame(loop);
        stop = false;

        var music = new Audio("Audio/ckgameTheme.mp3");
        music.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        },false);
        music.volume = 0.8;
        music.play();
    }

    function update(progress) {

        caramelos.forEach( function(valor, i, array){
            caramelos[i].update(progress);
            if(caramelos[i].destroyed) caramelos.splice(i,1);
        });

        kidSpawner.update(progress);
    }
        
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(background[3],0,0);
        ctx.drawImage(background[2],0,0);

        pj.draw();

        caramelos.forEach( function(valor, i, array){
            caramelos[i].draw();
        });

        kidSpawner.draw();

        ctx.drawImage(background[1],0,0);
        ctx.drawImage(background[0],0,0);
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
            currentState.state = currentState.changeState();
        }
    }

    function onClick(){
        var x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;
        var newKid = kidSpawner.click(x,y);
        if (newKid != null && newKid.target == null) {
            var dir = [0,0];
            dir.x = newKid.x+25 - (pj.x + pj.sprite.width/2);
            dir.y = newKid.y+40 - (pj.y + pj.sprite.height/2);
            var mod = Math.sqrt((dir.x*dir.x)+(dir.y*dir.y));
            dir.x = dir.x/mod;
            dir.y = dir.y/mod;
            newKid.target = true;
            caramelos.push(new Caramelo(canvas, newKid, dir, pj.x + pj.sprite.width/2, pj.y + pj.sprite.height/2));
        }
    }

    create();
}


