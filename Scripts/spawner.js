function spawner(canvas){

    this.ctx = canvas.getContext('2d');

    var keepLooping;
    var kids = [];

    this.update = function (progress) {
        if(kids.length<20) this.createKid();
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
        kids.push(new kid(this, canvas, kidx, kidy));
    }

    this.click = function (x,y) {
        var pos = [];
        pos.x = 0;
        pos.y = 0;
        kids.forEach( function(valor, i, array){
            var auxPos = [];
            auxPos = kids[i].click(x,y);
            if ((auxPos.x != 0 || auxPos.y != 0)) pos = auxPos;
        });
        return pos;
    }
}