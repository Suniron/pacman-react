import Entite from "game/entities/entite";
import { AutoMoveState, Direction } from "./types";
import { getPathToDirectionFromCellId } from "game/map/cells";
import { getRandomInt } from "game/utils/random";

export class Enemy extends Entite {
  autoMoveState: AutoMoveState = "ON";
  movingDir: Direction = "UP"; // Begin with UP to leave the spawn
  constructor(name: string, cellId: number) {
    super(name, cellId, false);
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
    switch (this.movingDir) {
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
      switch (this.movingDir) {
        case "UP":
          this.movingDir = "DOWN";
          break;
        case "DOWN":
          this.movingDir = "UP";
          break;
        case "LEFT":
          this.movingDir = "RIGHT";
          break;
        case "RIGHT":
          this.movingDir = "LEFT";
          break;
        default:
          break;
      }
    } else {
      // Make a random choice:
      const randomChoice = walkablesDir[getRandomInt(walkablesDir.length)];

      // setNewDirection
      this.movingDir = randomChoice.direction;
    }

    // Move
    this.move(this.movingDir);
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

/**
 * -> AutoMove:
 * Quand l'entité peut aller ailleurs que tout droit (en excluant le retour),
 * elle fait un choix aléatoire entre tout droit et les autres directions
 * possibles.
 */
