const boardContainer = document.querySelector('.board-container');
const playerButtons = document.querySelectorAll('.player');
const player1Button = document.querySelector('.player1');
const player2Button = document.querySelector('.player2');
const playerInfo = document.querySelector('.player-info');

const gameBoardModule = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  return {gameBoard};
})();

const playerFactory = (first) => {
  let playerMoves = ["", "", "", "", "", "", "", "", ""];
  return { first, playerMoves };
};

const player1 = playerFactory(true);
const player2 = playerFactory(false);

const displayGameBoardModule = (() => {
  function displayGameBoard() {
    let count = 0;
    let clickCounter = 0;
    for (const move of gameBoardModule.gameBoard) {
      const boardCell = document.createElement('div');
      boardCell.classList.add('boardCell');
      boardCell.setAttribute("id", count);
      boardCell.textContent = move;
      boardCell.addEventListener("click", () => {
        if (boardCell.textContent === "") {
          if (clickCounter % 2 == 0) {
            boardCell.textContent = "X";
            player1Button.classList.remove('clicked');
            player2Button.classList.add('clicked');
            player1.playerMoves.splice(boardCell.id, 1, "X");
            console.log(boardCell.id);
            console.log(player1.playerMoves);
          } else {
            boardCell.textContent = "O";
            player1Button.classList.add('clicked');
            player2Button.classList.remove('clicked');
            player2.playerMoves.splice(boardCell.id, 1, "O");
            console.log(boardCell.id);
            console.log(player2.playerMoves);
          }
          clickCounter++;
          game.determineWinner();
        }
      })
      boardContainer.appendChild(boardCell); 
      count++;
    }
  }
  return { displayGameBoard };
})();

const game = (() => {
  const xWinningCombos = [
    ['X', '', '', 'X', '', '', 'X', '', ''],
    ['X', 'X', 'X', '', '', '', '', '', ''],
    ['X', '', '', '', 'X', '', '', '', 'X'],
    ['', 'X', '', '', 'X', '', '', 'X', ''],
    ['', '', 'X', '', '', 'X', '', '', 'X'],
    ['', '', '', 'X', 'X', 'X', '', '', ''],
    ['', '', '', '', '', '', 'X', 'X', 'X'],
    ['', '', 'X', '', 'X', '', 'X', '', '']
  ]
  const yWinningCombos = [
    ['O', '', '', 'O', '', '', 'O', '', ''],
    ['O', 'O', 'O', '', '', '', '', '', ''],
    ['Y', '', '', '', 'O', '', '', '', 'O'],
    ['', 'O', '', '', 'O', '', '', 'O', ''],
    ['', '', 'O', '', '', 'O', '', '', 'O'],
    ['', '', '', 'O', 'O', 'O', '', '', ''],
    ['', '', '', '', '', '', 'O', 'O', 'O'],
    ['', '', 'O', '', 'O', '', 'O', '', '']
  ]

  let gameIsOver = false;

  function determineWinner() {
    for (const xCombo of xWinningCombos) {
      if (player1.playerMoves.every((val, index) => val === xCombo[index])) {
        console.log("Player 1 wins!");
        gameOver("player1");
      }
    }
    for (const yCombo of yWinningCombos) {
      if (player2.playerMoves.every((val, index) => val === yCombo[index])) {
        console.log("Player 2 wins!");
        gameOver("player2");
      }
    }
  }

  function gameOver(winner) {
    gameIsOver = true;

    player1Button.classList.remove('clicked');
    player2Button.classList.remove('clicked');

    const boardCells = document.querySelectorAll(".boardCell");

    if (winner == "player1") {
      player1Button.classList.add('winner');
      player2Button.classList.add('loser');
      playerInfo.textContent = "Player 1 wins!";
      boardCells.forEach((boardCell) => {
        if (boardCell.textContent == "X") {
          boardCell.classList.add("winner");
        }
        if (boardCell.textContent == "O") {
          boardCell.classList.add("loser");
        }
      })
    }
    if (winner == "player2") {
      player2Button.classList.add('winner');
      player1Button.classList.add('loser');
      playerInfo.textContent = "Player 2 wins!";
      boardCells.forEach((boardCell) => {
        if (boardCell.textContent == "O") {
          boardCell.classList.add("winner");
          console.log("match");
        }
        if (boardCell.textContent == "X") {
          boardCell.classList.add("loser");
        }
      })
    }
  }

  return {
    determineWinner, gameIsOver
  }
})();

displayGameBoardModule.displayGameBoard();
