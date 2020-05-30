document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#scort');
    const startBtn = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;

    // The Tetrominos
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const tTetramino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const zTetramino = [
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1]
    ]

    const oTetramino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetramino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetraminos = [lTetromino, tTetramino, zTetramino, oTetramino, iTetramino]

    let currentPosition = 4;
    let currentRotation = 0;


    // random select a tetramino
    let random = Math.floor(Math.random() * theTetraminos.length);
    let current = theTetraminos[random][currentRotation];

    // draw the Tetramino
    function draw() {
        current.forEach(i => {
            squares[currentPosition + i].classList.add('tetromino')
        })
    }

    // undraw the Tetramino
    function undraw() {
        current.forEach(i => {
            squares[currentPosition + i].classList.remove('tetromino')
        })
    }

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }


    //freeze function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetrmino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetraminos.length);
            current = theTetraminos[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }

    //move the tetramino left unless it is at the edge or there is a blockage
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if (!isAtLeftEdge) currentPosition -= 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }

        draw();
    }

    //move the tetramino right unless it is at the edge or there is a blockage
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isAtRightEdge) currentPosition += 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }

        draw();
    }

    // rotate tetramino
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0
        }

        current = theTetraminos[random][currentRotation]
        draw();
    }

    // show next-up tetramino in mini grid
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    // the tetraminos without rotations
    const upNextTetramino = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // Ltetramino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // Ttetramono
        [displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1], // ztetramino
        [0, 1, displayWidth, displayWidth + 1], // oTetramino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // iTetramino
    ]

    // display tetramino in mini-grid
    function displayShape() {
        // remove any tetramino class from every square
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })

        upNextTetramino[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }

    // asign functions to keyCode
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    // make the tetramino move down
    timerId = setInterval(moveDown, 500);

});

