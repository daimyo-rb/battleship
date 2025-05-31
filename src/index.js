import "./styles.css";
import { createGameDriver } from "./gameDriver";
import { createScreenController } from "./screenController";

let gameDriver = createGameDriver();

let screenController = createScreenController(gameDriver);
screenController.initialize();
screenController.renderAllGameboards();

window.gameDriver = gameDriver;
window.screenController = screenController;
