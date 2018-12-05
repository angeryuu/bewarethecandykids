function spawner(canvas){

    this.ctx = canvas.getContext('2d');

    var keepLooping;
    var kids = [];
    var subdemons = [];
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
            if(spawnSpeed<100) spawnSpeed = 100;
    
            counter += progress;
            if(counter >= spawnSpeed) {
                counter = 0;
                if(kids.length<maxKids) this.createKid();
            }
        }
        if(score+kids.length == nKids && kids.length>0) {
            counterChangeWave = 3000 - spawnSpeed;
        }

        kids.forEach( function(valor, i, array){
            kids[i].update(progress);
        });

        subdemons.forEach( function(valor, i, array){
            subdemons[i].update(progress);
        });
    }

    this.draw = function () {
        kids.forEach( function(valor, i, array){
            kids[i].draw();
        });

        subdemons.forEach( function(valor, i, array){
            subdemons[i].draw();
        });
    }

    this.destroy = function (_kid) {
        score++;

        if(score>=wave*10) {
            wave ++;
            nKids += 10;
        }

        var kidToDelete = kids.indexOf(_kid);
        if (kidToDelete > -1) kids.splice(kidToDelete, 1);
        
        kidToDelete = subdemons.indexOf(_kid);
        if(kidToDelete > -1) subdemons.splice(kidToDelete, 1);
    }

    this.createSubdemon = function (_x, _y) {
        var newDemon = new kid(this, canvas, 4, _x, _y);
        subdemons.push(newDemon);
        newDemon.vulnerable = true;
    }

    this.createKid = function () {
        keepLooping = true;
        while(keepLooping) {
            var kidx = Math.random()*canvas.width;
            var kidy = Math.random()*(canvas.height-canvas.height/8) + canvas.height/8;
            var module = Math.sqrt((((canvas.width/2) - kidx)*((canvas.width/2) - kidx) + ((canvas.height/2) - kidy)*((canvas.height/2) - kidy)));
            if(module>canvas.height/2) {
                keepLooping = false;
            } else keepLooping = true;
        }
        kids.push(new kid(this, canvas, this.checkType(), kidx, kidy));
    }

    this.click = function (x,y) {
        var returnkid;
        subdemons.forEach( function(valor, i, array){
            var auxkid = subdemons[i].click(x,y);
            if (auxkid != null) returnkid = auxkid;
        });

        kids.forEach( function(valor, i, array){
            var auxkid = kids[i].click(x,y);
            if (auxkid != null) returnkid = auxkid;
        });
        return returnkid;
    }

    this.checkType = function () {
        var rand = Math.random();
        var type = 4;
        switch(wave) {
            case 1:
            if(score+kids.length==9) type = 1;
            return type;

            case 2:
            if(rand<0.2) type = 1;
            if(score+kids.length==19) type = 2;
            return type;

            case 3:
            if(rand<0.2) type = 1;
            else if(rand<0.4) type = 2;
            if(score+kids.length==29) type = 3;
            return type;

            case 4:
            if(rand<0.2) type = 1;
            else if(rand<0.4) type = 2;
            else if(rand<0.6) type = 3;
            return type;

            default:
            if(rand<0.25) type = 1;
            else if(rand<0.5) type = 2;
            else if(rand<0.75) type = 3;
            return type;
        }
    }
}