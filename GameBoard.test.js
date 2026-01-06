import gameBoard from './GameBoard';

//const newBoard = new gameBoard();

describe('Ship Placement', () => {
  test('Place Ship Vertically', () => {
    const newBoard = new gameBoard();
    expect(newBoard.placeShip([0, 0], 'vertical', 3, 'Carrier')).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  test('Place Ship Horizontally', () => {
    const newBoard = new gameBoard();
    expect(newBoard.placeShip([0, 0], 'horizontal', 3, 'Carrier')).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  describe('Invalid Placement', () => {
    test('Placement out of bounds', () => {
      const newBoard = new gameBoard();
      expect(() =>
        newBoard.placeShip([10, 0], 'vertical', 3, 'Carrier')
      ).toThrow('Placement is out of bounds');
    });

    test('Ship is out of bounds', () => {
      const newBoard = new gameBoard();
      expect(() =>
        newBoard.placeShip([0, 8], 'horizontal', 3, 'Carrier')
      ).toThrow('Ship is out of bounds');
    });

    test('Ship already there', () => {
      const newBoard = new gameBoard();
      newBoard.placeShip([0, 2], 'vertical', 3, 'Carrier');
      console.log(newBoard);
      expect(() =>
        newBoard.placeShip([1, 2], 'vertical', 4, 'Battleship')
      ).toThrow('Ship already exists there');
    });
  });
});
