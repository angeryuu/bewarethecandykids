var Button = function(_image, _x, _y, canvas) {
    this.x = _x;
    this.y = _y;
    this.hovered = false;
    this.image = _image;
    this.width = _image.width;
    this.height = _image.height;
    this.ctx = canvas.getContext('2d');
    
    this.update = function(mouse) {
        var x = mouse.x - canvas.offsetLeft,
        y = mouse.y - canvas.offsetTop;
        if((x > this.x && x < this.x + this.width) && (y > this.y && y < this.y + this.height)){
            this.hovered = true;
        }else this.hovered = false;
    }
    
    this.draw = function() {
        if(this.hovered){
            this.ctx.globalAlpha = 0.8;
        }
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.globalAlpha = 1.0;
    }
}

