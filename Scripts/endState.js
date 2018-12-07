function endState(container){
    var self = this;
    this.container = container;
    this.value = 'endState';
    container.state = this;
    this.next = function(_state){
        canvas.removeEventListener('click', onClick, false);
        canvas.removeEventListener('mousemove', onClick, false);
        if(_state == "titleState"){
            return new titleState(self);
        }
    }

    var canvas,
        canvasLeft,
        canvasTop,
        ctx;

    var backButton;

    var mouse = {
        x: 0,
        y: 0
    };

    var requestId;
    var lastRender = 0;

    var stop = false;
    this.stopLoop = function(){
        if(!stop) stop = true;
        else stop = false;
    }

    function create(){
        canvas = document.getElementById('gameCanvas');
        canvasLeft = canvas.offsetLeft;
        canvasTop = canvas.offsetTop;
        ctx = canvas.getContext('2d');

        backButton = new Button(backButtonUI, canvas.width/2.75-backButtonUI.width/2, canvas.height/1.55-backButtonUI.height/2, canvas)

        canvas.addEventListener("click", onClick, false);
        canvas.addEventListener("mousemove", function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        requestId = window.requestAnimationFrame(loop);
    }

    function update(progress){
        backButton.update(mouse);
    }

    function draw(){
        ctx.drawImage(fondoOscurecidoUI, 0, 0);
        ctx.drawImage(placeholderUI, canvas.width/2-placeholderUI.width/2, canvas.height/2-placeholderUI.height/2);

        ctx.drawImage(rankingUI, canvas.width/2-rankingUI.width/2, canvas.height/2-rankingUI.height/2);

        backButton.draw();
    }

    function loop(timestamp) {
        if(!stop){
            requestId = window.requestAnimationFrame(loop);
        
            var progress = timestamp - lastRender;
        
            update(progress);
            draw();
        
            lastRender = timestamp;
        }else{
            window.cancelAnimationFrame(requestId);
        }
    }

    function onClick(event){
        var x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;
        if((x > backButton.x && x < backButton.x + backButton.width) && (y > backButton.y && y < backButton.y + backButton.height)){
            currentState.state.stopLoop();
            currentState.state = currentState.changeState("titleState");
        }
    }

    create();

}