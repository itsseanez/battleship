import Player from './Player.js';
const battleship = (() => {
  //Select Opponent
  const playerTypeToggle = document.querySelector('#cb2-7');
  let playerType = 'computer';
  let playerTwoName = 'Computer';
  let controller;
  let gameOver = false;
  playerTypeToggle.addEventListener('change', () => {
    const playerDiv = document.querySelector('#player-2');
    if (playerTypeToggle.checked) {
      playerType = 'real';
      let playerLabel = document.createElement('p');
      playerLabel.textContent = 'Player 2:';
      let playerInput = document.createElement('input');
      playerInput.type = 'text';
      playerInput.classList.add('player-text');
      playerInput.id = 'player-2-name';
      playerDiv.append(playerLabel, playerInput);
    } else {
      playerType = 'computer';
      playerDiv.innerHTML = '';
    }
  });

  const startGame = () => {
    const player1 = new Player(
      document.querySelector('#player-1-name').value.trim()
    );

    if (playerTypeToggle.checked) {
      playerTwoName = document.querySelector('#player-2-name').value.trim();
    }

    const player2 = new Player(playerTwoName, playerType);
    controller = gameController(player1, player2);

    const main = document.querySelector('main');
    main.innerHTML = '';

    const gameDiv = document.createElement('div');
    gameDiv.id = 'game';
    main.append(gameDiv);

    // Player 1 test placement
    player1.board.placeShip([0, 0], 'horizontal', 5); // Carrier
    player1.board.placeShip([2, 1], 'vertical', 4); // Battleship
    player1.board.placeShip([5, 3], 'horizontal', 3); // Cruiser
    player1.board.placeShip([7, 0], 'horizontal', 3); // Submarine
    player1.board.placeShip([9, 5], 'horizontal', 2); // Destroyer

    // Player 2 test placement
    player2.board.placeShip([0, 5], 'horizontal', 5); // Carrier
    player2.board.placeShip([1, 8], 'vertical', 4); // Battleship
    player2.board.placeShip([4, 2], 'vertical', 3); // Cruiser
    player2.board.placeShip([6, 6], 'horizontal', 3); // Submarine
    player2.board.placeShip([8, 1], 'horizontal', 2); // Destroyer

    renderBoard(player1, player1, player2, controller, gameDiv);
    renderBoard(player2, player1, player2, controller, gameDiv);
    const playerTurn = document.createElement('p');
    playerTurn.textContent = `${controller.switchPlayer().name}'s turn`;
    playerTurn.id = 'player-turn';
    main.append(playerTurn);
  };

  const renderBoard = (player, mainPlayer, opponent, controller, gameDiv) => {
    const main = document.querySelector('main');
    const columnLabels = 'ABCDEFGHIJ'.split('');

    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player-div');

    const board = document.createElement('div');
    board.classList.add('player-board');

    // Label row
    const labelRow = document.createElement('div');
    labelRow.classList.add('row', 'label-row');

    const corner = document.createElement('div');
    corner.classList.add('label', 'corner');
    labelRow.appendChild(corner);

    columnLabels.forEach((label) => {
      const cell = document.createElement('div');
      cell.classList.add('label');
      cell.textContent = label;
      labelRow.appendChild(cell);
    });

    board.appendChild(labelRow);

    // Board rows
    player.board.board.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      const rowLabel = document.createElement('div');
      rowLabel.classList.add('label');
      rowLabel.textContent = rowIndex + 1;
      rowDiv.appendChild(rowLabel);
      row.forEach((element, colIndex) => {
        const cell = document.createElement('div');
        if (
          element !== null &&
          typeof element === 'object' &&
          opponent.type !== 'real' &&
          player.type !== 'computer'
        )
          cell.classList.add('ship');
        cell.classList.add('column');
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;
        cell.dataset.player = player.name;

        cell.addEventListener('click', () => {
          if (cell.classList.contains('hit') || cell.classList.contains('miss'))
            return;
          if (gameOver) return;
          if (controller.getCurrentPlayer().name === player.name) return;
          const result = player.board.receiveAttack([
            Number(cell.dataset.row),
            Number(cell.dataset.col),
          ]);

          if (Array.isArray(result)) {
            // MISS
            cell.classList.add('miss');

            controller.switchPlayer();

            //Computer logic
            if (controller.getCurrentPlayer().type === 'computer') {
              let playerBoard = document.querySelector('.player-board');

              while (true) {
                let computerChoice = [
                  Math.floor(Math.random() * 10),
                  Math.floor(Math.random() * 10),
                ];

                const cell = playerBoard.querySelector(
                  `.column[data-row="${computerChoice[0]}"][data-col="${computerChoice[1]}"]`
                );

                // Original board check
                if (
                  mainPlayer.board.board[computerChoice[0]][
                    computerChoice[1]
                  ] === null ||
                  typeof mainPlayer.board.board[computerChoice[0]][
                    computerChoice[1]
                  ] === 'object'
                ) {
                  // Additional class-based check
                  if (!cell.classList.contains('hit')) {
                    const result =
                      mainPlayer.board.receiveAttack(computerChoice);

                    if (Array.isArray(result)) {
                      // MISS
                      cell.classList.add('miss');
                      controller.switchPlayer();
                      const playerTurn = document.querySelector('#player-turn');
                      playerTurn.textContent = `${controller.getCurrentPlayer().name}'s turn`;
                      return;
                    } else {
                      // HIT
                      cell.classList.add('hit');
                      cell.classList.remove('ship');

                      if (mainPlayer.board.isGameOver) {
                        gameOver = true;
                        const playerTurn =
                          document.querySelector('#player-turn');
                        playerTurn.textContent = `${controller.getCurrentPlayer().name} won`;
                        return;
                      }
                    }
                  }
                }
              }
            } else {
              const playerTurn = document.querySelector('#player-turn');
              playerTurn.textContent = `${controller.getCurrentPlayer().name}'s turn`;
            }
          } else {
            // HIT
            cell.classList.add('hit');
            cell.classList.remove('ship');

            if (player.board.isGameOver) {
              gameOver = true;
              const playerTurn = document.querySelector('#player-turn');
              playerTurn.textContent = `${controller.getCurrentPlayer().name} won`;
              return;
            }
          }
        });

        rowDiv.appendChild(cell);
      });

      board.appendChild(rowDiv);
    });

    const identifier = document.createElement('p');
    identifier.textContent = `${player.name}'s board`;

    playerDiv.append(board, identifier);
    gameDiv.append(playerDiv);
  };

  //Start game
  const playButton = document.querySelector('#play');
  playButton.addEventListener('click', startGame);

  const gameController = (player1, player2) => {
    let currentPlayer = player2;

    const switchPlayer = () => {
      return (currentPlayer = currentPlayer === player1 ? player2 : player1);
    };
    const getCurrentPlayer = () => currentPlayer;

    return { switchPlayer, getCurrentPlayer };
  };
})();
