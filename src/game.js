class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this.intervalId;
        this.intervalCounter = 0;

        this.background = new Background(ctx);
        this.fishfood = [];
        this.player = new Player();
        this.allEnemies = [];
        this.allFish = [];
        this.orca = new Orca(ctx);
    }
    start() {
        for (let i = 0; i< 4; i++) this.allFish.push(new Fish(ctx));
        for (let i = 0; i< 2; i++) this.allEnemies.push(new Enemy(ctx));

        this.intervalId =  setInterval(() => {
            this._clear();
            this._draw();
            this._move();
            this._checkIfGettingSmaller();
            this._checkForCollision();
            if (this.intervalCounter % 150 === 0) {
                this.allFish.push(new Fish(ctx));
                
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
            if (this.intervalCounter % 5000 === 0) {
                this.orca = new Orca(ctx);
            }
            this.intervalCounter++;
            this.player._checkEnergyLevel();
          }, 1000 / 60);    
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
            if (fish.x < 0 || 
                fish.x + fish.w > this._ctx.canvas.width || 
                fish.y < 0 || 
                fish.y + fish.h > this._ctx.canvas.height ) {
                    this.allFish = this.allFish.filter( f => f !== fish);
            }
        })
    }
    
    _draw() {
        this.background._draw();
        this.orca._draw();
        this.fishfood.forEach( food => food._draw());
        this.allEnemies.forEach( enemy => enemy._draw())
        this.allFish.forEach( fish => fish._draw());
        this.player._draw();
    }

    _move() {
        this.background._move();
        this.orca._move();
        this.fishfood.forEach( food => food._move());
        this.allEnemies.forEach( enemy => enemy._move())
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

    _checkForCollision() {
        this._hitCanvasBorder();
        this._checkForFoodCollision();

        this.allEnemies.forEach( enemy => {
            const collXWithPlayer = enemy.x < (this.player.x + this.player.w) && (enemy.x + enemy.w) > this.player.x;
            const collYWithPlayer = (enemy.y + enemy.h) > this.player.y && enemy.y < (this.player.y + this.player.h);
            if(collXWithPlayer && collYWithPlayer) {
                this._gameOver();
            }

            this.allFish.forEach( fish => {
                const collXWithEnemy = enemy.x < (fish.x + fish.w) && (enemy.x + enemy.w) > fish.x;
                const collYWithEnemy = (enemy.y + enemy.h) > fish.y && enemy.y < (fish.y + fish.h);
                if(collXWithEnemy && collYWithEnemy && fish.x > 50 && fish.x < this._ctx.canvas.width - 50) {
                    enemy._eating();
                    this.allFish = this.allFish.filter( f => f !== fish);
                }
            })
        });

        this.allFish.forEach( fish => {
            const collXWithPlayer = fish.x < (this.player.x + this.player.w) && (fish.x + fish.w) > this.player.x;
            const collYWithPlayer = (fish.y + fish.h) > this.player.y && fish.y < (this.player.y + this.player.h);
            if(collXWithPlayer && collYWithPlayer) {
                if (this.player.w * this.player.h < fish.w * fish.h) {
                    this._gameOver();
                } else {
                    this.player._eating();
                    this.allFish = this.allFish.filter( f => f !== fish);
                }
            }
        });
    }

    _checkForFoodCollision() {
        this.fishfood.forEach( foodBall => {
            const collXWithPlayer = foodBall.x < (this.player.x + this.player.w) && (foodBall.x + foodBall.r) > this.player.x;
            const collYWithPlayer = (foodBall.y + foodBall.r) > this.player.y && foodBall.y < (this.player.y + this.player.h);
            if(collXWithPlayer && collYWithPlayer) {
                if (foodBall.color === 'yellow') {
                    this.player._updateBonus('add');
                    this.fishfood = this.fishfood.filter( fd => fd !== foodBall);
                } else {
                    this.player._updateBonus('subtract');
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
        })

        this.fishfood.forEach( foodBall => {
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
        this.allFish.forEach( fish => {
            if (fish.isDead === true) {
                this.allFish = this.allFish.filter( f => f !== fish);
            }
        });
    }

    _gameOver() {
        clearInterval(this.intervalId);
        this._ctx.fillStyle = 'white';
        this._ctx.textAlign = 'center';
        this._ctx.font = '6rem Arial';
        this._ctx.fillText('Game over!', this._ctx.canvas.width / 2 , this._ctx.canvas.height / 2)
        console.log(this.allEnemies);
        console.log(this.fishfood);
        console.log(this.allFish);
    }
}