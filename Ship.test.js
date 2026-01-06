import ship from './Ship';

test('Ship hit', () => {
  let myShip = new ship(4);
  expect(myShip.hits).toBe(0);
  myShip.hit();
  myShip.hit();
  expect(myShip.hits).toBe(2);
});

test('is Sunk', () => {
  let myShip = new ship(1);
  myShip.hit();
  expect(myShip.isSunk()).toBeTruthy();
});

test('New ship object', () => {
  let myShip = new ship(5);
  expect(myShip).toEqual({ length: 5, hits: 0 });
});
