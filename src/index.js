import Player from './Player.js';
const battleship = (() => {
  //Select Opponent
  const playerTypeToggle = document.querySelector('#cb2-7');
  let playerType = 'computer';
  let playerTwoName = 'Computer';
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

    const main = document.querySelector('main');
    main.innerHTML = '';

    const gameDiv = document.createElement('div');
    gameDiv.id = 'game';
    main.append(gameDiv);

    const columnLabels = 'ABCDEFGHIJ'.split('');

    /* ================= PLAYER 1 ================= */

    const player1Div = document.createElement('div');
    player1Div.classList.add('player-div');

    const player1Board = document.createElement('div');
    player1Board.classList.add('player-board');

    // Top label row
    const labelRow1 = document.createElement('div');
    labelRow1.classList.add('row', 'label-row');

    const corner1 = document.createElement('div');
    corner1.classList.add('label', 'corner');
    labelRow1.appendChild(corner1);

    columnLabels.forEach((label) => {
      const labelCell = document.createElement('div');
      labelCell.classList.add('label');
      labelCell.textContent = label;
      labelRow1.appendChild(labelCell);
    });

    player1Board.appendChild(labelRow1);

    // Board rows
    player1.board.board.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      const rowLabel = document.createElement('div');
      rowLabel.classList.add('label');
      rowLabel.textContent = rowIndex + 1;
      rowDiv.appendChild(rowLabel);

      row.forEach(() => {
        const cell = document.createElement('div');
        cell.classList.add('column');
        rowDiv.appendChild(cell);
      });

      player1Board.appendChild(rowDiv);
    });

    const player1Identifier = document.createElement('p');
    player1Identifier.textContent = `${player1.name}'s board`;

    player1Div.append(player1Board, player1Identifier);
    gameDiv.append(player1Div);

    /* ================= PLAYER 2 ================= */

    const player2Div = document.createElement('div');
    player2Div.classList.add('player-div');

    const player2Board = document.createElement('div');
    player2Board.classList.add('player-board');

    // Top label row
    const labelRow2 = document.createElement('div');
    labelRow2.classList.add('row', 'label-row');

    const corner2 = document.createElement('div');
    corner2.classList.add('label', 'corner');
    labelRow2.appendChild(corner2);

    columnLabels.forEach((label) => {
      const labelCell = document.createElement('div');
      labelCell.classList.add('label');
      labelCell.textContent = label;
      labelRow2.appendChild(labelCell);
    });

    player2Board.appendChild(labelRow2);

    // Board rows
    player2.board.board.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      const rowLabel = document.createElement('div');
      rowLabel.classList.add('label');
      rowLabel.textContent = rowIndex + 1;
      rowDiv.appendChild(rowLabel);

      row.forEach(() => {
        const cell = document.createElement('div');
        cell.classList.add('column');
        rowDiv.appendChild(cell);
      });

      player2Board.appendChild(rowDiv);
    });

    const player2Identifier = document.createElement('p');
    player2Identifier.textContent = `${player2.name}'s board`;

    player2Div.append(player2Board, player2Identifier);
    gameDiv.append(player2Div);
  };

  const playButton = document.querySelector('#play');
  playButton.addEventListener('click', startGame);
})();
