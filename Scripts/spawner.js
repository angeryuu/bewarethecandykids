function spawner(canvas){

    this.ctx = canvas.getContext('2d');

    var keepLooping;
    var kids = [];
    var maxKids = 10;
    var counter = 0;
    var counterChangeWave = 0;
    var spawnSpeed = 2000;
    var wave = 1;
    var score = 0;
    var nKids = 10;

    this.update = function (progress) {
        if(counterChangeWave>0) {
            counterChangeWave -= progress;
            if(counterChangeWave<0) counterChangeWave = 0;
        } else {
            maxKids = wave * 3 + 10;
            spawnSpeed = 2000 - wave*50;
            if(spawnSpeed<0) spawnSpeed = 0;
    
            counter += progress;
            if(counter >= spawnSpeed) {
                counter = 0;
                if(kids.length<maxKids) this.createKid();
            }
        }
        if(score+kids.length == nKids && kids.length>0) {
            counterChangeWave = 3000;
        }

        kids.forEach( function(valor, i, array){
            kids[i].update(progress);
        });
    }

    this.draw = function () {
        kids.forEach( function(valor, i, array){
            kids[i].draw();
        });
    }

    this.destroy = function (_kid) {
        score++;

        if(score>=wave*10) {
            wave ++;
            nKids += 10;
            counterChangeWave = 5000;
            console.log("WAVE " + wave);
        }

        var kidToDelete = kids.indexOf(_kid);
        if (kidToDelete > -1) kids.splice(kidToDelete, 1);
    }

    this.createKid = function () {
        keepLooping = true;
        while(keepLooping) {
            var kidx = Math.random()*canvas.width;
            var kidy = Math.random()*canvas.height;
            var module = Math.sqrt((((canvas.width/2) - kidx)*((canvas.width/2) - kidx) + ((canvas.height/2) - kidy)*((canvas.height/2) - kidy)));
            if(module>canvas.height/2) {
                keepLooping = false;
            } else keepLooping = true;
        }
        var type = Math.floor(Math.random() * (3 - 0 + 1));
        kids.push(new kid(this, canvas, type, kidx, kidy));
    }

    this.click = function (x,y) {
        var returnkid;
        kids.forEach( function(valor, i, array){
            var auxkid = kids[i].click(x,y);
            if (auxkid != null) returnkid = auxkid;
        });
        return returnkid;
    }
}