var currentState;

function HeadingState(){
    var self = this;
    this.state = new gameState(self);
    this.changeState = function(){
      return self.state.next();
    }
    this.getValue = function(){
      return self.state.value
    }
}

window.onload = function(){
    currentState = new HeadingState();
}