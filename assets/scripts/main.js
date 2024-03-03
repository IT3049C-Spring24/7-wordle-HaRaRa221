document.addEventListener('DOMContentLoaded', function() {
    const divGrid = document.getElementById('wordle-grid');
    const rows = 6;
    const cols = 5;
    let attemptsCurrent = 0;
    let positionCurrent = 0;
    let guessCurrent = '';
    let term = getRandomTerm();


    function addBoxToGrid(row, col) {
        const cell = document.createElement('div');
        cell.classList.add('letter');
        cell.id = `cell-${row}-${col}`;
        divGrid.appendChild(cell);
    }

    function setupGrid() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                addBoxToGrid(i, j);
            }
        }
    }

    function addLettertoCell(row, col, letter) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        cell.textContent = letter.toUpperCase();
    }

    function isLetter(letter) {
        return letter.length === 1 && letter.match(/[a-z]/i);
    }

    document.addEventListener('keydown', (event) => {
        const pressedKey = event.key.toLowerCase();

        if (isLetter(pressedKey)) {
            if (attemptsCurrent < 5) {
                addLettertoCell(attemptsCurrent, positionCurrent, pressedKey);
                guessCurrent += pressedKey;
                positionCurrent++;
            }
        } else if (pressedKey === 'backspace') {
            if (positionCurrent > 0) {
                positionCurrent--;
                addLettertoCell(attemptsCurrent, positionCurrent, '');
                guessCurrent = guessCurrent.slice(0, -1);
            }
        } else if (pressedKey === 'enter') {
            if (positionCurrent === term.length) {
                revealAttemptResult();
                attemptsCurrent++;
                positionCurrent = 0;
                guessCurrent = '';

                if (attemptsCurrent >= maxAttempts || guessCurrent === term) {
                    endGame();
                }
            }
        }

    });

    function revealAttemptResult() {
        const result = checkTerm(term, guessCurrent);
        for (let i = 0; i < result.length; i++) {
            const cell = document.getElementById(`cell-${attemptsCurrent}-${i}`);
            if(cell) {
                cell.classList.add(result[i]);
            }
        }
        
    }
    setupGrid();
});
async function getRandomTerm() {
    const terms = await fetch('https://it3049c-hangman.fly.dev');
    return terms[Math.floor(Math.random() * terms.length)];
}
function checkTerm(term, guess) {
    const result = [];
    for (let i = 0; i < term.length; i++) {
        if (term[i] === guess[i]) {
            result.push('correct');
        } else if (guess.includes(term[i])) {
            result.push('misplaced');
        } else {
            result.push('incorrect');
        }
    }
    return result;
}

getRandomTerm();


