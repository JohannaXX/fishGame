class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this.intervalId;
        this.intervalCounter = 0;

        //this.audio = new Audio ('../audios/waterBackground.mp3');
        this.audio = new Audio ('../audios/inTheWater.mp3');
        this.audio.loop = true;
        this.audioGameOver = new Audio ('../audios/gameOver.mp3');
        this.audioYouWon = new Audio ('../audios/youWon.mp3');
        this.background = new Background(ctx);
        this.fishfood = [];
        this.player = new Player();
        this.allEnemies = [];
        this.allFish = [];
        this.allJellyfish = [];
        this.shark = new Shark(ctx);
    }
    start() {
        this.audio.play();
        for (let i = 0; i< 10; i++) this.allFish.push(new Fish(ctx));
        for (let i = 0; i< 2; i++) this.allEnemies.push(new Enemy(ctx));
        this.allJellyfish.push(new Jellyfish(ctx));

        this.intervalId =  setInterval(() => {
            this._clear();
            this._draw();
            this._move();
            this._checkIfGettingSmaller();
            this._checkForCollision();
            this._checkIfReadyToFightBigFish();
            if (this.intervalCounter % 150 === 0) {
                this.allFish.push(new Fish(ctx));
                this.allJellyfish.push(new Jellyfish(ctx));
            }
            if (this.intervalCounter % 500 === 0) {
                this.allEnemies.push(new Enemy(ctx))
            }
            if (this.intervalCounter % 1200 === 0 && this.intervalCounter !== 0) {
               this._generateFood();
            }
            if (this.intervalCounter % 2000 === 0 && this.intervalCounter !== 0) {
                this._clearAllOutOfSight();
            }
            if (this.intervalCounter % 3000 === 0) {
                this.shark = new Shark(ctx);
            }
            this.intervalCounter++;
            this.player._checkEnergyLevel();
          }, 1000 / 10);    
    }

    _clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }

    _clearAllOutOfSight() {
        this.allEnemies.forEach( enemy => {
            if (enemy.x < 0 || 
                enemy.x + enemy.w > this._ctx.canvas.width || 
                enemy.y < 0 || 
                enemy.y + enemy.h > this._ctx.canvas.height ) {
                    this.allEnemies = this.allEnemies.filter( e => e !== enemy);
            }
        })
        this.fishfood.forEach( food => {
            if (food.x < 0 || 
                food.x + food.w > this._ctx.canvas.width || 
                food.y < 0 || 
                food.y + food.h > this._ctx.canvas.height ) {
                    this.fishfood = this.fishfood.filter( f => f !== food);
            }
        })
        this.allFish.forEach( fish => {
            if (fish.x < 0 || fish.x + fish.w > this._ctx.canvas.width ) {
                    this.allFish = this.allFish.filter( f => f !== fish);
            }
        })
    }
    
    _draw() {
        this.background._draw();
        this.fishfood.forEach( food => food._draw());
        this.allJellyfish.forEach( jf => jf._draw());
        this.allFish.forEach( fish => fish._draw());
        this.player._draw();
        this.allEnemies.forEach( enemy => enemy._draw());
        this.shark._draw();
    }

    _move() {
        this.background._move();
        this.shark._move();
        this.fishfood.forEach( food => food._move());
        this.allFish.forEach( fish => fish._move());
        this.player._move()
        this.allJellyfish.forEach( jf => jf._move());
        this.allEnemies.forEach( enemy => enemy._move())
    }

    _generateFood() {
        const amount = Math.floor(Math.random() * 3 + 2);
        for (let i = 0; i<= amount; i++) this.fishfood.push(new Fishfood(ctx));
    }

    _checkIfGettingSmaller() {
        this.player._checkIfGettingSmaller();
        this._checkIfDead();
    }

    _checkIfReadyToFightBigFish() {
        if(this.player.strength >= 90) {
            this._ctx.canvas.style.borderColor = 'red';
        }
    }

    _checkForCollision() {
        this._hitCanvasBorder();
        this._checkForFoodCollision();

        const collXWithPlayer = this.shark.x +10 < this.player.x + this.player.w && this.shark.x + this.shark.w > this.player.x ;
        const collYWithPlayer = this.shark.y + (this.shark.h * 0.8) > this.player.y +10 && this.shark.y + (this.shark.h/ 2) < this.player.y + (this.player.h *0.8);
        if(collXWithPlayer && collYWithPlayer) {
            if ((this.shark.x + this.shark.w) < (this.player.x + this.player.w/2) && this.shark.movesToLeft === false) {
                this.shark._eating();
                this._gameOver();
            }
            if (this.shark.x > (this.player.x + this.player.w/2) && this.shark.movesToLeft) {
                this.shark._eating();
                this._gameOver();
            } 
        }

        this.allEnemies.forEach( enemy => {
            const collXWithPlayer = enemy.x +10 < (this.player.x + (this.player.w * 0.8)) && enemy.x + (enemy.w *0.8) > this.player.x +10;
            const collYWithPlayer = enemy.y + (enemy.h * 0.8) > this.player.y +10 && enemy.y +10 < this.player.y + (this.player.h *0.8);
            if(collXWithPlayer && collYWithPlayer) {
                if ((enemy.x + enemy.w) < (this.player.x + this.player.w/2) && enemy.movesToLeft === false) {                  
                    this._gameOver();
                }
                if (enemy.x > (this.player.x + this.player.w/2) && enemy.movesToLeft) {
                    this._gameOver();
                } 
            }

            this.allFish.forEach( fish => {
                const collXWithEnemy = enemy.x +10 < (fish.x + (fish.w * 0.8)) && enemy.x + (enemy.w *0.8) > fish.x +10;
                const collYWithEnemy = enemy.y + (enemy.h * 0.8) > fish.y +10 && enemy.y +10 < fish.y + (fish.h *0.8);
                if(collXWithEnemy && collYWithEnemy && fish.x > 50 && fish.x < this._ctx.canvas.width - 50) {
                    if ((enemy.x + enemy.w) < (fish.x + fish.w/2) && enemy.movesToLeft === false) {
                        enemy._eating();
                        this.allFish = this.allFish.filter( f => f !== fish);
                    }
                    if (enemy.x > (fish.x + fish.w/2) && enemy.movesToLeft) {
                        enemy._eating();
                        this.allFish = this.allFish.filter( f => f !== fish);
                    } 
                }
            })
        });

        this.allFish.forEach( fish => {
            const collXWithPlayer = fish.x +10 < (this.player.x + (this.player.w -10)) && fish.x + (fish.w -10) > this.player.x +10;
            const collYWithPlayer = fish.y + (fish.h -10) > this.player.y +10 && fish.y +10 < this.player.y + (this.player.h -10);
            if(collXWithPlayer && collYWithPlayer) {
                if ((this.player.x + this.player.w) < (fish.x + fish.w/2) && this.player.movesToLeft === false) {
                    this.player._eating();
                    this.allFish = this.allFish.filter( f => f !== fish);
                }
                if (this.player.x > (fish.x + fish.w/2) && this.player.movesToLeft) {
                    this.player._eating();
                    this.allFish = this.allFish.filter( f => f !== fish);
                } 
            }
        });

        this.allJellyfish.forEach( jellyfish => {
            const collXWithPlayer = jellyfish.x +10 < (this.player.x + (this.player.w * 0.8)) && jellyfish.x + (jellyfish.w *0.8) > this.player.x +10;
            const collYWithPlayer = jellyfish.y + (jellyfish.h * 0.8) > this.player.y +10 && jellyfish.y +10 < this.player.y + (this.player.h *0.8);
            if(collXWithPlayer && collYWithPlayer && !this.player.hitByJellyFish) {
                this.player.hitByJellyFish = true;
                this.player._updateStrength('subtract');
                this.player.w *= 0.90;
                this.player.h *= 0.90;
                this.player._resetHitByJellyfish();
            }
        });
    }

    _checkForFoodCollision() {
        this.fishfood.forEach( foodBall => {
            const collXWithPlayer = foodBall.x < (this.player.x + this.player.w) && (foodBall.x + foodBall.r) > this.player.x;
            const collYWithPlayer = (foodBall.y + foodBall.r) > this.player.y && foodBall.y < (this.player.y + this.player.h);
            if(collXWithPlayer && collYWithPlayer) {
                if (foodBall.color === 'yellow') {
                    this.player._updateStrength('add');
                    this.fishfood = this.fishfood.filter( fd => fd !== foodBall);
                } else {
                    this.player._updateStrength('subtract');
                    this.fishfood = this.fishfood.filter( fd => fd !== foodBall);
                }
            }
        })

        this.fishfood.forEach( foodBall => {
            this.allFish.forEach( fish => {
                const collXWithPlayer = foodBall.x < (fish.x + fish.w) && (foodBall.x + foodBall.r) > fish.x;
                const collYWithPlayer = (foodBall.y + foodBall.r) > fish.y && foodBall.y < (fish.y + fish.h);
                if(collXWithPlayer && collYWithPlayer) {
                    this.fishfood = this.fishfood.filter( fd => fd !== foodBall);
                }
            });

            this.allEnemies.forEach( enemy => {
                const collXWithPlayer = foodBall.x < (enemy.x + enemy.w) && (foodBall.x + foodBall.r) > enemy.x;
                const collYWithPlayer = (foodBall.y + foodBall.r) > enemy.y && foodBall.y < (enemy.y + enemy.h);
                if(collXWithPlayer && collYWithPlayer) {
                    this.fishfood = this.fishfood.filter( fd => fd !== foodBall);
                }
            });
        })
    }

    _hitCanvasBorder() {
        if (this.player.x <= 0 || 
            this.player.x + this.player.w >= this._ctx.canvas.width || 
            this.player.y <= 0 || 
            this.player.y + this.player.h >= this._ctx.canvas.height ) {
            this._gameOver();
        }
    }

    _checkIfDead() {
        if (this.player.isDead === true) {
            this._gameOver();
        }
    }

    _youWon() {
        this.audioYouWon.play();
    }

    _gameOver() {
        this.audio.loop = false;
        this.audioGameOver.play();
        setTimeout(() => {
            clearInterval(this.intervalId);
            this._ctx.fillStyle = 'white';
            this._ctx.textAlign = 'center';
            this._ctx.font = '6rem Arial';
            this._ctx.fillText('Game over!', this._ctx.canvas.width / 2 , this._ctx.canvas.height / 2)
            console.log(this.allEnemies);
            console.log(this.fishfood);
            console.log(this.allFish);
            console.log(this.fishfood);
            console.log(this.shark);
        }, 500);
    }
}