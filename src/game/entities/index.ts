import { cells } from "game/map/cells";
import { HEROE_START_CELL } from "game/settings";

export type Direction = "LEFT" | "RIGHT" | "UP" | "DOWN";

// Todo: create class who are extension of Entite for Monster and Heroe
export class Entite {
  name = "";
  life = -1;
  /**
   * Cell where entite is located
   */
  cellId = -1;
  isHeroe: boolean;
  constructor(name: string, isHeroe: boolean, cellId: number) {
    this.name = name;
    this.life = isHeroe ? 3 : 1;
    this.isHeroe = isHeroe;
    this.cellId = cellId;
  }

  /**
   *
   * @param direction - where entite have to go
   */
  move(direction: Direction) {
    console.log(
      `${this.name}:I'm going to the ${direction} from ${this.cellId}!`
      // getNextCellFromCell
      // checkPossibility
      // move if it's possible
    );
  }
  get color() {
    return this.isHeroe ? "blue" : "red";
  }
  get x() {
    return cells[this.cellId].x;
  }
  get y() {
    return cells[this.cellId].y;
  }
  get width() {
    return cells[this.cellId].width;
  }
  get height() {
    return cells[this.cellId].height;
  }
}

export const heroe = new Entite("Pacman", true, HEROE_START_CELL);
