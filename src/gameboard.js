import { createShip } from "./ship";

export function createGameboard() {
  return {
    sideLength: 10,
    cellsHit: new Set(),  
    cellShipMap: new Map(), // coordStr: Ship obj
    shipList: [],
    getShipAtCell(coordStr) {
      return this.cellShipMap.has(coordStr) ? this.cellShipMap.get(coordStr) : null;
    },
    isShipHere(coordStr){
      return this.getShipAtCell(coordStr) ? true : false;
    },
    isCellHit(coordStr) {
      return this.cellsHit.has(coordStr);
    },
    isCellInBounds(coordStr) {
      const [row, col] = coordStr.split(',').map(Number);
      return row >= 0 && row < this.sideLength
        && col >= 0 && col < this.sideLength;
    },
    isCellValidForNewShip(coordStr) {
      if (!this.isCellInBounds(coordStr)) {
        console.log(`coordStr not in bounds: ${coordStr}`)
        return false;
      }
      if (this.cellShipMap.has(coordStr)) {
        console.log(`coordStr in use by: ${this.cellShipMap.get(coordStr)}`);
        return false
      }
      if (this.cellsHit.has(coordStr)) {
        console.log(`this space has been hit. are you adding ships late? ${coordStr}`);
        return false
      }
      return true;
    },
    placeShip(coordList) {
      // check if valid location
      coordList.forEach(coordStr => {
        if (!this.isCellValidForNewShip(coordStr)) {
          throw new Error(`can't use coord: ${coordStr}`);
        }
      });
      // TODO: check if coordList is contiguous and in ordre
      let newShip = createShip(coordList.length); // create ship
      coordList.forEach(coordStr => { // update cellShipMap
        this.cellShipMap.set(coordStr, newShip);
      });
      this.shipList.push(newShip); // add ship to shipList
    },
    receiveAttack(coordStr) {
      if (!this.isCellInBounds(coordStr)) {
        console.log(`cell out of bounds ${coordStr}`);
        return false;
      }
      if (this.isCellHit(coordStr)) {
        console.log('cell already hit');
        return false;
      }
      this.cellsHit.add(coordStr);
      let shipAtCell = this.getShipAtCell(coordStr);
      if (shipAtCell) {
        shipAtCell.hit();
        console.log(`hit! ${coordStr}`);
      } else {
        console.log(`miss: ${coordStr}`);
      }
      return true;
    },
    allShipsSunk() {
      for (const ship of this.shipList) {
        if (!ship.isSunk()) {
          return false;
        }
      }
      return true;
    }
  } 
}