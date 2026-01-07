import GameBoard from './GameBoard.js';

export default class Player {
  constructor(name, type = 'real') {
    this.name = name;
    this.type = type;
    this.board = new GameBoard();
  }
}
