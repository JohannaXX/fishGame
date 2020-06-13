class Fish {
    constructor(ctx, level) {
        this._ctx = ctx;
        this.movesToLeft = (Math.random() < 0.5) ? false : true ;
        
        this.y = Math.floor(Math.random() * (this._ctx.canvas.height - 50) + 10 );
        this.w = Math.floor(Math.random() * 50 + 30);
        this.h = this.w / 1.1;
        this.vx = (Math.random() * 5) + Math.ceil(level/2) ;
        this.vy = (Math.random() * 3 * (Math.random() < 0.5 ? -1 : 1));

        this._img = new Image;
        const getRandomImage = Math.ceil(Math.random() * 5);
        this._img.src = `./images/fish${getRandomImage}.png`;
        this._img.frames = 6;
        this._img.rows = 2;
        this._img.frameIndex = 0;
        this._img.imageRowCut;

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
                this._img.frameIndex * (this._img.width / this._img.frames), 
                this._img.height / this._img.rows -10, 
                this._img.width / this._img.frames, 
                this._img.height / this._img.rows -10, 
                this.x, 
                this.y, 
                this.w, 
                this.h);
        } else {
            this._ctx.drawImage(
                this._img, 
                this._img.frameIndex * (this._img.width / this._img.frames), 
                0, 
                this._img.width / this._img.frames, 
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
        if (this._img.frameIndex >= this._img.frames) {
            this._img.frameIndex = 0
        }
    };

    _changeDirection() {
        const randomTime1 = Math.floor(Math.random() * 12000 + 6000);
        const randomTime2 = Math.floor(Math.random() * 20000 + 7000);
        this.changeDirectionX = setInterval(() => {
            this.vy *= -1;
        }, randomTime1);
        this.changeDirectionY = setInterval(() => {
            this.vx *= -1;
            this.movesToLeft = !this.movesToLeft;
        }, randomTime2);
    }

    _move() {
        this.x += this.vx;
        this.y += this.vy;
        if(this.y <= 0 || (this.y + this.h) >= this._ctx.canvas.height) {
            this.vy *= -1;
        }
    }

}