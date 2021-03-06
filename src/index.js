const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

const gotItBtn = document.getElementById('gotIt-btn');
const startBtn = document.getElementById('start-btn');
const welcomingPage = document.getElementById('welcoming-page');
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
    document.getElementById('welcoming-page').style.display = 'none';
}

gotItBtn.onclick = () => {
    location.reload();
    deactivateWelcomingPage();
    localStorage.setItem('sharkGameLevel', game.level?  game.level : 1);
}

startBtn.onclick = () => {
    startBtn.style.display = 'none';
    localStorage.setItem('sharkGameLevel', 1);
    game.start();
}

helpBtn.onclick = () => {
    welcomingPage.style.display = 'flex';
    levelTextField.style.display = 'none'; 
    [...verticalText].forEach(text => text.style.display = 'none');
    gotItBtn.style.display = 'inline-block';
    startBtn.style.display = 'none';
    clearInterval(game.intervalId);
    game.audio.loop = false;
    game.audio.pause();
};

if(localStorage.getItem('sharkGameLevel')) {
    deactivateWelcomingPage();
}