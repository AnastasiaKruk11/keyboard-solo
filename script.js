const wordHolder = document.querySelector('.word');
const letterFaultCounter = document.querySelector('.word-mistakes');
const correctWordsCounter = document.querySelector('.correct-count');
const wrongWordsCounter = document.querySelector('.wrong-count');
const timer = document.querySelector('#timer');

const timerClock = timer.innerText.split(':');

let minutes = timerClock[0];
let seconds = timerClock[1];
let timerRun;
let timerMode = 'off';

let letterCounter = 0;

const words = ['wind', 'tree', 'programmer', 'glass', 'water', 'codegirl', 'yellow', 'book', 'winter', 'education', 'picture', 'december', 'flower', 'phone', 'adventure', 'computer', 'kitten', 'smile', 'happiness', 'friend', 'mirror'];

document.addEventListener('keydown', (event) => {
    const letters = Array.from(document.querySelectorAll('.word span'));
    const currentLetter = letters[letterCounter];
    const keyValue = event.key;

    if (keyValue === currentLetter.textContent) {
        currentLetter.classList.remove('w');
        currentLetter.classList.add('c');
        letterCounter++;
    } else {
        currentLetter.classList.add('w');
        letterFaultCounter.textContent++;
    };

    if (letterCounter === letters.length) {

        if (+(letterFaultCounter.textContent) > 0) {
            wrongWordsCounter.textContent++;
        } else {
            correctWordsCounter.textContent++;
        };
        setTimeout(nextWord, 0);
    };

    if (timerMode === 'off') {

        timerMode = 'on';
        timerRun = setInterval(() => {

            seconds++;

            if (seconds > 59) {
                seconds = '00';
                minutes++;
            } else if (seconds < 10) {
                seconds = '0' + seconds;
            };

            timer.innerText = `${minutes}:${seconds}`;

        }, 1000);
    };
});

function renderWord(word) {
    wordHolder.innerHTML = word.split('').map((char) => `<span>${char}</span>`).join('');
};

function getRandomWord(arr) {
    return arr[Math.ceil(Math.random() * (arr.length - 1))];
};

function nextWord() {
    checkGameOver();
    renderWord(getRandomWord(words));
    letterCounter = 0;
    letterFaultCounter.textContent = 0;
};

function restartGame() {
    clearInterval(timerRun);
    timerMode = 'off';
    minutes = '00';
    seconds = '00';
    timer.innerText = `${minutes}:${seconds}`;
    correctWordsCounter.textContent = 0;
    wrongWordsCounter.textContent = 0;
};

function checkGameOver() {
    if (+correctWordsCounter.textContent === 5) {
        alert(`Победа! Ваше время ${minutes}:${seconds}`);
        restartGame();
    };
    if (+wrongWordsCounter.textContent === 5) {
        alert(`Вы проиграли :(`);
        restartGame();
    }
};