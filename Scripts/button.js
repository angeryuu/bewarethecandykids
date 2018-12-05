var Button = function(_image, _x, _y, canvas) {
    this.x = _x;
    this.y = _y;
    this.clicked = false;
    this.hovered = false;
    this.image = _image;
    this.width = _image.width;
    this.height = _image.height;
    this.ctx = canvas.getContext('2d');
    
    this.draw = function() {
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}

