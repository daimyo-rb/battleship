import { createGameboard } from "./gameboard";

export function createPlayer() {
	return {
		gameboard: createGameboard(),
	}
}