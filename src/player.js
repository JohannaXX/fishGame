class Player extends Fish {
    constructor() {
        super(ctx);
        this._ctx = ctx;
        this.bonus = 0;

        this._img = new Image;
        this._img.src = '../images/player.png';

        this.x = (this._ctx.canvas.width / 2) - (this.w / 2);
        this.y = (this._ctx.canvas.height / 2) - (this.h / 2);

        this._setListeners()
    }

    _draw() {
        this._ctx.drawImage(this._img, 0, this._img.height / 2, this._img.width / 6, this._img.height / 2, this.x, this.y, this.w, this.h);
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
       /*  background-image: linear-gradient( #FFF3CA , transparent);  */
       /*  progressBar.style.backgroundImage = (`#FFF3CA ${this.energy}%, transparent`); */
        progressBar.style.height = (`${100-this.energy}%`);
        if (this.energy <= 0) this.isDead = true;
    }

    _updateBonus(update) {
        const bonusArea = document.getElementById('bonusses');
        switch(update) {
            case 'add':
                this.bonus += 10;
                break;
            case 'subtract':
                this.bonus -= 10;
                break;
        }
        bonusArea.style.height = (`${100-this.bonus}%`);
    }
}