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
    const dir = {
      up: getPathToDirectionFromCellId(this.cellId, "UP"),
      down: getPathToDirectionFromCellId(this.cellId, "DOWN"),
      left: getPathToDirectionFromCellId(this.cellId, "LEFT"),
      right: getPathToDirectionFromCellId(this.cellId, "RIGHT")
    };

    // Remove opposite direction:
    if (this.movingDir === "UP") delete dir.down;
    if (this.movingDir === "DOWN") delete dir.up;
    if (this.movingDir === "LEFT") delete dir.right;
    if (this.movingDir === "RIGHT") delete dir.left;

    // Keep only walkable cells:
    for (const [key, value] of Object.entries(dir)) {
      if (!value) {
        continue; // Skip
      }
      // TODO: Find the bug here
      walkablesDir.push(value);
    }

    // Make a random choice:
    const randomChoice = walkablesDir[getRandomInt(Object.entries(dir).length)];
    console.log(randomChoice);
    // setNewDirection
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
