import { createShip } from "./ship";

let ship = createShip()
beforeEach(() => {
  ship = createShip(1);
});

test('ship.hit()', () => {
  expect(ship.numHits).toBe(0);
  ship.hit();
  expect(ship.numHits).toBe(1);
});

test('ship.isSunk()', () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
})