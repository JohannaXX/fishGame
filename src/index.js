const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

const startBtn = document.getElementById('start-btn');
const welcomingPage = document.getElementById('welcoming-page');
const levelTextField = document.getElementById('level');
const verticalText = document.getElementsByClassName('vertical-text');

/* startBtn.onclick = () => {
    welcomingPage.style.display = 'none';
    levelTextField.style.visibility = 'visible';
    [...verticalText].forEach(text => text.style.display = 'flex');
    game.start(); 
    document.getElementById('welcoming-page').style.display = 'none'
} */


game.start(); 