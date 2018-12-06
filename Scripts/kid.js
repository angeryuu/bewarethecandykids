function kid(spawner, canvas, _type, _x, _y) {
    var multVol=4.3;
    this.ctx = canvas.getContext('2d');
    this.sprite = new Image();
    this.spriteWidth = 0;
    this.spriteHeight = 0;
    this.tickCount = 0;
    this.frameIndex = 0,
        this.ticksPerFrame = 0,
        this.numberOfFrames = 1;

    this.x = _x;
    this.y = _y;
    this.speed = 0.05;
    this.runSpeed = 0.15;

    var margin = 10;

    this.dir = [0, 0];
    this.dir.x = ((canvas.width / 2) - 50) - this.x;
    this.dir.y = ((canvas.height / 2) - 43) - this.y;
    this.mod = Math.sqrt((this.dir.x * this.dir.x + this.dir.y * this.dir.y));
    this.dir.x = this.dir.x / this.mod;
    this.dir.y = this.dir.y / this.mod;

    this.target = null;

    this.type = _type;
    this.health = 3;
    this.vulnerable = false;

    this.inverso = false;
    if (this.x < canvas.width / 2) {
        this.inverso = true;
    }

    var appearSound, chewSound, goSound;
    //cargarsonidos
    switch (this.type) {
        case 0:
            appearSound = audios[0];
            goSound = audios[1];
            appearSound.volume = 0.02*multVol;
            goSound.volume=0.02*multVol;

            this.spriteHeight = 87;
            this.spriteWidth = 70;
            this.ticksPerFrame = 8;
            this.numberOfFrames = 9;
            if (this.inverso) {
                this.sprite.src = "Sprites/vampiro-inverso.png";
            } else {
                this.sprite.src = "Sprites/vampiro.png";
            }
            break;
        case 1:
            appearSound = audios[2];
            chewSound = audios[3];
            goSound = audios[4];
            appearSound.volume = 0.014*multVol;
            chewSound.volume =  0.019*multVol;
            goSound.volume= 0.016*multVol;

            this.spriteHeight = 118;
            this.spriteWidth = 80;
            this.ticksPerFrame = 8;
            this.numberOfFrames = 9;
            if (this.inverso) {
                this.sprite.src = "Sprites/frankestein-inverso.png";
            } else {
                this.sprite.src = "Sprites/frankestein.png";
            }
            break;
        case 2:
            appearSound = audios[5];
            chewSound = audios[6];
            goSound = audios[7];
            appearSound.volume = 0.08*multVol;
            chewSound.volume = 0.1*multVol;
            goSound.volume=0.09*multVol;
        

            this.spriteHeight = 86;
            this.spriteWidth = 70;
            this.ticksPerFrame = 8;
            this.numberOfFrames = 9;
            if (this.inverso) {
                this.sprite.src = "Sprites/lobo-inverso.png";
            } else {
                this.sprite.src = "Sprites/lobo.png";
            }

            break;
        case 3:
            appearSound = audios[8];
            chewSound = audios[9];
            goSound = audios[10];
            appearSound.volume =  0.02*multVol;
            chewSound.volume =  0.02*multVol;
            goSound.volume= 0.02*multVol;

            this.spriteHeight = 87;
            this.spriteWidth = 70;
            this.ticksPerFrame = 8;
            this.numberOfFrames = 9;
            if (this.inverso) {
                this.sprite.src = "Sprites/bruja-inverso.png";
            } else {
                this.sprite.src = "Sprites/bruja.png";
            }
            break;
        case 4:
            appearSound = audios[11];
            chewSound = audios[12];
            goSound = audios[13];
            appearSound.volume =  0.1*multVol;
            chewSound.volume =  0.1*multVol;
            goSound.volume= 0.1*multVol;

            this.spriteHeight = 82;
            this.spriteWidth = 100;
            this.ticksPerFrame = 8;
            this.numberOfFrames = 9;
            if (this.inverso) {
                this.sprite.src = "Sprites/demon-inverso.png";
            } else {
                this.sprite.src = "Sprites/demon.png";
            }
            break;
    }

    appearSound.play();
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
        
        // Si llega al centro se acaba la partida
        if (Math.abs(this.x - (canvas.width / 2 - 50)) < 60 && Math.abs(this.y - (canvas.height / 2 - 43)) < 60) {
            currentState.state.finishGame();
        }

        // Si sale de la pantalla se destruye
        if (this.x > canvas.width || this.y > canvas.height || this.x < 0 || this.y < 0) {
            this.destroy();
        }
    }

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
    }

    this.click = function (x, y) {
        var pos = [];
        pos.x = 0;
        pos.y = 0;
        if (x > this.x - margin && x < this.x + 50 + margin && y > this.y - margin && y < this.y + 80 + margin) {
            pos.x = this.x;
            pos.y = this.y;
            //this.destroy();
            return this;
        } else {
            return null;
        }
    }

    this.destroy = function () {
        spawner.destroy(this);
    }

    this.hit = function () {
        switch (this.type) {
            case 0: // Vampiro
                goSound.play();
                this.x < canvas.width / 2 ? this.dir.x = -1 : this.dir.x = 1;
                this.dir.y = 0;
                this.speed = this.runSpeed;
                if (this.inverso) {
                    this.sprite.src = "Sprites/vampiro.png";
                } else {
                    this.sprite.src = "Sprites/vampiro-inverso.png";
                }
                break;

            case 1: // Monstruo de Frankenstein
                this.health--;
                if (this.health <= 0) {
                    goSound.play();
                    this.x < canvas.width / 2 ? this.dir.x = -1 : this.dir.x = 1;
                    this.dir.y = 0;
                    this.speed = this.runSpeed;
                    if (this.inverso) {
                        this.sprite.src = "Sprites/frankestein.png";
                    } else {
                        this.sprite.src = "Sprites/frankestein-inverso.png";
                    }
                } else {
                    chewSound.play();
                    this.target = null;
                }
                break;

            case 2: // Lobo
                if (!this.vulnerable) {
                    chewSound.play();
                    this.vulnerable = true;
                    this.target = null;
                    this.x += this.dir.x * -150;
                    this.y += this.dir.y * -150;
                } else {
                    goSound.play();
                    this.x < canvas.width / 2 ? this.dir.x = -1 : this.dir.x = 1;
                    this.dir.y = 0;
                    this.speed = this.runSpeed;
                    if (this.inverso) {
                        this.sprite.src = "Sprites/lobo.png";
                    } else {
                        this.sprite.src = "Sprites/lobo-inverso.png";
                    }
                }
                break;

            case 3: //Bruja
                if (!this.vulnerable) {
                    chewSound.play();
                    var keepLooping = true;
                    while (keepLooping) {
                        var kidx = Math.random() * canvas.width;
                        var kidy = Math.random()*(canvas.height-canvas.height/8) + canvas.height/8;
                        var module = Math.sqrt((((canvas.width / 2) - kidx) * ((canvas.width / 2) - kidx) + ((canvas.height / 2) - kidy) * ((canvas.height / 2) - kidy)));
                        if (module > canvas.height / 2) {
                            keepLooping = false;
                            this.vulnerable = true;
                            this.target = null;
                            this.x = kidx;
                            this.y = kidy;
                            this.dir.x = ((canvas.width / 2) - 50) - this.x;
                            this.dir.y = ((canvas.height / 2) - 43) - this.y;
                            this.mod = Math.sqrt((this.dir.x * this.dir.x + this.dir.y * this.dir.y));
                            this.dir.x = this.dir.x / this.mod;
                            this.dir.y = this.dir.y / this.mod;
                        } else {
                            keepLooping = true;
                        }
                    }
                    if (this.x < canvas.width / 2) {
                        this.inverso = true;
                    }
                    if (this.inverso) {
                        this.sprite.src = "Sprites/bruja-inverso.png";
                    } else {
                        this.sprite.src = "Sprites/bruja.png";
                    }
                } else {
                    goSound.play();
                    this.x < canvas.width / 2 ? this.dir.x = -1 : this.dir.x = 1;
                    this.dir.y = 0;
                    this.speed = this.runSpeed;
                    if (this.inverso) {
                        this.sprite.src = "Sprites/bruja.png";
                    } else {
                        this.sprite.src = "Sprites/bruja-inverso.png";
                    }
                }
                break;

            case 4: // Demonio
                if (!this.vulnerable) {
                    chewSound.play();
                    this.vulnerable = true;
                    this.target = null;
                    spawner.createSubdemon(this.x+this.dir.y * -50, this.y+this.dir.x*50);
                    this.x += this.dir.y * 50;
                    this.y += this.dir.x * -50;
                } else {
                    goSound.play();
                    this.x < canvas.width / 2 ? this.dir.x = -1 : this.dir.x = 1;
                    this.dir.y = 0;
                    this.speed = this.runSpeed;
                    if (this.inverso) {
                        this.sprite.src = "Sprites/demon.png";
                    } else {
                        this.sprite.src = "Sprites/demon-inverso.png";
                    }
                }
            break;
        }
    }
}
