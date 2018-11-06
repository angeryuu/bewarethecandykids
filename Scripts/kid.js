function kid(canvas, _x, _y){

    this.ctx = canvas.getContext('2d');
    this.sprite = new Image();
    this.sprite.src = "Sprites/kiddo.png";
    this.x = _x;
    this.y = _y;

    this.dir = [0,0];
    this.dir.x = (canvas.width/2) - this.x;
    this.dir.y = (canvas.height/2) - this.y;
    this.mod = Math.sqrt((this.dir.x*this.dir.x + this.dir.y*this.dir.y));
    this.dir.x = this.dir.x/this.mod;
    this.dir.y = this.dir.y/this.mod;
    console.log(this.dir);

    this.update = function (progress) {
        this.x += this.dir.x * progress;
        this.y += this.dir.y * progress;
    }

    this.draw = function (){
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }
}