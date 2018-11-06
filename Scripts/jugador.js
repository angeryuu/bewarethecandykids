function Jugador(canvas){

    this.draw = function (){
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }

    this.ctx = canvas.getContext('2d');
    this.sprite = new Image();
    this.sprite.src = "Sprites/Monstro_Final.png";
    this.x = canvas.width/2-214/2;
    this.y = canvas.height/2-209/2;

    this.update = function (progress) {
        this.x += this.dir.x * progress;
        this.y += this.dir.y * progress;
    }
    
}