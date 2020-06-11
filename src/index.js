const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

const startBtn = document.getElementById('start-btn');
const welcomingPage = document.getElementById('welcoming-page');
const levelTextField = document.getElementById('level');
const verticalText = document.getElementsByClassName('vertical-text');

const startTheGame = () => {
    welcomingPage.style.display = 'none'; 
    levelTextField.style.display = 'flex'; 
    [...verticalText].forEach(text => text.style.display = 'flex');
    game.start(); 
    document.getElementById('welcoming-page').style.display = 'none'
}

startBtn.onclick = () => {
    startTheGame();
}

if(localStorage.getItem('sharkGameLevel')) {
    startTheGame();
}