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

  const startGame = (player1, player2, controller) => {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const gameDiv = document.createElement('div');
    gameDiv.id = 'game';
    main.append(gameDiv);

    renderBoard(player1, player1, player2, controller, gameDiv);
    renderBoard(player2, player1, player2, controller, gameDiv);
    const playerTurn = document.createElement('p');
    playerTurn.textContent = `${controller.switchPlayer().name}'s turn`;
    playerTurn.id = 'player-turn';
    main.append(playerTurn);
  };

  const placeShips = () => {
    const parseCoordinate = (input) => {
      const colLetter = input[0].toUpperCase();
      const rowNumber = Number(input.slice(1));

      const col = colLetter.charCodeAt(0) - 65; // A → 0
      const row = rowNumber - 1; // 1 → 0

      return [row, col];
    };

    const player1 = new Player(
      document.querySelector('#player-1-name').value.trim()
    );

    if (playerTypeToggle.checked) {
      playerTwoName = document.querySelector('#player-2-name').value.trim();
    }

    const player2 = new Player(playerTwoName, playerType);
    controller = gameController(player1, player2);

    const player1ShipDialog = document.querySelector('dialog');
    player1ShipDialog.showModal();

    document
      .getElementById('close-dialog-btn')
      .addEventListener('click', () => {
        player1ShipDialog.close();
      });

    const shipsToPlace = [
      { name: 'Carrier', length: 5 },
      { name: 'Battleship', length: 4 },
      { name: 'Cruiser', length: 3 },
      { name: 'Submarine', length: 3 },
      { name: 'Destroyer', length: 2 },
    ];

    let currentShipIndex = 0;

    const updateDialogForCurrentShip = () => {
      const currentShip = shipsToPlace[currentShipIndex];
      const dialogTitle = document.querySelector('#dialog-title');
      dialogTitle.textContent = `Place your ${currentShip.name} (${currentShip.length})`;
    };

    const placeShip = document.querySelector('#confirm-placement');
    placeShip.addEventListener('click', (e) => {
      e.preventDefault();
      const currentShip = shipsToPlace[currentShipIndex];

      const col = document.querySelector('#column').value;
      const row = Number(document.querySelector('#row').value);
      const alignment = document.querySelector('#orientation').value;

      const start = parseCoordinate([col, row]);
      console.log(start, alignment, currentShip.length);
      try {
        player1.board.placeShip(start, alignment, currentShip.length);
      } catch (e) {
        const errorCode = document.querySelector('#placement-error');
        errorCode.hidden = false;
        errorCode.textContent = e.message;
        return;
      }

      currentShipIndex++;

      if (shipsToPlace.length <= currentShipIndex) {
        player1ShipDialog.close();
        startGame(player1, player2, controller);
      } else {
        updateDialogForCurrentShip();
      }
    });
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
  playButton.addEventListener('click', placeShips);

  const gameController = (player1, player2) => {
    let currentPlayer = player2;

    const switchPlayer = () => {
      return (currentPlayer = currentPlayer === player1 ? player2 : player1);
    };
    const getCurrentPlayer = () => currentPlayer;

    return { switchPlayer, getCurrentPlayer };
  };
})();
