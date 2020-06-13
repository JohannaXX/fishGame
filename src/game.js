class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this.intervalId;
        this.intervalCounter = 0;
        this.level = 1;
        this.roundWon = false;

        this.audio = new Audio ('./audios/inTheWater.mp3');
        this.audio.loop = true;
        this.audioGameOver = new Audio ('./audios/gameOver.mp3');
        this.audioYouWon = new Audio ('./audios/youWon.mp3');
        this.background = new Background(ctx);
        this.fishfood = [];
        this.player = new Player();
        this.allEnemies = [];
        this.allFish = [];
        this.allJellyfish = [];
        this.shark = [];
        this.shark.push(new Shark(this._ctx, this.level));
    }

    start() {
        const getLevel = localStorage.getItem('sharkGameLevel');
        if (+getLevel > this.level)  this.level = getLevel;


        const showLevel = document.getElementById('level-number');
        showLevel.innerHTML = this.level;

        this.audio.play();
        for (let i = 0; i< (1*this.level); i++) this.allFish.push(new Fish(ctx, this.level));
        for (let i = 0; i< (1*this.level); i++) this.allEnemies.push(new Enemy(ctx));
        this.allJellyfish.push(new Jellyfish(ctx));

        this.intervalId =  setInterval(() => {
            this._clear();
            this._draw();
            this._move();
            this._checkForCollision();
            this._checkIfReadyToFightShark();
            this.player._checkIfGettingSmaller();
            this._checkIfDead();
            if (this.intervalCounter % 50 === 0) {
                this.allFish.push(new Fish(ctx, this.level));
            }
            if (this.intervalCounter % 100 === 0) {
                this.allJellyfish.push(new Jellyfish(ctx));
            }
            if (this.intervalCounter % (400 / Math.ceil(this.level / 2)) === 0) {
                this.allEnemies.push(new Enemy(ctx))
            }
            if (this.intervalCounter % (300 / Math.ceil(this.level / 2)) === 0) {
               this._generateFood();
            }
            if (this.intervalCounter % 500 === 0 && this.intervalCounter !== 0) {
                this._clearAllOutOfSight();
            }
            if (this.intervalCounter % (500 / Math.ceil(this.level / 2)) === 0 && this.intervalCounter !== 0) {
                this.shark.push(new Shark(this._ctx, this.level));
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
            if (food.y + food.r > this._ctx.canvas.height) {
                    this.fishfood = this.fishfood.filter( f => f !== food);
            }
        })
        this.allFish.forEach( fish => {
            if (fish.x < 0 || fish.x + fish.w > this._ctx.canvas.width ) {
                this.allFish = this.allFish.filter( f => f !== fish);
            }
        })

        this.shark.forEach( sh => {
            if (sh.x < 0 || sh.x + sh.w > this._ctx.canvas.width ) {
                this.shark = this.shark.filter( s => s !== sh);
            }
        })
    }
    
    _draw() {
        this.background._draw();
        this.allFish.forEach( fish => fish._draw());
        this.fishfood.forEach( food => food._draw());
        this.player._draw();
        this.allJellyfish.forEach( jf => jf._draw());
        this.allEnemies.forEach( enemy => enemy._draw());
        this.shark.forEach( sh => sh._draw());
    }

    _move() {
        this.background._move();
        this.shark.forEach( sh => sh._move());;
        this.fishfood.forEach( food => food._move());
        this.allFish.forEach( fish => fish._move());
        this.player._move()
        this.allJellyfish.forEach( jf => jf._move());
        this.allEnemies.forEach( enemy => enemy._move());
    }

    _generateFood() {
        const amount = Math.floor(Math.random() * 3 + 2);
        for (let i = 0; i<= amount; i++) this.fishfood.push(new Fishfood(ctx));
    }

    _checkIfReadyToFightShark() {
        if(this.player.strength >= 80 && this.player.w >= 100) {
            this._ctx.canvas.style.borderColor = 'red';
            this._ctx.canvas.style.borderWidth = '10px';
            return true;
        }
    }

    _checkForCollision() {
        this._hitCanvasBorder();
        this._checkForFoodCollision();

        this.shark.forEach( sh => {
            const collXWithPlayer = sh.x < (this.player.x + this.player.w) && (sh.x + sh.w) > this.player.x ;
            const collYWithPlayer = (sh.y + sh.h)  > this.player.y && (sh.y +40) < (this.player.y + this.player.h);
            if(collXWithPlayer && collYWithPlayer) {
                if (this._checkIfReadyToFightShark()) {
                    if ((sh.movesToLeft && !this.player.movesToLeft) || (!sh.movesToLeft && this.player.movesToLeft)) {
                        this._youWon()
                    } else {
                        this._gameOver();
                    }
                } else if (sh.x > (this.player.x + this.player.w/2) && sh.movesToLeft) {
                    sh._eating();
                    this._gameOver();
                } else if ((sh.x + sh.w) > this.player.x && sh.movesToLeft === false) {
                    sh._eating();
                    this._gameOver();
                }
            }
        });

        this.allEnemies.forEach( enemy => {
            const collXWithPlayer = enemy.x +5 < (this.player.x + (this.player.w * 0.9)) && enemy.x + (enemy.w *0.9) > this.player.x +5;
            const collYWithPlayer = enemy.y + (enemy.h * 0.9) > this.player.y +5 && enemy.y +5 < this.player.y + (this.player.h *0.9);
            if(collXWithPlayer && collYWithPlayer) {
                if ((enemy.x + enemy.w) < (this.player.x + this.player.w/2) && enemy.movesToLeft === false) {    
                    enemy._eating();              
                    this._gameOver();
                }
                if (enemy.x > (this.player.x + this.player.w/2) && enemy.movesToLeft) {
                    enemy._eating();  
                    this._gameOver();
                } 
            }

            this.allFish.forEach( fish => {
                const collXWithEnemy = enemy.x +5 < (fish.x + (fish.w * 0.9)) && enemy.x + (enemy.w *0.9) > fish.x +5;
                const collYWithEnemy = enemy.y + (enemy.h * 0.9) > fish.y +5 && enemy.y +5 < fish.y + (fish.h *0.9);
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
            const collXWithPlayer = fish.x  < (this.player.x + this.player.w) && (fish.x + fish.w) > this.player.x;
            const collYWithPlayer = (fish.y + fish.h) > this.player.y && fish.y < (this.player.y + this.player.h);
            if(collXWithPlayer && collYWithPlayer) {
                if ((this.player.x + this.player.w) < (fish.x + (fish.w/3)) && this.player.movesToLeft === false) {
                    this.player._eating();
                    this.allFish = this.allFish.filter( f => f !== fish);
                }
                if (this.player.x > (fish.x + (fish.w/3)) && this.player.movesToLeft) {
                    this.player._eating();
                    this.allFish = this.allFish.filter( f => f !== fish);
                } 
            }
        });

        this.allJellyfish.forEach( jellyfish => {
            const collXWithPlayer = jellyfish.x +5 < (this.player.x + (this.player.w * 0.9)) && jellyfish.x + (jellyfish.w *0.9) > this.player.x +5;
            const collYWithPlayer = jellyfish.y + (jellyfish.h * 0.9) > this.player.y +5 && jellyfish.y +5 < this.player.y + (this.player.h *0.9);
            if(collXWithPlayer && collYWithPlayer && !this.player.hitByJellyFish) {
                this.player.hitByJellyFish = true;
                this.player._updateStrength('subtract');
                this.player.w *= 0.95;
                this.player.h *= 0.95;
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
        if (this.player.x <= 0 || this.player.x + this.player.w >= this._ctx.canvas.width) {
            this.player._changeDirection('x');
        } else if ( this.player.y <= 0 || this.player.y + this.player.h >= this._ctx.canvas.height ) {
            this.player._changeDirection('y');
        }
    }

    _checkIfDead() {
        if (this.player.isDead === true) {
            this._gameOver();
        }
    }

    _youWon() {
        if(this.roundWon === false) {
            this.roundWon = true;
            localStorage.setItem('sharkGameLevel', +this.level +1);
        }
        this.audioYouWon.play();
        this.audio.pause();
        this.audio.loop = false;

        clearInterval(this.intervalId);
        this._ctx.fillStyle = 'white';
        this._ctx.textAlign = 'center';
        this._ctx.font = '6rem Arial';
        this._ctx.fillText('You won!!!', this._ctx.canvas.width / 2 , this._ctx.canvas.height / 2);
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.style.display = 'flex';
        continueBtn.onclick = () => {
            this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
            location.reload();
        }
    }

    _gameOver() {
        this.audioGameOver.play();
        this.audio.pause();
        this.audio.loop = false;
        setTimeout(() => {
            
            clearInterval(this.intervalId);
            this._ctx.fillStyle = 'white';
            this._ctx.textAlign = 'center';
            this._ctx.font = '6rem Arial';
            this._ctx.fillText('Game over!', this._ctx.canvas.width / 2 , this._ctx.canvas.height / 2);

            const playAgainBtn = document.getElementById('play-again-btn');
            playAgainBtn.style.display = 'flex';
            playAgainBtn.onclick = () => {
                this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
                location.reload();
            }
        }, 500);
        
    }

}