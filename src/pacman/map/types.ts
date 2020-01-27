import { Enemy } from "pacman/entities/enemy";
export type Board = Array<Array<number>>;

export interface Level {
  board: Board;
  enemies: Array<Enemy>;
}
