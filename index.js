document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const result = document.getElementById("result");
  const resetButton = document.getElementById("reset");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;

  // Winning combinations
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) {
      return;
    }

    board[index] = currentPlayer;
    cell.innerHTML =
      currentPlayer === "X"
        ? '<i class="fas fa-times"></i>'
        : '<i class="far fa-circle"></i>';

    if (checkWinner(currentPlayer)) {
      result.innerText = `${currentPlayer} wins!`;
      result.classList.remove("hidden");
      highlightWinningCells();
      gameActive = false;
      return;
    }

    if (!board.includes("")) {
      result.innerText = "It's a tie!";
      result.classList.remove("hidden");
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner(player) {
    return winPatterns.some((pattern) =>
      pattern.every((index) => board[index] === player)
    );
  }

  function highlightWinningCells() {
    winPatterns.forEach((pattern) => {
      if (pattern.every((index) => board[index] === currentPlayer)) {
        pattern.forEach((index) => cells[index].classList.add("winning-cell"));
      }
    });
  }

  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    result.innerText = "";
    result.classList.add("hidden");
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("winning-cell");
    });
  }

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", resetGame);
});
