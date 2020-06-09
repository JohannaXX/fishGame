class Shark extends Enemy {
    constructor(ctx, level) {
        super(ctx);
        this._ctx = ctx;
        this.level = level;
        this.alterTimerCounter = 0;
        this.alertTimer = setInterval(() => {
            this.alterTimerCounter++;
        }, 500);;

        this.y = Math.floor(Math.random() * (this._ctx.canvas.height - 200));
        this.w = 300;
        this.h = 150;
        this.vx = 30;
        this.vy = 0;

        this._img = new Image;
        this._img.src = '../images/sharkReduced.png';
        this._img.frames = 3;
        this._img.rows = 4;
        this._img.frameIndex = 0;
        this._img.rowCutIndex = this.movesToLeft ? 0 : 2;
        this._start();
    }

    _start() {
        if (this.movesToLeft) {
            this.x = this._ctx.canvas.width + 400;
            this.vx *= (-1);
            this.vy *= (-1);
        } else {
            this.x = 0 - (this.w + 400);
        }
    }

    _draw() {   
        if(this.movesToLeft) {
            if(this.alterTimerCounter < 4) {
                this._ctx.fillStyle = 'red';
                this._ctx.fillRect((this._ctx.canvas.width-30), this.y, 30, 150);
            } 
            this._ctx.drawImage(
                this._img, 
                this._img.frameIndex * (this._img.width / this._img.frames), 
                this._img.height / this._img.rows * this._img.rowCutIndex,
                this._img.width / this._img.frames, 
                this._img.height / this._img.rows, 
                this.x, 
                this.y, 
                this.w, 
                this.h
            );
        } else {
            if(this.alterTimerCounter < 4) {
                this._ctx.fillStyle = 'red';
                this._ctx.fillRect(0, this.y, 30, 150);
            } 
            this._ctx.drawImage(
                this._img, 
                this._img.frameIndex * (this._img.width / this._img.frames), 
                this._img.height / this._img.rows *  this._img.rowCutIndex ,
                this._img.width / this._img.frames, 
                this._img.height / this._img.rows, 
                this.x, 
                this.y, 
                this.w, 
                this.h
            );
        }
        this._animation();
    }

    _changeDirection() {
        const randomTime1 = Math.floor(Math.random() * 6000 + 4000);
        this.changeDirectionX = setInterval(() => {
            this.vy *= -1;
        }, randomTime1);
    }

    _eating() {
        if (this.movesToLeft) {
            this._img.frameIndex = 0; 
            this._img.rowCutIndex = 1;
        } else {
            this._img.frameIndex = 0; 
            this._img.rowCutIndex = 3;
        }
    }
}