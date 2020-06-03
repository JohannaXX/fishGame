class Orca extends Fish {
    constructor() {
        super(ctx);
        this._ctx = ctx;
        this.y = Math.floor(Math.random() * (this._ctx.canvas.height - 200));
        this.w = 300;
        this.h = 200;
        this.vy = 0;
    }

    _draw() {
        //this._ctx.drawImage(this._img, 0, 0, this._img.width / 6, this._img.height / 4, this.x, this.y, this.w, this.h);
            /* sx, sy, sw, sh,
            dx, dy, dw, dh); */
        this._ctx.beginPath();
        this._ctx.fillStyle = 'blue';
        this._ctx.fillRect(this.x, this.y, this.w, this.h); 
        this._ctx.fill();
    }

}