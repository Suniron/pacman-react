import { Enemy } from "pacman/entities/enemy";
import { Board } from "../map/types";
import { board1 } from "./boards";

export class Level {
  board: Board;
  //enemies: Array<Enemy>;
  enemies: Array<Enemy>;
  constructor(board: Board, enemies: Array<Enemy>) {
    this.board = board;
    this.enemies = enemies;
  }
}

export const initLevels = () => {
  const levels: Array<Level> = [];

  // LEVEL 1:
  levels.push(new Level(board1, [new Enemy("GhostOne", 112)]));

  return levels;
};
