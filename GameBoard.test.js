import gameBoard from './GameBoard';
import ship from './Ship.js';

describe('Ship Placement', () => {
  let newBoard;

  beforeEach(() => {
    newBoard = new gameBoard();
  });

  test('Place Ship Vertically', () => {
    expect(newBoard.placeShip([0, 0], 'vertical', new ship(3))).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  test('Place Ship Horizontally', () => {
    expect(newBoard.placeShip([0, 0], 'horizontal', new ship(3))).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  describe('Invalid Placement', () => {
    test('Placement out of bounds', () => {
      expect(() =>
        newBoard.placeShip([10, 0], 'vertical', new ship(3))
      ).toThrow('Placement is out of bounds');
    });

    test('Ship is out of bounds', () => {
      expect(() =>
        newBoard.placeShip([0, 8], 'horizontal', new ship(3))
      ).toThrow('Ship is out of bounds');
    });

    test('Ship already there', () => {
      newBoard.placeShip([0, 2], 'vertical', new ship(3));
      console.log(newBoard);
      expect(() => newBoard.placeShip([1, 2], 'vertical', new ship(4))).toThrow(
        'Ship already exists there'
      );
    });
  });
});
