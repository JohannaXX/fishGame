class Player extends Fish {
    constructor() {
        super(ctx);
        this._ctx = ctx;
        this.bonus = 0;

        this.x = (this._ctx.canvas.width / 2) - (this.w / 2);
        this.y = (this._ctx.canvas.height / 2) - (this.h / 2);

        this._setListeners()
    }

    _draw() {
        this._ctx.drawImage(this._img, 0, this._img.height / 4, this._img.width / 6, this._img.height / 4, this.x, this.y, this.w, this.h);
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

    _checkEnergyLevel() {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.height = (`${this.energy}%`);
    }

    _updateBonus(update) {
        const bonusArea = document.getElementById('bonusses');
        bonusArea.style.height = (`${this.bonus}%`);
        switch(update) {
            case 'add':
                this.bonus += 0.05;
                break;
            case 'subtract':
                this.bonus -= 5;
                break;
        }
    }
}