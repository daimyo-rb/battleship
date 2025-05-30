export function createShip(length) {
  return {
    length,
    numHits: 0,
    hit() {
      this.numHits += 1;
    },
    isSunk() {
      return this.numHits >= this.length;
    },
  }
}