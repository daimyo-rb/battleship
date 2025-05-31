export function createScreenController(gameDriver) {
  let leftGameboard, rightGameboard;
  let newGameButton;
  let infoBox;
  return {
    gameDriver,
    initializeStateVariables(){
      leftGameboard = document.getElementById('leftGameboard');
      rightGameboard = document.getElementById('rightGameboard');
      newGameButton = document.getElementById('newGameButton');
      infoBox = document.getElementById('gameUpdate');
    },
    initializeScreen() {
      // create empty html skeleton
      const content = `
        <div class="gameContainer">
          <div class="topBarWrapper">
            <div class="topBar">
              <p class="gameTitle">Battleship</p>
              <button class="newGameButton" id="newGameButton">Start New Game</button>
            </div>
          </div>
          <div class="bothGameboardsWrapper">
            <div class="bothGameboards">
              <div class="gameboardWrapper">
                <div class="gameboard" id="leftGameboard"></div>
              </div>
              <div class="gameboardWrapper">
                <div class="gameboard" id="rightGameboard"></div>
              </div>
            </div>
          </div>
          <div class="bottomBarWrapper">
            <div class="bottomBar">
              <p class="gameUpdate" id="gameUpdate">Info about the game</p>
            </div>
          </div>
        </div>
      `;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = content; 
      const element = wrapper.firstElementChild;
      document.body.appendChild(element);
    },
    initializeEventListeners() {
      newGameButton.addEventListener('click', (event) => {
        this.gameDriver.newGameUI();
        this.renderAllGameboards();
        this.updateInfoBox("Player 1: It's your move")
      });
      rightGameboard.addEventListener('click', (event) => {
        if (!event.target.id.includes('_')) return;
        if (!this.gameDriver.activeGame) return;
        let targetCoordStr = event.target.id.split('_')[1];
        let msg = this.gameDriver.handlePlayerMove(targetCoordStr);
        this.renderAllGameboards();
        this.updateInfoBox(msg);
      });
    },
    initialize() {
      this.initializeScreen();
      this.initializeStateVariables();
      this.initializeEventListeners();
    },
    updateInfoBox(msg) {
      infoBox.innerText = msg;
    },
    determineCellClass(player, coordStr) { // each cell is combination of (boat,water) (hit,not hit)
      let isPlayer1 = (player === this.gameDriver.player1) ? true : false;
      let isShipHere = player.gameboard.isShipHere(coordStr);
      let isHit = player.gameboard.isCellHit(coordStr);
      let cellType;
      if (isShipHere) { // ship tile
        cellType = isHit ? 'hitShip' : 'notHitShip';
      } else { // water tile
        cellType = isHit ? 'hitWater' : 'notHitWater';
      }
      if (!isPlayer1 && cellType == 'notHitShip') {
        cellType = 'notHitWater'; // don't show player enemy boat
      }
      return cellType;
    },
    renderGameboard(player){
      let idPrefix = (player === this.gameDriver.player1) ? 'left' : 'right';
      const container = document.getElementById(`${idPrefix}Gameboard`);    
      container.innerHTML = '';
      for (let y = 9; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
          const coordStr = `${x},${y}`;
          let cellType = this.determineCellClass(player, coordStr);
          const cell = document.createElement('div');
          cell.classList.add('grid-cell');
          cell.classList.add(cellType);
          cell.id = `${idPrefix}_${coordStr}`;
          container.appendChild(cell)
        }
      }
    },
    renderRightGameboard() {
      this.renderGameboard(this.gameDriver.player2);
    },
    renderLeftGameboard(){
      this.renderGameboard(this.gameDriver.player1);
    },
    renderAllGameboards(){
      this.renderLeftGameboard();
      this.renderRightGameboard();
    },

  }
}