const allSquares = document.querySelectorAll(".board__square");
const boardTitle = document.querySelector(".board__title");

let currentPlayer = "X";
let board = new Array(9).fill(undefined);
let gameOver = false;

allSquares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (square.innerHTML || gameOver) {
      return;
    }
    square.textContent = currentPlayer;
    board[index] = currentPlayer;

    if (checkWin(index)) {
      boardTitle.innerHTML = `${currentPlayer} Wins!`;
      gameOver = true;
      return;
    }

    if (checkDraw()) {
      boardTitle.innerHTML = `It's A Draw!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    boardTitle.textContent = `${currentPlayer}'s Turn`;
  });
});

function checkDraw() {
  // Option 1 (remember to fill the array with undefined):
  return board.every((symbol) => {
    if (symbol) {
      return true;
    }
  });

  // Option 2:
  // for (let i = 0; i < board.length; i++) {
  //   if (!board[i]) {
  //     return false;
  //   }
  // }
  // return true;
}

function checkWin(index) {
  const winningIndecies = [
    // Horizontal Wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical Wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal Wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningIndecies.length; i++) {
    const matchingIndecies = winningIndecies[i];
    let symbol1 = board[matchingIndecies[0]];
    let symbol2 = board[matchingIndecies[1]];
    let symbol3 = board[matchingIndecies[2]];

    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    if (symbol1 === symbol2 && symbol2 === symbol3) {
      return true;
    }
  }
}

function restartGame() {
  board = new Array(9).fill(undefined);
  gameOver = false;

  boardTitle.textContent = `${currentPlayer}'s Turn`;

  allSquares.forEach((square) => (square.innerHTML = ""));
}
