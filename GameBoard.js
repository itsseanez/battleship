import ship from './Ship.js';

export default class GameBoard {
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

  placeShip = (start, alignment, length, id) => {
    if (start[0] > 9 || start[0] < 0 || start[1] > 9 || start[1] < 0)
      throw new Error('Placement is out of bounds');
    let placedShip = [];
    this.board[start[0]][start[1]] = id;

    if (alignment === 'vertical') {
      for (let i = 0; i < length; i++) {
        if (start[0] + i > 9) throw new Error('Ship is out of bounds');
        if (this.board[start[0] + i][start[1]] === null)
          this.board[start[0] + i][start[1]] = id;
        /*else {
          throw new Error('Ship already exists there');
        }*/
        placedShip.push([start[0] + i, start[1]]);
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (start[1] + i > 9) throw new Error('Ship is out of bounds');
        if (this.board[start[0]][start[1] + i] === null)
          this.board[start[0]][start[1] + i] = id;
        /* else {
          throw new Error('Ship already exists there');
        }*/
        placedShip.push([start[0], start[1] + i]);
      }
    }
    return placedShip;
  };
}
