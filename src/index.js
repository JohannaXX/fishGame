const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

const gotItBtn = document.getElementById('gotIt-btn');
const startBtn = document.getElementById('start-btn');
const welcomingPage = document.getElementById('welcoming-page-container');
const levelTextField = document.getElementById('level');
const helpBtn = document.getElementById('help');
const verticalText = document.getElementsByClassName('vertical-text');

const deactivateWelcomingPage = () => {
    gotItBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';
    welcomingPage.style.display = 'none'; 
    levelTextField.style.display = 'flex'; 
    [...verticalText].forEach(text => text.style.display = 'flex');
    helpBtn.style.display= 'inline-block';
    helpBtn.onclick = () => {
        welcomingPage.style.display = 'flex';
        clearInterval(game.intervalId);
        game.audio.loop = false;
        game.audio.pause();
    };
    document.getElementById('welcoming-page').style.display = 'none';
}

gotItBtn.onclick = () => {
    deactivateWelcomingPage();
}

startBtn.onclick = () => {
    console.log('object');
    startBtn.style.display = 'none';
    localStorage.setItem('sharkGameLevel', 1);
    game.start();
}

if(localStorage.getItem('sharkGameLevel')) {
    deactivateWelcomingPage();
}