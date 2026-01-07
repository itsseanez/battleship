import gameBoard from './GameBoard';

let newBoard;

beforeEach(() => {
  newBoard = new gameBoard();
});

describe('Ship Placement', () => {
  test('Place Ship Vertically', () => {
    expect(newBoard.placeShip([0, 0], 'vertical', 3)).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  test('Place Ship Horizontally', () => {
    expect(newBoard.placeShip([0, 0], 'horizontal', 3)).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  describe('Invalid Placement', () => {
    test('Placement out of bounds', () => {
      expect(() => newBoard.placeShip([10, 0], 'vertical', 3)).toThrow(
        'Placement is out of bounds'
      );
    });

    test('Ship is out of bounds', () => {
      expect(() => newBoard.placeShip([0, 8], 'horizontal', 3)).toThrow(
        'Ship is out of bounds'
      );
    });

    test('Ship already there', () => {
      newBoard.placeShip([0, 2], 'vertical', 3);
      console.log(newBoard);
      expect(() => newBoard.placeShip([1, 2], 'vertical', 4)).toThrow(
        'Ship already exists there'
      );
    });
  });
});
