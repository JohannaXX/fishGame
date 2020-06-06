class Enemy extends Fish {
    constructor() {
        super(ctx);
        this.eatingIntervalId;
        this.eatingTimer = 0;

        this._img = new Image;
        this._img.src = '../images/enemy.png';
        this._img.frames = 6;
        this._img.frameIndex = 0;
        this._img.rows = 5;
        this._img.rowCutIndex = this.movesToLeft ? 0 : 2;

        this._setEatingTimer();
        
    }

    _draw() {   
        if(this.movesToLeft) {
            this._ctx.drawImage(
                this._img, 
                this._img.frameIndex * (this._img.width / this._img.frames), 
                //this._img.height / this._img.rows, => eating()
                this._img.height / this._img.rows * this._img.rowCutIndex,
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
                this._img.height / this._img.rows *  this._img.rowCutIndex , // * 3 => eating()
                this._img.width / this._img.frames, 
                this._img.height / this._img.rows, 
                this.x, 
                this.y, 
                this.w, 
                this.h);
        }
        this._animation();
    }

    _setEatingTimer() {
        this.eatingIntervalId =  setInterval(() => {
            this.eatingTimer++;
        }, 1000);    
    }

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
        this.w *= 1.1;
        this.h *= 1.1;
    }

    _checkIfGettingSmaller() {
        if (this.eatingTimer % 20 === 0) {
            this.energy -= 0.1;
            this.w -= 0.01;
            this.h -= 0.01;
            /* if(this.w < 5 || this.h < 5) {
                this.isDead = true;
            } */
        }
    }
    
}