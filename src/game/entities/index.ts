import { HEROE, ENNEMIES } from "game/settings";
import { Heroe } from "./heroe";
import { Enemy } from "./enemy";

export const heroe = new Heroe("Pacman", HEROE.STARTING_CELL);

export const ennemies = ENNEMIES.map(enemy => {
  return new Enemy(enemy.NAME, enemy.STARTING_CELL);
});
