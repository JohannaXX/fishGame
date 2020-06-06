class Orca extends Fish {
    constructor() {
        super(ctx);
        this._ctx = ctx;
        this.w = 300;
        this.x = 0;
        this.y = Math.floor(Math.random() * (this._ctx.canvas.height - 200));
        this.h = 300;
        this.vy = 0;

        this._img = new Image;
        this._img.src = '../images/fish5.png';
        this._img.frames = 6;
        this._img.rows = 2;
        this._img.frameIndex = 0;
        this._frameCounter = 0;

        this._start();
    }


}