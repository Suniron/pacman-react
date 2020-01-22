import { getPathToDirectionFromCellId, cells } from "game/map/cells";
import { Direction } from "./types";

class Entite {
  name = "";
  hp = 0;
  /**
   * Cell where entite is located
   */
  cellId = 0;
  isHeroe: boolean;
  startingCellId = 0;
  constructor(name: string, cellId: number, isHeroe: boolean) {
    this.name = name;
    this.hp = isHeroe ? 3 : 1;
    this.isHeroe = isHeroe;
    this.startingCellId = cellId;
    this.cellId = cellId;
  }

  /**
   *
   * @param direction - where entite have to go
   */
  move(direction: Direction) {
    if (!this.isAlive) {
      console.log(`${this.name}: I can't move because i'm dead...`);
    }

    const target = getPathToDirectionFromCellId(this.cellId, direction);
    // If no way:
    if (!target) {
      //console.log(`${this.name}: I can't move at ${direction} from this cell.`);
      return;
    }
    // If way, move if it's possible:
    //console.log(`${this.name}: I'm going to the ${direction} from this cell.`);
    this.cellId = target;
  }

  loseOneHP() {
    if (this.hp <= 1) {
      this.kill();
      return;
    }

    this.hp -= 1;
    if (this.isHeroe) {
      this.teleport(this.startingCellId);
    }
    console.log(`${this.name}: I lose 1 HP :-S.`);
  }
  kill() {
    if (!this.isAlive) {
      return;
    }
    this.hp = 0;
    console.log(`${this.name}: I'm dead :-'(.`);
  }

  teleport(target: number) {
    if (cells[target].element !== 0) return;
    this.cellId = target;
  }

  get isAlive() {
    return this.hp > 0 ? true : false;
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
  // TODO: Get own width and height. Actually use cell's
  get width() {
    return cells[this.cellId].width;
  }
  get height() {
    return cells[this.cellId].height;
  }
}

export default Entite;
