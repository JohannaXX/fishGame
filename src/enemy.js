class Enemy {
    constructor(ctx) {
        this._ctx = ctx;
        this.movesToLeft = (Math.random() < 0.5) ? false : true ;

        this.y = Math.floor(Math.random() * (this._ctx.canvas.height - 70) + 10 );
        this.w = Math.floor(Math.random() * 50 + 30);
        this.h = this.w * 0.8;
        this.vx = (Math.random() * 5) + 1 ;
        this.vy = (Math.random() * 3 * (Math.random() < 0.5 ? -1 : 1));

        this._img = new Image;
        this._img.src = '../images/enemy.png';
        this._img.frames = 6;
        this._img.frameIndex = 0;
        this._img.rows = 5;
        this._img.rowCutIndex = this.movesToLeft ? 0 : 2;

        this._start();
        this._changeDirection();
    }

    _start() {
        if (this.movesToLeft) {
            this.x = this._ctx.canvas.width;
            this.vx *= (-1);
            this.vy *= (-1);
        } else {
            this.x = 0 - this.w;
        }
    }

    _draw() {   
        if(this.movesToLeft) {
            this._ctx.drawImage(
                this._img, 
                (this._img.frameIndex * (this._img.width / this._img.frames)) +20, 
                this._img.height / this._img.rows * this._img.rowCutIndex,
                this._img.width / this._img.frames -40, 
                this._img.height / this._img.rows, 
                this.x, 
                this.y, 
                this.w, 
                this.h);
        } else {
            this._ctx.drawImage(
                this._img, 
                this._img.frameIndex * (this._img.width / this._img.frames) +20, 
                this._img.height / this._img.rows *  this._img.rowCutIndex ,
                this._img.width / this._img.frames -40, 
                this._img.height / this._img.rows, 
                this.x, 
                this.y, 
                this.w, 
                this.h);
        }
        this._animation();
    }

    _animation() {
        this._img.frameIndex++;    
        if (this._img.frameIndex >= this._img.frames) this._img.frameIndex = 0;
    };

    _eating() {
        if (this.movesToLeft) {
            this._img.frameIndex = 0; 
            this._img.rowCutIndex = 1;
            setTimeout(() => {
                this._img.rowCutIndex = 0;
            }, 400);
        } else {
            this._img.frameIndex = 0; 
            this._img.rowCutIndex = 3;
            setTimeout(() => {
                this._img.rowCutIndex = 2;
            }, 400);
        }

        if(this.w <= 250) {
            this.w *= 1.1;
            this.h *= 1.1;
        }
    }

    _changeDirection() {
        const randomTime1 = Math.floor(Math.random() * 12000 + 6000);
        const randomTime2 = Math.floor(Math.random() * 20000 + 7000);
        this.changeDirectionX = setInterval(() => {
            this.vy *= -1;
        }, randomTime1);
        this.changeDirectionY = setInterval(() => {
            this.vx *= -1;
            this.movesToLeft = !this.movesToLeft;
            this._img.rowCutIndex = this.movesToLeft ? 0 : 2;
        }, randomTime2);
    }

    _move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y <= 0 || (this.y + this.h) >= this._ctx.canvas.height)  this.vy *= -1;
    }

}