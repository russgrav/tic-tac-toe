const boardContainer = document.querySelector('.board-container');
const playerButtons = document.querySelectorAll('.player');
const player1Button = document.querySelector('.player1');
const player2Button = document.querySelector('.player2');
const playerInfo = document.querySelector('.player-info');
const body = document.querySelector('body');
const footer = document.querySelector('.footer');

const gameBoardModule = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  return {gameBoard};
})();

const playerFactory = () => {
  let playerMoves = [];
  return { playerMoves };
};

const displayGameBoardModule = (() => {
  let count = 0;
  let clickCounter = 0;
  
  function displayGameBoard() {
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
            player1.playerMoves.push(parseInt(boardCell.id));
            console.log(`boardCell ID: ${boardCell.id}`);
            console.log(`player1 moves: ${player1.playerMoves}`);
          } else {
            boardCell.textContent = "O";
            player1Button.classList.add('clicked');
            player2Button.classList.remove('clicked');
            player2.playerMoves.push(parseInt(boardCell.id));
            console.log(`boardCell ID: ${boardCell.id}`);
            console.log(`player2 moves: ${player2.playerMoves}`);
          }
          clickCounter++;
          console.log(`count: ${count}`);
          console.log(`clickCounter: ${clickCounter}`);
          game.determineWinner();
        }
      })
      boardContainer.appendChild(boardCell); 
      count++;
    }
  }
  return { count, clickCounter, displayGameBoard };
})();

const game = (() => {

  const winningCombos = [
    [0, 3, 6], 
    [0, 1, 2], 
    [0, 5, 9], 
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 4, 5], 
    [6, 7, 8], 
    [2, 4, 6],
    [0, 4, 8]
  ];

  let gameIsOver = false;

  function determineWinner() {

    for (const winningCombo of winningCombos) {
      if (winningCombo.every(v => player1.playerMoves.includes(v))) {
        console.log("Player 1 wins!");
        gameOver("player1");
        return;
      } else if (winningCombo.every(v => player2.playerMoves.includes(v))) {
        console.log("Player 2 wins!");
        gameOver("player2");
        return;
      } else if ((player1.playerMoves.length == 5 || player2.playerMoves.length == 5)) {
        console.log("It's a tie!");
        gameOver("tie");
        return;
      }
    }
  }

  function gameOver(result) {
    gameIsOver = true;

    player1Button.classList.remove('clicked');
    player2Button.classList.remove('clicked');

    const boardCells = document.querySelectorAll(".boardCell");

    switch (result) {
      case 'player1':
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
        break;
      case 'player2':
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
        break;
      case 'tie':
        player2Button.classList.add('tie');
        player1Button.classList.add('tie');
        playerInfo.textContent = "It's a tie!";
        boardCells.forEach((boardCell) => boardCell.classList.add("tie"));
        break;
    }

    const restartButton = document.createElement('button');
    restartButton.classList.add('tie');
    restartButton.classList.add('player');
    restartButton.textContent = "Play again?";
    restartButton.addEventListener("click", () => {
      player1.playerMoves = [];
      player2.playerMoves = [];
      playerInfo.textContent = "Current player:";
      switch (result) {
        case 'player1':
          player1Button.classList.remove('winner');
          player2Button.classList.remove('loser');
          player2Button.classList.add('clicked');
          boardCells.forEach((boardCell) => {
            if (boardCell.textContent == "X") {
              boardCell.classList.remove("winner");
            }
            if (boardCell.textContent == "O") {
              boardCell.classList.remove("loser");
            }
            boardCell.textContent = "";
          })
          break;
        case 'player2':
          player2Button.classList.remove('winner');
          player1Button.classList.remove('loser');
          player1Button.classList.add('clicked');
          boardCells.forEach((boardCell) => {
            if (boardCell.textContent == "O") {
              boardCell.classList.remove("winner");
            }
            if (boardCell.textContent == "X") {
              boardCell.classList.remove("loser");
            }
            boardCell.textContent = "";
          })
          break;
        case 'tie':
          player2Button.classList.remove('tie');
          player1Button.classList.remove('tie');
          boardCells.forEach((boardCell) => {
            boardCell.classList.remove("tie");
            boardCell.textContent = "";
          });
          break;  
      }
      restartButton.remove();
      displayGameBoardModule.count = 0;
      displayGameBoardModule.clickCounter = 0;
    })
    body.insertBefore(restartButton, footer);
  }

  return {
    determineWinner, gameIsOver
  }
})();

const player1 = playerFactory();
const player2 = playerFactory();
displayGameBoardModule.displayGameBoard();
