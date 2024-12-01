const word = document.querySelector('.word');
let letters = Array.from(document.querySelectorAll('.word span'));
const letterFaultCounter = document.querySelector('.word-mistakes');
const correctWordsCounter = document.querySelector('.correct-count');
const wrongWordsCounter = document.querySelector('.wrong-count');
const timer = document.querySelector('#timer');

const timerClock = timer.innerText.split(':');

let minutes = timerClock[0];
let seconds = timerClock[1];
let timerRun;

let letterCounter = 0;

const words = ['wind', 'tree', 'programmer', 'glass', 'water', 'yellow', 'book', 'winter', 'education', 'picture', 'december', 'flower', 'phone', 'adventure', 'computer', 'kitten', 'smile', 'happiness'];

document.addEventListener('keydown', (event) => {
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

        if (+(letterFaultCounter.textContent) > 0) {
            wrongWordsCounter.textContent++;
        } else {
            correctWordsCounter.textContent++;
        };

        letterCounter = 0;
        letterFaultCounter.textContent = 0;
        letters = getRandomWord(words);
        word.textContent = letters;
    };

    if (correctWordsCounter.textContent === '0' && letterCounter === 1 && wrongWordsCounter.textContent === '0') {

        timerRun = setInterval(() => {
            seconds++;

            if (seconds > 59) {
                seconds = 0;
                minutes++;
            } else if (seconds < 10) {
                seconds = '0' + seconds;
            };

            timer.innerText = `${minutes}:${seconds}`;

        }, 1000);

    } else if (correctWordsCounter.textContent === '6' && letterCounter === 0) {
        alert(`Победа! Ваше время ${minutes}:${seconds}`);
        clearInterval(timerRun);
        minutes = 0;
        seconds = 0;
        timer.innerText = `0${minutes}:0${seconds}`;
        correctWordsCounter.textContent = 0;
        wrongWordsCounter.textContent = 0;
    };
});

function getRandomWord(arr) {
    return arr[Math.ceil(Math.random() * (arr.length - 1))];
}