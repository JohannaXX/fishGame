class Fish {
    constructor(ctx) {
        this._ctx = ctx;

        this.movesToLeft = (Math.random() < 0.5) ? false : true ;
        this.changeDirectionTimerId;
        this.changeDirectionTimer = 0;
        this.isDead = false;

        this._img = new Image;
        const getRandomImage = Math.ceil(Math.random() * 4);
        this._img.src = `../images/fish${getRandomImage}.png`;
        this._img.frames = 6;
        this._img.rows = 2;
        this._img.frameIndex = 0;
        this._img.imageRowCut;

        this.w = Math.floor(Math.random() * 50 + 30);
        this.h = this.w / 1.2;
        this.vx = (Math.random() * 5) + 1 ;
        this.vy = (Math.random() * 3 * (Math.random() < 0.5 ? -1 : 1));

        this.color = 'red';
        
        this._start();
        this._changeDirection();
    }

    _start() {
        if (this.movesToLeft) {
            this.x = this._ctx.canvas.width;
            this.y = Math.floor(Math.random() * 200 + 100);
            this.vx *= (-1);
            this.vy *= (-1);
            this.movesToLeft = true;
        } else {
            this.x = 0- this.w;
            this.y =  Math.floor(Math.random() * 200 + 100);
        }
    }

    _draw() {   
        if(this.movesToLeft) {
            this._ctx.drawImage(
                this._img, 
                this._img.frameIndex * (this._img.width / this._img.frames), 
                this._img.height / this._img.rows, 
                this._img.width / this._img.frames, 
                this._img.height / this._img.rows, 
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
        const randomTime = Math.floor(Math.random() * 6000 + 4000);
        this.changeDirectionTimerId = setInterval(() => {
            this.vy *= -1;
        }, randomTime);
    }

    _move() {
        this.x += this.vx;
        this.y += this.vy;
        if(this.y <= 0 || (this.y + this.h) >= this._ctx.canvas.height) {
            this.vy *= -1;
        }
        
    }

}