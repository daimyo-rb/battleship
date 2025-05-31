import { createPlayer } from "./player";

export function createGameDriver() {
  return {
    player1: createPlayer('player1'),
    player2: createPlayer('player2'),
    isPlayer1Turn: true,
    activeGame: false,
    consoleLogGameBoards() {
      //       | hit | not hit |
      // ship  |  !  |    o    |
      // water |  x  |    -    |
      let player1Name = 'player1';
      let player2Name = 'player2';
      let sideLength = this.player1.gameboard.sideLength;
      let xLabelStr = '';
      for (let i = 0; i < sideLength; i++) {
        xLabelStr += ` ${i}`;
      }
      for (const [name, player] of [[player1Name, this.player1], [player2Name, this.player2]]) {
        let curGameboard = player.gameboard;
        console.log(`${name} gameboard below`);
        console.log(xLabelStr);
        for (let y=sideLength-1; y >= 0; y--){
          let curOutputStr = '';
          for (let x=0; x<sideLength; x++){
            let curChar
            let curStr = `${x},${y}`;
            let isShipHere = curGameboard.isShipHere(curStr);
            let isHit = curGameboard.isCellHit(curStr);
            if (isShipHere) { // ship tile
              curChar = isHit ? '!' : 'o';
            } else { // water tile
              curChar = isHit ? 'x' : '-';
            }
            curOutputStr += `|${curChar}`;
          }
          curOutputStr += `| ${y}`;
          console.log(curOutputStr);
        }
        console.log(xLabelStr);
      }
    },
    autoPositionBoatsForPlayer(player, boatCoords) {
      for (const coordList of boatCoords) {
        player.gameboard.placeShip(coordList);
      }
    },
    autoPositionBoats() {
      // 5 boats of lengths: 5, 4, 3, 3, 2
      let boatCoords1 = [
        ['2,1','2,2','2,3','2,4','2,5'],
        ['5,7','6,7','7,7','8,7'],
        ['0,9','1,9','2,9'],
        ['4,3','4,4','4,5'],
        ['6,1','6,2'],
      ];
      let boatCoords2 = [
        ['0,5','1,5','2,5','3,5','4,5'],
        ['4,0','5,0','6,0','7,0'],
        ['0,0','0,1','0,2'],
        ['9,6','9,7','9,8'],
        ['7,4','7,5'],
      ];
      this.autoPositionBoatsForPlayer(this.player1, boatCoords1);
      this.autoPositionBoatsForPlayer(this.player2, boatCoords2);
      console.log('boats in place');
    },
    clearGameboards() {
      this.player1 = createPlayer('player1');
      this.player2 = createPlayer('player2');
    },
    computerAttackPlayer() {
      let valid = false;
      let coordStr;
      while (!valid) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        coordStr = `${x},${y}`;
        valid = this.player1.gameboard.receiveAttack(coordStr);
      }
      console.log(`player2 hit ${coordStr}`);
      return 
    },
    handleGameOverUI(){
      this.activeGame = false;
      let msg = this.player1.gameboard.allShipsSunk() ? 'Player 2 wins!' : 'Player 1 wins!';      
      console.log(msg);
      return msg;
    },
    handlePlayerMove(coordStr) {
      let successfulHit = this.player2.gameboard.receiveAttack(coordStr);
      let msg;
      if (!successfulHit) {
        msg = `You already hit ${coordStr}. Click a different square`;
        console.log(msg);
        return msg;
      } else {
        if (this.isGameOver()) {
          return this.handleGameOverUI();
        }
        this.computerAttackPlayer();
      }
      if (this.isGameOver()) {
        this.handleGameOverUI();
      }
      msg = "Player 1, It's your move";
      return msg;

    },
    getActivePlayerMoveFromPrompt() {
      let activePlayer, targetPlayer;
      [activePlayer, targetPlayer] = this.isPlayer1Turn ? [this.player1, this.player2] : [this.player2, this.player1];
      let valid = false;
      while (!valid) { 
        let move = prompt(`${activePlayer.name}, your move\nEnter coordinate in form x,y (ex. 1,1) (no spaces)`);
        valid = targetPlayer.gameboard.receiveAttack(move);
      }
    },
    getActivePlayerMoveConsoleVersion() {
      this.getActivePlayerMoveFromPrompt();
    },
    isGameOver() {
      return this.player1.gameboard.allShipsSunk() || this.player2.gameboard.allShipsSunk();
    },
    handleGameOver() {
      let finalMessage = this.player1.gameboard.allShipsSunk() ? 'player2 wins!' : 'player1 wins!';      
      alert(finalMessage);
      this.activeGame = false;
    },
    newGameUI() {
      this.activeGame = true;
      this.clearGameboards();
      this.autoPositionBoats(); // add ships
    },
    newGameConsole() {
      this.clearGameboards();
      this.autoPositionBoats(); // add ships
      this.consoleLogGameBoards();
      while (!this.isGameOver()) {
        this.getActivePlayerMoveConsoleVersion();
        this.consoleLogGameBoards();
        this.isPlayer1Turn = !this.isPlayer1Turn; // toggle activePlayer
      }
      this.handleGameOver() // output game end message
    },
  }
}