import Entite from "game/entities/entite";
import { AutoMoveState, Direction } from "./types";
import { getPathToDirectionFromCellId } from "game/map/cells";
import { getRandomInt } from "game/utils/random";
import { ENEMIES } from "game/settings";
import ghost_green_img from "assets/images/ghost_green/ghost_green.png";
import ghost_blue_img from "assets/images/ghost_blue/ghost_blue.png";

const enemiesImages = [ghost_green_img, ghost_blue_img];

export class Enemy extends Entite {
  autoMoveState: AutoMoveState = "ON";

  constructor(name: string, cellId: number) {
    super(name, cellId, false);
    this.skins = {
      current: enemiesImages[getRandomInt(2)],
      nextAnimationIndex: 0
    };
    // TODO: add onMove skins here

    // Launch automove on init (Best way ?):
    this.launchAutoMove();
  }

  autoMove() {
    if (this.autoMoveState === "OFF") {
      return;
    }
    const walkablesDir = [];

    // Get neighbourgsCell (or undefined):
    const dir: {
      up: { path: number | undefined; direction: Direction };
      down: { path: number | undefined; direction: Direction };
      left: { path: number | undefined; direction: Direction };
      right: { path: number | undefined; direction: Direction };
    } = {
      up: {
        path: getPathToDirectionFromCellId(this.cellId, "UP"),
        direction: "UP"
      },
      down: {
        path: getPathToDirectionFromCellId(this.cellId, "DOWN"),
        direction: "DOWN"
      },
      left: {
        path: getPathToDirectionFromCellId(this.cellId, "LEFT"),
        direction: "LEFT"
      },
      right: {
        path: getPathToDirectionFromCellId(this.cellId, "RIGHT"),
        direction: "RIGHT"
      }
    };

    // Remove opposite direction:
    switch (this.movingDirection) {
      case "UP":
        delete dir.down;
        break;
      case "DOWN":
        delete dir.up;
        break;
      case "LEFT":
        delete dir.right;
        break;
      case "RIGHT":
        delete dir.left;
        break;
      default:
        break;
    }

    // Keep only walkable cells:
    for (const value of Object.values(dir)) {
      if (value.path) {
        walkablesDir.push(value);
      }
    }

    // If enemy is in a "dead end", go back:
    if (walkablesDir.length === 0) {
      switch (this.movingDirection) {
        case "UP":
          this.movingDirection = "DOWN";
          break;
        case "DOWN":
          this.movingDirection = "UP";
          break;
        case "LEFT":
          this.movingDirection = "RIGHT";
          break;
        case "RIGHT":
          this.movingDirection = "LEFT";
          break;
        default:
          break;
      }
    } else {
      // Make a random choice:
      const randomChoice = walkablesDir[getRandomInt(walkablesDir.length)];

      // setNewDirection
      this.movingDirection = randomChoice.direction;
    }

    // Move
    this.move(this.movingDirection);
  }
  launchAutoMove() {
    if (this.autoMoveState === "OFF") {
      return;
    }

    //this.move("UP");
    setInterval(() => this.autoMove(), 1000);
  }

  stopAutoMove() {
    this.autoMoveState = "OFF";
  }
}

export const initEnemies = () => {
  return ENEMIES.map(enemy => {
    return new Enemy(enemy.NAME, enemy.STARTING_CELL);
  });
};

/**
 * -> AutoMove:
 * Quand l'entité peut aller ailleurs que tout droit (en excluant le retour),
 * elle fait un choix aléatoire entre tout droit et les autres directions
 * possibles.
 */
