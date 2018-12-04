function Jugador(canvas) {

    this.ctx = canvas.getContext('2d');
    this.sprite = new Image();
    this.calabaza = new Image();
    this.sprite.src = "Sprites/cat_idle.png";
    this.calabaza.src = "Sprites/pumpkin_idle.png";
    this.spriteWidth = 100;
    this.spriteHeight = 87;
    this.tickCount = 0;
    this.frameIndex = 0;
    this.ticksPerFrame = 8;
    this.numberOfFrames = 4;
    this.lanzando = false;
    this.x = (canvas.width / 2) - this.spriteWidth + 10; //90
    this.y = (canvas.height / 2) - this.spriteHeight - 25; //115

    this.draw = function () {
        this.ctx.drawImage(this.sprite,
            this.frameIndex * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight);
        this.ctx.drawImage(this.calabaza,
            this.frameIndex * 120,
            0,
            120,
            100,
            this.x,
            this.y + this.spriteHeight - 10,
            120,
            100);
    }

    this.throw = function (pos) {
        
        if (canvas.width / 2 < pos) {
            this.lanzando = true;
            this.sprite.src = "Sprites/cat_right.png";
            this.spriteWidth = 100;
            this.spriteHeight = 87;
            this.tickCount = 0;
            this.frameIndex = 0;
            this.ticksPerFrame = 4;
            this.numberOfFrames = 6;
        } else {
            this.lanzando = true;
            this.sprite.src = "Sprites/cat_left.png";
            this.spriteWidth = 100;
            this.spriteHeight = 87;
            this.tickCount = 0;
            this.frameIndex = 0;
            this.ticksPerFrame = 4;
            this.numberOfFrames = 6;
        }
    }


    this.update = function (progress) {
        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {

            this.tickCount = 0;
            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {
                // Go to the next frame
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
                if (this.lanzando) {
                    this.sprite.src ="Sprites/cat_idle.png";
                    this.spriteWidth = 100;
                    this.spriteHeight = 87;
                    this.tickCount = 0;
                    this.ticksPerFrame = 8;
                    this.numberOfFrames = 4;
                    this.lanzando = false;
                }
            }
        }
    }
}