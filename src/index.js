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

    renderBoard(player1, gameDiv);
    renderBoard(player2, gameDiv);
  };

  const renderBoard = (player, gameDiv) => {
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

      row.forEach((_, colIndex) => {
        const cell = document.createElement('div');
        cell.classList.add('column');
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;
        rowDiv.appendChild(cell);
      });

      board.appendChild(rowDiv);
    });

    const identifier = document.createElement('p');
    identifier.textContent = `${player.name}'s board`;

    playerDiv.append(board, identifier);
    gameDiv.append(playerDiv);
  };

  const playButton = document.querySelector('#play');
  playButton.addEventListener('click', startGame);
})();
