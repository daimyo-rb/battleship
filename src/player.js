import { createGameboard } from "./gameboard";

export function createPlayer(name) {
	return {
		gameboard: createGameboard(),
		name,
	}
}