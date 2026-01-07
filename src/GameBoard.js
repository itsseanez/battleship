import Ship from './Ship.js';

export default class GameBoard {
  #shipsSunk = [];
  isGameOver = false;

  constructor() {
    this.board = this.#createBoard();
  }

  #createBoard = () => {
    let board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = null;
      }
    }
    return board;
  };

  placeShip = (start, alignment, shipLength) => {
    const [row, col] = start;
    const newShip = new Ship(shipLength);

    if (row < 0 || row > 9 || col < 0 || col > 9)
      throw new Error('Placement is out of bounds');

    const placedShip = [];

    // VALIDATION PHASE
    for (let i = 0; i < shipLength; i++) {
      let r = row;
      let c = col;

      if (alignment === 'vertical') {
        r += i;
        if (r > 9) throw new Error('Ship is out of bounds');
      } else {
        c += i;
        if (c > 9) throw new Error('Ship is out of bounds');
      }

      if (this.board[r][c] !== null)
        throw new Error('Ship already exists there');

      placedShip.push([r, c]);
    }

    // MUTATION PHASE
    for (const [r, c] of placedShip) {
      this.board[r][c] = newShip;
    }

    return placedShip;
  };

  receiveAttack = (coordinates) => {
    const [row, col] = coordinates;
    if (row > 9 || col > 9 || row < 0 || col < 0)
      throw new Error('Attack not on the board');
    if (this.board[row][col] === null) {
      this.board[row][col] = 'x';
      return coordinates;
    } else {
      const ship = this.board[row][col];
      ship.hit();
      if (ship.isSunk()) this.#shipsSunk.push(ship);
      if (this.#shipsSunk.length === 5) this.isGameOver = true;
      return ship;
    }
  };
}
