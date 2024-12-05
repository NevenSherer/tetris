const tetrominos = {
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'O': [
        [1, 1],
        [1, 1]
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ]
};

const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};

document.addEventListener('keydown', function(e) {
    if (gameOver) {
        return;
    }

    if (e.whichKey == 37 || e.whichKey == 39) {
        const col = e.whichKey == 37
            ? tetromino.col - 1
            : tetromino.col + 1;

        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
            tetromino.col = col;
        }
    }

    if (e.whichKey == 38) {
        const matrix = rotate(tetromino.matrix);
        if (isValidMove(matrix, tetromino.matrix, tetromino.row)) {
            tetromino.matrix = matrix;
        }
    }

    if (e.whichKey == 40) {
        const row = tetromino.row + 1;
        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
            tetromino.row = row - 1;

            placeTetromino();
            return;
        }
        tetromino.row = row;
    }
});

function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {
                if (tetromino.row + row < 0) {
                    return showGameOver();
                }

                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }
    
    for (let row = playfield.length - 1; row >= 0; ) {
        if (playfield[row].every(cell => !!cell)) {
    
          // drop every row above this one
          for (let r = row; r >= 0; r--) {
            for (let c = 0; c < playfield[r].length; c++) {
              playfield[r][c] = playfield[r-1][c];
            }
          }
        }
        else {
          row--;
        }
      }
    
      tetromino = getNextTetromino();
}

function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;
  
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}