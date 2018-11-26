function kid(spawner, canvas, _x, _y){

    this.ctx = canvas.getContext('2d');
    this.sprite = new Image();
    this.sprite.src = "Sprites/kiddo.png";
    this.x = _x;
    this.y = _y;
    this.speed = 0.2;
    var margin = 10;

    this.dir = [0,0];
    this.dir.x = (canvas.width/2) - this.x;
    this.dir.y = (canvas.height/2) - this.y;
    this.mod = Math.sqrt((this.dir.x*this.dir.x + this.dir.y*this.dir.y));
    this.dir.x = this.dir.x/this.mod;
    this.dir.y = this.dir.y/this.mod;

    this.target = null;

    this.update = function (progress) {
        this.x += this.dir.x * progress * this.speed;
        this.y += this.dir.y * progress * this.speed;

        // Si llega al centro se acaba la partida
        if(Math.abs(this.x-canvas.width/2)<30 && Math.abs(this.y-canvas.height/2)<30) {
            //this.destroy();
            currentState.state.stopLoop();
        }

        //Si sale de la pantalla el enemigo muere
        if(this.x>canvas.width || this.y>canvas.height || this.x<0 || this.y<0){
            this.destroy();
        }
    }

    this.draw = function (){
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }

    this.click = function (x,y) {
        var pos = [];
        pos.x = 0;
        pos.y = 0;
        if(x>this.x-margin && x<this.x+50+margin && y>this.y-margin && y<this.y+80+margin) {
            pos.x = this.x;
            pos.y = this.y;
            //this.destroy();
            return this;
        }else{
            return null;
        }
    }

    this.destroy = function() {
        spawner.destroy(this);
    }
}