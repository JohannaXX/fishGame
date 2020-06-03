class Orca extends Fish {
    constructor() {
        super(ctx);
        this._ctx = ctx;
        this.w = 300;
        this.x = 0;
        this.y = Math.floor(Math.random() * (this._ctx.canvas.height - 200));
        this.h = 200;
        this.vy = 0;

        this._start();
    }

    _start() {
        const startFromLeft = () => {
            this.x = -300;
            this.vx = Math.random() + 0.2;
        }

        const startFromRight = () => {
            this.x = this._ctx.canvas.width;
            this.vx = (Math.random() + 0.2) * -1;
        }

        if (Math.random() < 0.5)  {
            startFromLeft();
        } else {
            startFromRight();
        }
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