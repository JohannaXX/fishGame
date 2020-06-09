class Player extends Enemy {
    constructor() {
        super(ctx);
        this._ctx = ctx;
        this.energy = 100;
        this.strength = 20;
        this.eatingInterval = true;
        this.isDead = false;
        this.hitByJellyFish = false;
        /* this.audioReduceSize = new Audio('../audios/reduceSize.mp3');
        this.audioEatFish = new Audio('../audios/eatingFish.mp3');
        this.audioOpenMouth = new Audio('../audios/openMouth.mp3'); */

        this._img = new Image;
        this._img.src = '../images/playerRed.png';
        this._img.frames = 6;
        this._img.frameIndex = 0;
        this._img.rows = 5;
        this._img.rowCutIndex = this.movesToLeft ? 0 : 2;
        this.w = 50;
        this.h = this.w * 0.7;
        this.x = (this._ctx.canvas.width / 2) - (this.w / 2);
        this.y = (this._ctx.canvas.height / 2) - (this.h / 2);

        this._setListeners();
        this._setEatingTimer();    
        this._updateStrength();
        this._openMouth();
        this._closeMouth();
    }

    _changeDirection() {/* overwriting parent class method */};

    _setEatingTimer() {
        if (this.eatingInterval) {
            this.eatingInterval = false;
            const countInterval = setInterval(() => {
                this.eatingInterval = true;
                this.energy -= 10
            }, 1000);   
        }
    }

    _move() {
        this.x += this.vx;
        this.y += this.vy;
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
        if (this.energy <= 0) {
            this.energy = 100;
            this.w *= 0.9;
            this.h *= 0.9;
        }
        if(this.w < 20) {
            this.isDead = true;
        }
    }

    _eating() {
       /*  this.audioEatFish.play(); */
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
        if (this.w <= 250) {
            this.w *= 1.2;
            this.h *= 1.2;
        }
       
    }

    _openMouth() {
        /* this.audioOpenMouth.play(); */
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
                    this.y -= 4;
                    this.vy -= 0.3;
                    break
                case DOWN:
                    this.y += 4;
                    this.vy += 0.3;
                    break
                case RIGHT:
                    this.x += 4;
                    this.vx += 0.3;
                    if(this.movesToLeft) {this.movesToLeft = false; this._img.rowCutIndex = 2;}
                    break
                case LEFT:
                    this.x -= 4;
                    this.vx -= 0.3;
                    if(!this.movesToLeft) {this.movesToLeft = true; this._img.rowCutIndex = 0;}
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
                    //this.vy = -1;
                    break
                case DOWN:
                    this.y += 0;
                    //this.vy = 1;
                    break
                case RIGHT:
                    this.x += 0
                    //this.vx = 1;
                    break
                case LEFT:
                    this.x -= 0
                    //this.vx = -1;
                    break
                case SPACE:
                    this._closeMouth();
                    break;
          }
        })
    }

    _checkEnergyLevel() {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.height = (`${100-this.energy}%`);
       // if (this.energy <= 0) this.isDead = true;
    }

    _updateStrength(update) {
        const strengthArea = document.getElementById('strength');
        switch(update) {
            case 'add':
                this.strength += 10;
                break;
            case 'subtract':
                this.strength -= 10;
                /* this.audioReduceSize.play(); */
                break;
        }
        strengthArea.style.height = (`${100-this.strength}%`);
    }
}