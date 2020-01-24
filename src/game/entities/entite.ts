import { getPathToDirectionFromCellId, cells } from "game/map/cells";
import { Direction, Skins } from "./types";
import unknow_entitie from "assets/images/unknow_entitie.png";
class Entitie {
  name = "";
  hp = 0;
  /**
   * Cell where entitie is located
   */
  cellId = 0;
  isHeroe: boolean;
  startingCellId = 0;
  skins: Skins = { current: unknow_entitie, onMove: [], nextOnMoveIndex: 0 }; // TODO: store != skins of entitie
  animTimer?: NodeJS.Timeout;
  constructor(name: string, cellId: number, isHeroe: boolean) {
    this.name = name;
    this.hp = isHeroe ? 3 : 1;
    this.isHeroe = isHeroe;
    this.startingCellId = cellId;
    this.cellId = cellId;
  }

  /**
   *
   * @param direction - where entitie try to go
   */
  move(direction: Direction) {
    if (!this.isAlive) {
      console.log(`${this.name}: I can't move because i'm dead...`);
      return;
    }

    const target = getPathToDirectionFromCellId(this.cellId, direction);
    // If no way:
    if (!target) {
      //console.log(`${this.name}: I can't move at ${direction} from this cell.`);
      return;
    }
    // If way, move if it's possible:
    //console.log(`${this.name}: I'm going to the ${direction} from this cell.`);
    this.toggleAnim("ON");
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
    this.toggleAnim("OFF");
    this.teleport(this.startingCellId); // Useless normaly
    console.log(`${this.name}: I'm dead :-'(.`);
  }

  teleport(target: number) {
    if (cells[target].element !== 0) return;
    this.cellId = target;
  }

  toggleAnim(toggle: "ON" | "OFF") {
    // If animTimer is already set:
    if (this.animTimer) {
      if (toggle === "ON") {
        return;
      }
      // Remove anim timer if toggle is "OFF":
      clearInterval(this.animTimer);
      this.animTimer = undefined;
      return;
    }

    // If no setted animTimed:
    this.animTimer = setInterval(() => this.changeSkin(), 150);
  }

  changeSkin(this: Entitie) {
    // if no skins defined:
    if (this.skins.onMove.length === 0) {
      return;
    }
    // Set the skin at the skin index
    this.skins.current = this.skins.onMove[this.skins.nextOnMoveIndex];
    // Set the next skin index:
    this.skins.nextOnMoveIndex =
      this.skins.nextOnMoveIndex === this.skins.onMove.length - 1
        ? 0
        : this.skins.nextOnMoveIndex + 1;
  }

  // -- GETTERS --&
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

export default Entitie;
