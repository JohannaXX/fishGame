class Background {
    constructor(ctx) {
        this._ctx = ctx;
        this._img = new Image;
        this._img.src = './images/background.png';

        this.h = 500;
        this.w = this._ctx.canvas.width;
        this.x = 0;
        this.y = this._ctx.canvas.height - this.h;
        this.vx = -1;
        this.vy = 0;
    }

    _draw() {
        this._ctx.drawImage(this._img, this.x, this.y, this.w, this.h)
        this._ctx.drawImage(this._img, this.x + this._ctx.canvas.width, this.y, this.w, this.h)
    }
    
    _move() {
        this.x += this.vx;
        if(this.x <= (0 - this._ctx.canvas.width)) {
            this.x = 0;
        }
    }
}

