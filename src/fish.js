class Fish {
    constructor(ctx) {
        this._ctx = ctx;
        this.eatingIntervalId;
        this.eatingTimer = 0;
        this.changeDirectionTimerId;
        this.changeDirectionTimer = 0;
        this.isDead = false;

        
        this.x = 0;
        this.y = 0;
        this.w = Math.floor(Math.random() * 50 + 30);
        this.h = this.w / 2;
        this.vx = 0;
        this.vy = 0;

        this.color = 'purple';
        
        this._start();
        this._setEatingTimer();
        this._changeDirection();
    }

    _start() {
        const startFromLeft = () => {
            this.x = 0;
            this.y = Math.floor(Math.random() * (this._ctx.canvas.height - this.h));
            this.vx = Math.random();
            this.vy = (Math.random() * (Math.random() < 0.5 ? -1 : 1)) / 3 + 0.3;
        }

        const startFromRight = () => {
            this.x = this._ctx.canvas.width;
            this.y = Math.floor(Math.random() * 200 + 100);;
            this.vx = Math.random() * -1;
            this.vy = (Math.random() * (Math.random() < 0.5 ? -1 : 1)) / 3 + 0.3;
        }

        if (Math.random() < 0.5) {
            startFromLeft();
        } else {
            startFromRight();
        }
    }

    _draw() {
        this._ctx.beginPath();
        this._ctx.fillStyle = this.color;
        this._ctx.fillRect(this.x, this.y, this.w, this.h); 
        this._ctx.fill();
    }

    _changeDirection() {
        const randomTime = Math.floor(Math.random() * 4000 + 4000);
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



    _setEatingTimer() {
        this.eatingIntervalId =  setInterval(() => {
            this.eatingTimer++;
        }, 1000);    
    }

    _eating() {
        this.w *= 1.1;
        this.h *= 1.1;
    }

    _checkIfGettingSmaller() {
        if (this.eatingTimer % 5 === 0) {
            this.w -= 0.02;
            this.h -= 0.02;
            /* if(this.w < 5 || this.h < 5) {
                this.isDead = true;
            } */
        }
    }

}