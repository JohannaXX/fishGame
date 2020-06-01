class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this.intervalId;
        this.intervalCounter = 0;

        this.fishfood = [];
        this.player = new Player();
        this.allFish = [];
    }
    start() {
        for (let i = 0; i< 5; i++) this.allFish.push(new Fish(ctx));

        this.intervalId =  setInterval(() => {
            this._clear();
            this._draw();
            this._move();
            this._checkIfGettingSmaller();
            this._checkForCollision();
            if (this.intervalCounter == 0 || this.intervalCounter % 300 === 0) {
                this.allFish.push(new Fish(ctx))
            }
            if (this.intervalCounter % 1200 === 0 && this.intervalCounter !== 0) {
               this._generateFood();
            }
            this.intervalCounter++;
          }, 1000 / 60);    
    }

    _clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }

    _draw() {
        this.fishfood.forEach( food => food._draw());
        this.allFish.forEach( fish => fish._draw());
        this.player._draw();
    }

    _move() {
        this.fishfood.forEach( food => food._move());
        this.allFish.forEach( fish => fish._move());
        this.player._move()
    }

    _generateFood() {
        const amount = Math.floor(Math.random() * 3 + 2);
        for (let i = 0; i<= amount; i++) this.fishfood.push(new Fishfood(ctx));
    }

    _checkIfGettingSmaller() {
        this.player._checkIfGettingSmaller();
        this.allFish.forEach( fish => fish._checkIfGettingSmaller());
        this._checkIfDead();
    }

    _checkIfDead() {
        if (this.player.isDead === true) {
            this._gameOver();
        }
        this.allFish.forEach( fish => {
            if (fish.isDead === true) {
                this.allFish = this.allFish.filter( f => f !== fish);
            }
        });
    }

    _checkForCollision() {
        this.allFish.forEach( fish => {
            const collXWithPlayer = fish.x < (this.player.x + this.player.w) && (fish.x + fish.w) > this.player.x;
            const collYWithPlayer = (fish.y + fish.h) > this.player.y && fish.y < (this.player.y + this.player.h);
            if(collXWithPlayer && collYWithPlayer) {
                if (fish.w * fish.h > this.player.w * this.player.h) {
                    this._gameOver();
                } else {
                    this.player._eating();
                    this.allFish = this.allFish.filter( f => f !== fish);
                }
            }

            this.allFish.filter(allTheOthers => allTheOthers !== fish).forEach( otherFish => {
                const collXWithOtherFish = fish.x < (otherFish.x + otherFish.w) && (fish.x + fish.w) > otherFish.x;
                const collYWithOtherFish = (fish.y + fish.h) > otherFish.y && fish.y < (otherFish.y + otherFish.h);
                if(collXWithOtherFish && collYWithOtherFish) {
                    if (fish.w * fish.h > otherFish.w * otherFish.h) {
                        fish._eating();
                        this.allFish = this.allFish.filter( f => f !== otherFish);
                    } else {
                        otherFish._eating();
                        this.allFish = this.allFish.filter( f => f !== fish);
                    }
                }
            })
        });
    }

    _gameOver() {
        clearInterval(this.intervalId);
        this._ctx.fillStyle = 'white';
        this._ctx.textAlign = 'center';
        this._ctx.font = '6rem Arial';
        this._ctx.fillText('Game over!', this._ctx.canvas.width / 2 , this._ctx.canvas.height / 2)
    }
}