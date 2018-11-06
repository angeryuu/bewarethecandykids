function Caramelo(canvas, _dir, _x, _y){

    this.draw = function (){
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }

    this.ctx = canvas.getContext('2d');
    this.dir = _dir;
    this.sprite = new Image();
    this.sprite.src = "Sprites/Monstro_Final.png";
    this.x = _x;
    this.y = _y;

    this.update = function (progress) {
        this.x += this.dir.x * progress;
        this.y += this.dir.y * progress;
    }

    this.destroy = function(){
        delete this;
    }
}