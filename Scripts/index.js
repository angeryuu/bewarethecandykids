window.onload = function(){
    var canvas,
        canvasLeft,
        canvasTop,
        ctx;
        
    var pj;
    var caramelos = [];

    function create(){
        canvas = document.getElementById('gameCanvas');
        canvasLeft = canvas.offsetLeft;
        canvasTop = canvas.offsetTop;
        ctx = canvas.getContext('2d');

        canvas.addEventListener('click', function(event) {
            var x = event.pageX - canvasLeft,
                y = event.pageY - canvasTop;
                var dir = [0,0];
                dir.x = x-pj.x;
                dir.y = y-pj.y;
                var mod = Math.sqrt(x*x + y*y);
                dir.x = dir.x/mod;
                dir.y = dir.y/mod;
                caramelos.push(new Caramelo(canvas, dir));
            console.log('x:' + x + ' y:' + y);
        }, false);

        pj = new Image();
        pj.onload = function () {
            ctx.drawImage(pj, 400-pj.width/2, 300-pj.height/2);
        }
        pj.src = "Sprites/Monstro_Final.png";
    }

    function update(progress) {
        caramelos.forEach( function(){
            caramelos[i].update(progress);
        });
    }
      
    function draw() {
        
    }
      
    function loop(timestamp) {
        var progress = timestamp - lastRender
      
        update(progress)
        draw()
      
        lastRender = timestamp
        window.requestAnimationFrame(loop)
    }
    create();
    var lastRender = 0;
    window.requestAnimationFrame(loop);
    
}