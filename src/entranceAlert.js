class EntranceAlert {
    constructor(ctx, comesFromRight, y) {
        this._ctx = ctx;
        this.x = comesFromRight? this._ctx.canvas.width : 0;
        this.y = y;
        this.w = 50;
        this.h = 300;;

        this._timer = 0;
        this._frameCounter = 0;

        this.alertBox = this._alertBox();

        this._start();
    }

    _alertBox() {
        this._ctx.beginPath();
        this._ctx.fillStyle = 'red';
        this._ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    _start() {
        
       /*  setTimeout(() => {
            this._ctx.clearRect(); //poss. this._ctx.clearRect(this.x, this.y, this.w, this.h);
        }, 2000); */
    }

    

}