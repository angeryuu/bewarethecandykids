function Caramelo(canvas, _dir){
    this.ctx = canvas.getContext('2d');
    this.dir = _dir;
    this.sprite = new Image();
    this.sprite.src = "Sprites/Monstro_Final.png";
    this.sprite.onload = function () {
        this.ctx.drawImage(this.sprite,0,0);
    }
    

    this.update = function (progress) {
        this.sprite.x += dir.x * progress;
        this.sprite.y += dir.y * progress;
    }

    this.draw = function (){

    }
}