function spawner(canvas){

    this.ctx = canvas.getContext('2d');

    var keepLooping;
    var kids = [];
    var maxKids = 10;
    var counter = 0;

    this.update = function (progress) {
        counter += progress;
        if(counter >= 1000) {
            counter = 0;
            if(kids.length<maxKids) this.createKid();
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