class Jellyfish extends Fish {
    constructor() {
        super(ctx);
        this._ctx = ctx;

        this._img = new Image;
        this._img.src = '../images/jellyfish.png';
        this._img.frames = 2;
        this._img.rows = 8;
        this._img.frameIndex = 0;
        this._frameCounter = 0;

        this._start();
    }

    _draw() {   
        if(this.movesToLeft) {
            this._ctx.drawImage(
                this._img, 
                this._img.width / 2,
                this._img.height / this._img.rows * this._img.frameIndex, 
                this._img.width / 2,
                this._img.height / this._img.rows, 
                this.x, 
                this.y, 
                this.w, 
                this.h);
        } else {
            this._ctx.drawImage(
                this._img, 
                0,
                this._img.height / this._img.rows * this._img.frameIndex, 
                this._img.width / 2,
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
        if (this._img.frameIndex > 8) {
            this._img.frameIndex = 0;
          }
      
          if (this._img.frameIndex >= this._img.rows) {
            this._img.frameIndex = 0
          }
    };


}