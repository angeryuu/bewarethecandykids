function Caramelo(canvas, target, _dir, _x, _y){

    this.ctx = canvas.getContext('2d');
    this.dir = _dir;
    this.sprite = new Image();
    this.sprite.src = "Sprites/spritesheetCaramelo.png";
    this.x = _x;
    this.y = _y;
    this.speed = 0.8;
    this.destroyed = false;
    this.tickCount = 0;
    this.frameIndex = 0,
    this.ticksPerFrame = 3;
    this.numberOfFrames = 9;
    this.spriteHeight = 53;
    this.spriteWidth = 50;

    this.draw = function (){
        this.ctx.drawImage(this.sprite,
            this.frameIndex * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight);
    }

    this.update = function (progress) {
        this.x += this.dir.x * progress * this.speed;
        this.y += this.dir.y * progress * this.speed;

        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {

            this.tickCount = 0;
            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {
                // Go to the next frame
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }

        if (this.x>target.x && this.x<target.x+50 && this.y>target.y && this.y<target.y+80)
        {
            target.hit();
            this.destroy();
        }
    }

    this.destroy = function(){
        this.destroyed = true;
    }
}