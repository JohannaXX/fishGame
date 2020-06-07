class Player extends Enemy {
    constructor() {
        super(ctx);
        this._ctx = ctx;
        this.energy = 100;
        this.strength = 50;
        this.isDead = false;
        this.hitByJellyFish = false;

        this._img = new Image;
        this._img.src = '../images/playerRed.png';
        this._img.frames = 6;
        this._img.frameIndex = 0;
        this._img.rows = 5;
        this._img.rowCutIndex = this.movesToLeft ? 0 : 2;
        this.h = 70;
        this.w = 100;
        this.x = (this._ctx.canvas.width / 2) - (this.w / 2);
        this.y = (this._ctx.canvas.height / 2) - (this.h / 2);

        this._setListeners();
        this._setEatingTimer();
        this._updateStrength();
        this._openMouth();
        this._closeMouth();
    }

    _setEatingTimer() {
        this.eatingIntervalId =  setInterval(() => {
            this.eatingTimer++;
        }, 1000);    
    }

    _resetHitByJellyfish(){
        setTimeout(() => {
            this.hitByJellyFish = false;
        }, 2000)
    }

    _animation() {
        this._img.frameIndex++;
        if (this._img.frameIndex > 6) {
            this._img.frameIndex = 5;
        }
      
        if (this._img.frameIndex >= this._img.frames) {
        this._img.frameIndex = 0
        }
    };

    _checkIfGettingSmaller() {
        if (this.eatingTimer % 20 === 0) {
            this.energy -= 0.1;
            this.w -= 0.01;
            this.h -= 0.01;
        }
        if(this.w < 50) {
            this.isDead = true;
        }
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
        this.energy = 100;
        this.w *= 1.2;
        this.h *= 1.2;
    }

    _openMouth() {
        if (this.movesToLeft) {
            this._img.frameIndex = 0; 
            this._img.rowCutIndex = 1;
        } else {
            this._img.frameIndex = 0; 
            this._img.rowCutIndex = 3;
        }
        return true;
    }

    _closeMouth() {
        if (this.movesToLeft) {
            this._img.rowCutIndex = 0;
        } else {
            this._img.rowCutIndex = 2;
        }
        return true;
    }

    _setListeners() {
        const UP = 38;
        const DOWN = 40;
        const RIGHT = 39;
        const LEFT = 37;
        const SPACE = 32;

        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case UP:
                    this.y -= 5;
                    this.vy -= 1;
                    break
                case DOWN:
                    this.y += 5;
                    this.vy += 1;
                    break
                case RIGHT:
                    this.x += 5
                    this.vx += 1;
                    break
                case LEFT:
                    this.x -= 5
                    this.vx -= 1;
                    break
                case SPACE:
                    this._openMouth()
                    break;
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
                case SPACE:
                    this._closeMouth();
                    break;
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

    _updateStrength(update) {
        const strengthArea = document.getElementById('strength');
        switch(update) {
            case 'add':
                this.strength += 10;
                break;
            case 'subtract':
                this.strength -= 0.1;
                break;
        }
        strengthArea.style.height = (`${100-this.strength}%`);
    }
}