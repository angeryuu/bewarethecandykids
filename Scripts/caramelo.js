function Caramelo(canvas, target, _dir, _x, _y){

    this.draw = function (){
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }

    this.ctx = canvas.getContext('2d');
    this.dir = _dir;
    this.sprite = new Image();
    this.sprite.src = "Sprites/candy.png";
    this.x = _x;
    this.y = _y;
    this.speed = 0.8;
    this.destroyed = false;

    this.update = function (progress) {
        this.x += this.dir.x * progress * this.speed;
        this.y += this.dir.y * progress * this.speed;

        if (this.x>target.x && this.x<target.x+50 && this.y>target.y && this.y<target.y+80)
        {
            target.destroy();
            this.destroy();
        }
    }

    this.destroy = function(){
        //delete this;
        this.destroyed = true;
    }
}