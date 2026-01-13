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
      const col = colLetter.charCodeAt(0) - 65;
      const row = rowNumber - 1;
      return [row, col];
    };

    // 🔹 Create players
    const player1 = new Player(
      document.querySelector('#player-1-name').value.trim()
    );

    if (playerTypeToggle.checked) {
      playerTwoName = document.querySelector('#player-2-name').value.trim();
    }

    const player2 = new Player(playerTwoName, playerType);
    const controller = gameController(player1, player2);

    // 🔹 Player 1 placement
    const player1Dialog = document.querySelector('#ship-dialog');
    player1Dialog.showModal();

    placeShipsForPlayer(player1, player1Dialog, parseCoordinate, () => {
      // 🔹 After Player 1 finishes placing ships
      if (player2.type === 'real') {
        const player2Dialog = createPlayer2ShipDialog();
        document.body.appendChild(player2Dialog);
        player2Dialog.showModal();

        placeShipsForPlayer(player2, player2Dialog, parseCoordinate, () => {
          startGame(player1, player2, controller);
        });
      } else {
        autoPlaceShips(player2);
        startGame(player1, player2, controller);
      }
    });
  };

  const placeShipsForPlayer = (player, dialog, parseCoordinate, onComplete) => {
    const shipsToPlace = [
      { name: 'Carrier', length: 5 },
      { name: 'Battleship', length: 4 },
      { name: 'Cruiser', length: 3 },
      { name: 'Submarine', length: 3 },
      { name: 'Destroyer', length: 2 },
    ];

    let currentShipIndex = 0;

    const updateDialog = () => {
      const ship = shipsToPlace[currentShipIndex];
      dialog.querySelector('h2').textContent =
        `Place your ${ship.name} (${ship.length})`;
    };

    updateDialog();

    const confirmBtn = dialog.querySelector('button[value="default"]');
    const errorMsg = dialog.querySelector('p');

    document
      .getElementById('close-dialog-btn')
      .addEventListener('click', () => {
        window.location.reload();
      });

    confirmBtn.onclick = (e) => {
      e.preventDefault();

      const col = dialog.querySelector('select[id^="column"]').value;
      const row = Number(dialog.querySelector('input[id^="row"]').value);
      const alignment = dialog.querySelector('select[id^="orientation"]').value;

      const start = parseCoordinate(col + row);

      try {
        player.board.placeShip(
          start,
          alignment,
          shipsToPlace[currentShipIndex].length
        );
      } catch (err) {
        errorMsg.hidden = false;
        errorMsg.textContent = err.message;
        return;
      }

      errorMsg.hidden = true;
      currentShipIndex++;

      if (currentShipIndex >= shipsToPlace.length) {
        dialog.close();
        dialog.remove();
        onComplete();
        return;
      }

      updateDialog();
    };
  };

  const autoPlaceShips = (player) => {
    const ships = [
      { length: 5 },
      { length: 4 },
      { length: 3 },
      { length: 3 },
      { length: 2 },
    ];

    ships.forEach(({ length }) => {
      while (true) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        try {
          player.board.placeShip([row, col], orientation, length);
          break;
        } catch {
          continue;
        }
      }
    });
  };

  const createPlayer2ShipDialog = () => {
    const dialog = document.createElement('dialog');
    dialog.id = 'ship-dialog-player2';

    const form = document.createElement('form');
    form.method = 'dialog';
    form.id = 'ship-form-player2';

    // Title
    const title = document.createElement('h2');
    title.id = 'dialog-title-player2';
    title.textContent = 'Place Your Carrier (5)';

    // Orientation
    const orientationLabel = document.createElement('label');
    orientationLabel.textContent = 'Orientation';

    const orientationSelect = document.createElement('select');
    orientationSelect.id = 'orientation-player2';

    ['horizontal', 'vertical'].forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value[0].toUpperCase() + value.slice(1);
      orientationSelect.appendChild(option);
    });

    orientationLabel.appendChild(orientationSelect);

    // Fieldset
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = 'Starting Position';

    // Column
    const columnLabel = document.createElement('label');
    columnLabel.textContent = 'Column';

    const columnSelect = document.createElement('select');
    columnSelect.id = 'column-player2';

    'ABCDEFGHIJ'.split('').forEach((letter) => {
      const option = document.createElement('option');
      option.textContent = letter;
      columnSelect.appendChild(option);
    });

    columnLabel.appendChild(columnSelect);

    // Row
    const rowLabel = document.createElement('label');
    rowLabel.textContent = 'Row';

    const rowInput = document.createElement('input');
    rowInput.id = 'row-player2';
    rowInput.type = 'number';
    rowInput.min = 1;
    rowInput.max = 10;
    rowInput.required = true;

    rowLabel.appendChild(rowInput);

    fieldset.append(legend, columnLabel, rowLabel);

    // Error message
    const errorMsg = document.createElement('p');
    errorMsg.id = 'placement-error-player2';
    errorMsg.hidden = true;

    // Menu / buttons
    const menu = document.createElement('menu');

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.id = 'close-dialog-btn';
    cancelBtn.textContent = 'Cancel';

    const confirmBtn = document.createElement('button');
    confirmBtn.id = 'confirm-placement-player2';
    confirmBtn.value = 'default';
    confirmBtn.textContent = 'Place Ship';

    menu.append(cancelBtn, confirmBtn);

    // Assemble form
    form.append(title, orientationLabel, fieldset, errorMsg, menu);

    dialog.appendChild(form);

    document.body.appendChild(dialog);

    return dialog;
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
