class Player extends Fish {
    constructor() {
        super(ctx);
        this._ctx = ctx;
        this.color = 'yellow';

        this._setListeners()
    }

    _setListeners() {
        const UP = 38;
        const DOWN = 40;
        const RIGHT = 39;
        const LEFT = 37;
        //const SPACE = 32;

        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case UP:
                    this.y -= 5;
                    this.vy -= 0.1;
                    break
                case DOWN:
                    this.y += 5;
                    this.vy += 0.1;
                    break
                case RIGHT:
                    this.x += 5
                    this.vx += 0.1;
                    break
                case LEFT:
                    this.x -= 5
                    this.vx -= 0.1;
                    break
                /* case SPACE:
                    this.eat()
                    break; */
          }
        })
    
        document.addEventListener('keyup', e => {
            switch (e.keyCode) {
                case UP:
                    this.y += 0;
                    this.vy = -0.1;
                    break
                case DOWN:
                    this.y += 0;
                    this.vy = 0.1;
                    break
                case RIGHT:
                    this.x += 0
                    this.vx = 0.1;
                    break
                case LEFT:
                    this.x -= 0
                    this.vx = -0.1;
                    break
                /* case SPACE:
                    this.notEating()
                    break; */
          }
        })
    }
}