class Fishfood {
    constructor(ctx) {
        this._ctx = ctx;

        this.x = Math.random() * (this._ctx.canvas.width - 20);
        this.y = 0;
        this.r = Math.ceil(Math.random() * 4 + 0.5);
        this.vy = Math.ceil(Math.random() * 9) / 3;
        this.color = Math.random() < 0.5 ? 'yellow' : 'red';
    }

    _draw() {
        this._ctx.beginPath();
        this._ctx.fillStyle = this.color;
        this._ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this._ctx.fill();
    }

    _move() {
        this.y += this.vy;
    }
}