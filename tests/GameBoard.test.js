import gameBoard from '../src/GameBoard';

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
      expect(() => newBoard.placeShip([1, 2], 'vertical', 4)).toThrow(
        'Ship already exists there'
      );
    });
  });
});

describe('Attack Received', () => {
  test('Is attack on the board', () => {
    expect(() => newBoard.receiveAttack([10, 0])).toThrow(
      'Attack not on the board'
    );
  });

  test('Attack misses ship', () => {
    expect(newBoard.receiveAttack([1, 2])).toEqual([1, 2]);
  });

  test('Attack hits ship', () => {
    newBoard.placeShip([0, 2], 'vertical', 3);
    expect(newBoard.receiveAttack([1, 2])).toEqual({ length: 3, hits: 1 });
  });

  test('Attack hits ship twice', () => {
    newBoard.placeShip([0, 2], 'vertical', 3);
    newBoard.receiveAttack([0, 2]);
    expect(newBoard.receiveAttack([1, 2])).toEqual({ length: 3, hits: 2 });
  });
});
