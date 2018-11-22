var currentState;

function HeadingState(){
    var self = this;
    this.state = new gameState(self);
    this.changeState = function(){
        return self.state.next();
    }
}

window.onload = function(){
    currentState = new HeadingState();
}