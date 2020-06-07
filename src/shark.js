class Shark extends Enemy {
    constructor() {
        super(ctx);
        this._ctx = ctx;

        this.w = 300;
        this.x = 0;
        this.y = Math.floor(Math.random() * (this._ctx.canvas.height - 200));
        this.h = 150;
        this.vx = 10;
        this.vy = 0;

        this._img = new Image;
        this._img.src = '../images/sharkReduced.png';
        this._img.frames = 3;
        this._img.rows = 4;
        this._img.frameIndex = 0;
        this._img.rowCutIndex = this.movesToLeft ? 0 : 2;

       // this.entranceAlert = new EntranceAlert(this._ctx, this.movesToLeft, this.y)
        this.entranceAlert = this._giveAlert();
        this._start();
    }


    _draw() {   
        if(this.movesToLeft) {
            this._ctx.drawImage(
                this._img, 
                this._img.frameIndex * (this._img.width / this._img.frames), 
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
                this._img.height / this._img.rows *  this._img.rowCutIndex ,
                this._img.width / this._img.frames, 
                this._img.height / this._img.rows, 
                this.x, 
                this.y, 
                this.w, 
                this.h);
        }
        this._animation();
    }

    _changeDirection() {
        const randomTime1 = Math.floor(Math.random() * 6000 + 4000);
        this.changeDirectionX = setInterval(() => {
            this.vy *= -1;
        }, randomTime1);
    }

    _giveAlert() {
        this._ctx.beginPath();
        this._ctx.fillStyle = 'red';
        this._ctx.fillRect(this.x, this.y, 20, this.h);
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