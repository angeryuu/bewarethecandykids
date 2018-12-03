var Button = function(_text, _color, _x, _y, _width, _height, canvas) {
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    this.clicked = false;
    this.hovered = false;
    this.text = _text;
    this.color = _color;
    this.ctx = this.ctx = canvas.getContext('2d');
    
    this.draw = function() {
     
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
     
        var fontSize = 20;
        this.ctx.fillStyle = "#000000";
        this.ctx.font = fontSize + "px sans-serif";

        var textSize = this.ctx.measureText(this.text);
        var textX = this.x + (this.width/2) - (textSize.width / 2);
        var textY = this.y + (this.height/2) + (fontSize/2);

        this.ctx.fillText(this.text, textX, textY);
    }
}

