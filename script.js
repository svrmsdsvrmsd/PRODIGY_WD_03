const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

function handleCellClick(index) {
  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    if (checkWin()) {
      alert(`Player ${currentPlayer} wins!`);
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      alert('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return false;
}

function handleResetGame() {
  board.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    handleCellClick(index);
  });
});

resetButton.addEventListener('click', handleResetGame);
