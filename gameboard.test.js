import { createGameboard } from "./gameboard";

test('gameboard isCellHit()', () => {
  let gameboard = createGameboard();
  expect(gameboard.isCellHit('0,0')).toBe(false);
});

test('gameboard placeShip()', () => {
  let gameboard = createGameboard();
  expect(gameboard.shipList.length).toBe(0);
  gameboard.placeShip(['0,0','0,1','0,2']);
  expect(gameboard.shipList.length).toBe(1);
});

test('gameboard receiveAttack hit', () => {
  let gameboard = createGameboard();
  gameboard.placeShip(['0,0','0,1','0,2']);
  let attackCoordStr = '0,0';
  let shipAtCoord = gameboard.getShipAtCell(attackCoordStr);
  console.log(`shipAtCoord returned: ${shipAtCoord}`);
  const hitSpy = jest.spyOn(shipAtCoord, 'hit');
  gameboard.receiveAttack(attackCoordStr);
  expect(hitSpy).toHaveBeenCalled();
});

test('gameboard receiveAttack miss', () => {
  let gameboard = createGameboard();
  let attackCoordStr = '0,0';
  expect(gameboard.cellsHit.has(attackCoordStr)).toBe(false);
  gameboard.receiveAttack(attackCoordStr);
  expect(gameboard.cellsHit.has(attackCoordStr)).toBe(true);
});

test('gameboard allShipsSunk true', () => {
  let gameboard = createGameboard();
  gameboard.placeShip(['0,0']);
  gameboard.receiveAttack('0,0');
  expect(gameboard.allShipsSunk()).toBe(true);
});

test('gameboard allShipsSunk false', () => {
  let gameboard = createGameboard();
  gameboard.placeShip(['0,0']);
  expect(gameboard.allShipsSunk()).toBe(false);
});