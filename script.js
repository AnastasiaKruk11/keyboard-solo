const wordHolder = document.querySelector('.word');
const letterFaultCounter = document.querySelector('.word-mistakes');
const correctWordsCounter = document.querySelector('.correct-count');
const wrongWordsCounter = document.querySelector('.wrong-count');
const timer = document.querySelector('#timer');

const timerClock = timer.innerText.split(':');

let minutes = timerClock[0];
let seconds = timerClock[1];
let timerRun;

let letterCounter = 0;

const words = ['wind', 'tree', 'programmer', 'glass', 'water', 'codegirl', 'yellow', 'book', 'winter', 'education', 'picture', 'december', 'flower', 'phone', 'adventure', 'computer', 'kitten', 'smile', 'happiness', 'friend', 'mirror'];

document.addEventListener('keydown', (event) => {
    const letters = Array.from(document.querySelectorAll('.word span'));
    console.log(letters);
    let currentLetter = letters[letterCounter];
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
        nextWord();
    };

    if (correctWordsCounter.textContent === '0' && letterCounter === 1 && wrongWordsCounter.textContent === '0') {

        timerRun = setInterval(() => {

            minutes = timerClock[0];
            seconds++;

            if (seconds > 59) {
                seconds = 0;
                minutes++;
            } else if (seconds < 10) {
                seconds = '0' + seconds;
            };

            timer.innerText = `${minutes}:${seconds}`;

        }, 1000);

    } else if (correctWordsCounter.textContent === '5' && letterCounter === 0) {
        restartGame();
    };
});

function renderWord(word) {
    wordHolder.innerHTML = word.split('').map((char) => `<span>${char}</span>`).join('');
};

function getRandomWord(arr) {
    return arr[Math.ceil(Math.random() * (arr.length - 1))];
};

function nextWord() {
    renderWord(getRandomWord(words));
    if (+(letterFaultCounter.textContent) > 0) {
        wrongWordsCounter.textContent++;
    } else {
        correctWordsCounter.textContent++;
    };

    letterCounter = 0;
    letterFaultCounter.textContent = 0;
};

function restartGame() {
    alert(`Победа! Ваше время ${minutes}:${seconds}`);
    clearInterval(timerRun);
    minutes = 0;
    seconds = 0;
    timer.innerText = `0${minutes}:0${seconds}`;
    correctWordsCounter.textContent = 0;
    wrongWordsCounter.textContent = 0;
};