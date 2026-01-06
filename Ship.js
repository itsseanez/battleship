export default class Ship {
  constructor(length) {
    this.length = Number(length);
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
