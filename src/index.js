const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

const startBtn = document.getElementById('start-btn');
const welcomingPage = document.getElementById('welcoming-page');
const levelTextField = document.getElementById('level');
const helpBtn = document.getElementById('help');
const verticalText = document.getElementsByClassName('vertical-text');

const startTheGame = () => {
    welcomingPage.style.display = 'none'; 
    levelTextField.style.display = 'flex'; 
    helpBtn.style.display= 'inline-block';
    [...verticalText].forEach(text => text.style.display = 'flex');
    game.start(); 
    helpBtn.onclick = () => {
        welcomingPage.style.display = 'flex';
        clearInterval(game.intervalId);
        game.audio.loop = false;
        game.audio.pause();
    };
    document.getElementById('welcoming-page').style.display = 'none'
}

startBtn.onclick = () => {
    localStorage.setItem('sharkGameLevel', 1);
    startTheGame();
}

if(localStorage.getItem('sharkGameLevel')) {
    startTheGame();
}