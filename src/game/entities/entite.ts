import { getPathToDirectionFromCellId, Cell, cells } from "game/map/cells";
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
  movingDirection: Direction = "UP";
  skins: Skins = { current: unknow_entitie, nextAnimationIndex: 0 };
  animTimer?: NodeJS.Timeout;

  constructor(
    name: string,
    cells: Array<Cell>,
    cellId: number,
    isHeroe: boolean
  ) {
    this.name = name;
    this.hp = isHeroe ? 3 : 1;
    this.isHeroe = isHeroe;
    this.startingCellId = cellId;
    this.cellId = cellId;
  }

  /**
   *
   * @param direction - where entitie try to go
   * Todo: Find a way without cells
   */
  move(direction: Direction) {
    if (!this.isAlive) {
      console.log(`${this.name}: I can't move because i'm dead...`);
      return;
    }

    const target = getPathToDirectionFromCellId(cells, this.cellId, direction);
    // If no way:
    if (!target) {
      return;
    }
    // If way, move if it's possible:
    // Launch animations if timer isn't setted:
    if (!this.animTimer) {
      this.toggleAnim("ON");
    }

    // If the direction to move change than current:
    if (this.movingDirection !== direction) {
      // Set new direction
      this.movingDirection = direction;
      // Reload the animations:
      this.toggleAnim("OFF");
      this.toggleAnim("ON");
    }

    // Change cellId => move
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
    this.toggleAnim("OFF"); // Stop anim
    this.teleport(this.startingCellId);
    console.log(`${this.name}: I'm dead :-'(.`); // Debug
  }

  teleport(target: number) {
    if (cells[target].element !== 0) return;
    this.cellId = target;
  }

  toggleAnim(toggle: "ON" | "OFF") {
    if (!this.skins.animations)
      if (this.animTimer) {
        // If animTimer is already set:
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
    // If entitie doesnt includes animations
    if (!this.skins.animations) {
      return;
    }
    // if no skins defined (based on the left dir):
    if (this.skins.animations.left.length === 0) {
      return;
    }
    let dir = undefined;

    switch (this.movingDirection) {
      case "UP":
        dir = this.skins.animations.up;
        break;
      case "DOWN":
        dir = this.skins.animations.down;
        break;
      case "LEFT":
        dir = this.skins.animations.left;
        break;
      case "RIGHT":
        dir = this.skins.animations.right;
        break;
      default:
        // Set right by default:
        dir = this.skins.animations.right;
        break;
    }

    // Set the skin at the skin index
    this.skins.current = dir[this.skins.nextAnimationIndex];
    // Set the next skin index:
    this.skins.nextAnimationIndex =
      this.skins.nextAnimationIndex === dir.length - 1
        ? 0
        : this.skins.nextAnimationIndex + 1;
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
