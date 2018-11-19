function gameState(container){

    var self = this;
    this.container = container;
    this.value = 'gameState';
    container.state = this;
    this.next = function(){
        window.cancelAnimationFrame(requestId);
        requestId = undefined
        return new endState(self.container);
    }

    var canvas,
        canvasLeft,
        canvasTop,
        ctx;

    var requestId;

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

        canvas.addEventListener('click', function(event) {
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
            currentState = self.next();
        }, false);

        requestId = window.requestAnimationFrame(loop);
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
        pj.draw();

        caramelos.forEach( function(valor, i, array){
            caramelos[i].draw();
        });

        kidSpawner.draw();
    }
        
    function loop(timestamp) {
        var progress = timestamp - lastRender
        
        update(progress)
        draw()
        
        lastRender = timestamp
        if(requestId) window.requestAnimationFrame(loop)
    }

    create();
}