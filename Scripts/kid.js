function kid(spawner, canvas, _x, _y){

    this.ctx = canvas.getContext('2d');
    this.sprite = new Image();
    this.sprite.src = "Sprites/kiddo.png";
    this.x = _x;
    this.y = _y;
    this.speed = 0.2;

    this.dir = [0,0];
    this.dir.x = (canvas.width/2) - this.x;
    this.dir.y = (canvas.height/2) - this.y;
    this.mod = Math.sqrt((this.dir.x*this.dir.x + this.dir.y*this.dir.y));
    this.dir.x = this.dir.x/this.mod;
    this.dir.y = this.dir.y/this.mod;

    this.update = function (progress) {
        this.x += this.dir.x * progress * this.speed;
        this.y += this.dir.y * progress * this.speed;

        // Si llega al centro se acaba la partida
        if(Math.abs(this.x-canvas.width/2)<30 && Math.abs(this.y-canvas.height/2)<30) {
            spawner.destroy(this);
        }
    }

    this.draw = function (){
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }

    /*canvas.addEventListener('click', function(event) {
        var x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;
            
        console.log("Hola");
    }, false);*/
}