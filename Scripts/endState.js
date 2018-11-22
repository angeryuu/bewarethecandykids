function endState(container){
    var self = this;
    this.container = container;
    this.value = 'gameState';
    container.state = this;
    this.next = function(){
        return new endState(self);
    }
    console.log("estado final");
    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}