function spawner(canvas){

    this.ctx = canvas.getContext('2d');

    var kids = [];

    this.update = function (progress) {
        kids.push(new kid(canvas, 0, 0));
        
        kids.forEach( function(valor, i, array){
            kids[i].update(progress);
        });
    }

    this.draw = function() {
        kids.forEach( function(valor, i, array){
            kids[i].draw();
        });
    }
}