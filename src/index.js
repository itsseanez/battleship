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
    if (playerTypeToggle.checked)
      playerTwoName = document.querySelector('#player-2-name').value.trim();
    const player2 = new Player(playerTwoName, playerType);

    const main = document.querySelector('main');
    main.innerHTML = '';

    const gameDiv = document.createElement('div');
    gameDiv.id = 'game';
    main.append(gameDiv);

    const player1Div = document.createElement('div');
    const player1Board = document.createElement('div');
    player1Board.classList.add('player-board');

    player1.board.board.forEach((row) => {
      let rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      player1Board.appendChild(rowDiv);

      row.forEach(() => {
        let element = document.createElement('div');
        element.classList.add('column');
        rowDiv.appendChild(element);
      });
    });
    const player1Identifier = document.createElement('p');
    player1Identifier.textContent = `${player1.name}'s board`;

    player1Div.append(player1Board);
    player1Div.append(player1Identifier);
    player1Div.classList.add('player-div');
    gameDiv.append(player1Div);

    const player2Div = document.createElement('div');
    const player2Board = document.createElement('div');
    player2Board.classList.add('player-board');
    player2.board.board.forEach((row) => {
      let rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      player2Board.appendChild(rowDiv);

      row.forEach(() => {
        let element = document.createElement('div');
        element.classList.add('column');
        rowDiv.appendChild(element);
      });
    });
    const player2Identifier = document.createElement('p');
    player2Identifier.textContent = `${player2.name}'s board`;

    player2Div.append(player2Board);
    player2Div.append(player2Identifier);
    player2Div.classList.add('player-div');
    gameDiv.append(player2Div);
  };

  const playButton = document.querySelector('#play');
  playButton.addEventListener('click', startGame);
})();
