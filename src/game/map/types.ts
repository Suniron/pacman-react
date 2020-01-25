import { Enemy } from "game/entities/enemy";
export type Board = Array<Array<number>>;

export interface Level {
  board: Board;
  enemies: Array<Enemy>;
}
