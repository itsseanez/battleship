import Player from './Player.js';
const battleship = (() => {
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
    console.log(player1, player2);
  };

  const playButton = document.querySelector('#play');
  playButton.addEventListener('click', startGame);
})();
