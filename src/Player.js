import GameBoard from './GameBoard.js';

export default class Player {
  constructor(type = 'real') {
    this.type = type;
    this.board = new GameBoard();
  }
}
