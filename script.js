const gameboardElement = document.getElementById("gameboard");
const restartButton = document.getElementById("restart");

const TheGame = () => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const printBoard = () => {
    gameboardElement.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("id", i);
      cell.addEventListener("click", clickHandler);
      if (board[i] == "X") {
        cell.classList.add("x");
      } else if (board[i] == "O") {
        cell.classList.add("circle");
      }
      gameboardElement.appendChild(cell);
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    printBoard();
  };

  const checkWin = () => {
    return winningCombos.some((combo) => {
      return combo.every((index) => {
        return board[index] == currentPlayer;
      });
    });
  };

  const displayWinner = (currentPlayer) => {
    winningTextElement.classList.add("show");
    winningText.textContent = `${currentPlayer} wins!`;
    restartButton.addEventListener("click", () => {
      winningTextElement.classList.remove("show");
      winningText.textContent = "";
      resetBoard();
    });
  };

  const displayDraw = () => {
    winningTextElement.classList.add("show");
    winningText.textContent = `Draw!`;
    restartButton.addEventListener("click", () => {
      winningTextElement.classList.remove("show");
      resetBoard();
    });
  };

  const swapPLayer = () => {
		
    currentPlayer == "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  };
	

  const clickHandler = (e) => {
    board[e.target.id] = currentPlayer;
    printBoard(e);
    if (checkWin()) {
      displayWinner(currentPlayer);
      printBoard(e);
    } else if (board.includes("") == false && checkWin() == false) {
      displayDraw();
      printBoard(e);
    }
    swapPLayer();
  };

  return { clickHandler, resetBoard };
};

const cellElements = document.querySelectorAll(".cell");
const winningTextElement = document.getElementById("winning-message");
const winningText = document.querySelector("[data-winning-message-text]");

const game = TheGame();

cellElements.forEach((cell) => {
  cell.addEventListener("click", game.clickHandler, { once: true });
});
