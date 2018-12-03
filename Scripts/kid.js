function kid(spawner, canvas, _type, _x, _y){

    this.ctx = canvas.getContext('2d');
    this.sprite = new Image();
    this.sprite.src = "Sprites/kiddo.png";
    this.x = _x;
    this.y = _y;
    this.speed = 0.05;
    this.runSpeed = 0.15;

    var margin = 10;

    this.dir = [0,0];
    this.dir.x = (canvas.width/2) - this.x;
    this.dir.y = (canvas.height/2) - this.y;
    this.mod = Math.sqrt((this.dir.x*this.dir.x + this.dir.y*this.dir.y));
    this.dir.x = this.dir.x/this.mod;
    this.dir.y = this.dir.y/this.mod;

    this.target = null;

    this.type = _type;
    this.health = 3;
    this.vulnerable = false;

    var appearSound, chewSound,goSound;
//cargarsonidos
switch (this.type) 
{
    case 0: 
    appearSound=new Audio("Audio/Vampiro/v_aparece.mp3");  
    goSound=new Audio("Audio/Vampiro/v_mastica.mp3");
    break;
    case 1: 
    appearSound=new Audio("Audio/Frankestein/f_aparece.mp3");
    chewSound=new Audio("Audio/Frankestein/f_bocado.mp3");
    goSound=new Audio("Audio/Frankestein/f_mastica.mp3");
    break;
    case 2: 
    appearSound=new Audio("Audio/Lobo/l_aparece.mp3");
    chewSound=new Audio("Audio/Lobo/l_desplaza.mp3");
    goSound=new Audio("Audio/Lobo/l_mastica.mp3");
    break;
    case 3: 
    appearSound=new Audio("Audio/Bruja/b_aparece.mp3");
    chewSound=new Audio("Audio/Bruja/b_tele.mp3");
    goSound=new Audio("Audio/Bruja/b_mastica.mp3");
    break;
    case 4: 
    appearSound=new Audio("Audio/Demonio/d_aparece.mp3");
    chewSound=new Audio("Audio/Demonio/d_divide.mp3");
    goSound=new Audio("Audio/Demonio/d_mastica.mp3");
    break;
}
    appearSound.play();
    this.update = function (progress) {
        this.x += this.dir.x * progress * this.speed;
        this.y += this.dir.y * progress * this.speed;

        // Si llega al centro se acaba la partida
        if(Math.abs(this.x-canvas.width/2)<30 && Math.abs(this.y-canvas.height/2)<30) {
            this.destroy();
            //currentState.state.stopLoop();
        }

        // Si sale de la pantalla se destruye
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

    this.hit = function() {

        /*if(audio.paused) {
        //   audio.play();
        } else {
            audio.currentTime = 0;
        }
      //  audio.play();*/

        switch (this.type) {
            case 0:     // Vampiro
                //this.dir.x *= -1;
                //this.dir.y *= -1;
                goSound.play();
                this.x<canvas.width/2 ? this.dir.x = -1 : this.dir.x = 1;
                this.dir.y = 0;
                this.speed = this.runSpeed;
            break;

            case 1:     // Monstruo de Frankenstein
                this.health--;
                this.target = null;
                if(this.health<=0) {
                    goSound.play();
                    this.x<canvas.width/2 ? this.dir.x = -1 : this.dir.x = 1;
                    this.dir.y = 0;
                    this.speed = this.runSpeed;
                }else{
                    chewSound.play();
                }
            break;

            case 2:     // Lobo
                if(!this.vulnerable) {
                    chewSound.play();
                    this.vulnerable = true;
                    this.target = null;
                    this.x += this.dir.x * -150;
                    this.y += this.dir.y * -150;
                } else {
                    goSound.play();
                    this.x<canvas.width/2 ? this.dir.x = -1 : this.dir.x = 1;
                    this.dir.y = 0;
                    this.speed = this.runSpeed;
                }
            break;

            case 3:     //Bruja
                if(!this.vulnerable) {
                    chewSound.play();
                    var keepLooping = true;
                    while(keepLooping) {
                        var kidx = Math.random()*canvas.width;
                        var kidy = Math.random()*canvas.height;
                        var module = Math.sqrt((((canvas.width/2) - kidx)*((canvas.width/2) - kidx) + ((canvas.height/2) - kidy)*((canvas.height/2) - kidy)));
                        if(module>canvas.height/2) {
                            keepLooping = false;
                            this.vulnerable = true;
                            this.target = null;
                            this.x = kidx;
                            this.y = kidy;
                            
                            this.dir.x = (canvas.width/2) - this.x;
                            this.dir.y = (canvas.height/2) - this.y;
                            this.mod = Math.sqrt((this.dir.x*this.dir.x + this.dir.y*this.dir.y));
                            this.dir.x = this.dir.x/this.mod;
                            this.dir.y = this.dir.y/this.mod;
                        } else keepLooping = true;
                    }
                } else {
                    goSound.play();
                    this.x<canvas.width/2 ? this.dir.x = -1 : this.dir.x = 1;
                    this.dir.y = 0;
                    this.speed = this.runSpeed;
                }
            break;

            case 4:     // Demonio

            break;
        }
    }
}