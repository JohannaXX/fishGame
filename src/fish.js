class Fish {
    constructor(ctx) {
        this._ctx = ctx;
        this.eatingIntervalId;
        this.eatingTimer = 0;
        this.isDead = false;

        this.x = Math.floor(Math.random() * 200 + 150);
        this.y = Math.floor(Math.random() * 200 + 100);
        this.w = Math.floor(Math.random() * 50 + 10);
        this.h = Math.floor(Math.random() * 50 + 10);
        this.vx = 0;
        this.vy = 0;
        this.color = 'purple';

        this._setEatingTimer();
    }

    _setEatingTimer() {
        this.eatingIntervalId =  setInterval(() => {
            this.eatingTimer++;
        }, 1000);    
    }

    _checkIfGettingSmaller() {
        if (this.eatingTimer % 2 === 0) {
            this.w -= 0.02;
            this.h -= 0.02;
            /* if(this.w < 5 || this.h < 5) {
                this.isDead = true;
            } */
        }
    }

    _draw() {
        this._ctx.beginPath();
        this._ctx.fillStyle = this.color;
        this._ctx.fillRect(this.x, this.y, this.w, this.h); 
        this._ctx.fill();
    }

    _move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    _eating() {
        this.w += 10;
        this.h += 10;
    }

}