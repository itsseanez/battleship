import GameBoard from './GameBoard';

export default class Player {
  constructor(type = 'real') {
    this.type = type;
    this.board = new GameBoard();
  }
}
