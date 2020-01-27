import { MAP } from "pacman/settings";
import { Direction } from "pacman/entities/types";
import { Board } from "./types";
import { board1 } from "pacman/game/boards";

// TODO: Find better way for initCells() and assignCellsElement()

export class Cell {
  id: number = -1;
  x: number = -1;
  y: number = -1;
  width: number = -1;
  height: number = -1;

  /**map
   * -1 -> undefined
   * 0 -> walkable
   * 1 -> wall
   */
  element: number = -1;

  constructor(id: number, x: number, y: number, width: number, height: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // -- GETTERS --
  get isFree() {
    // TODO: Check if entitie is on this cell:
    if (this.element === 1) {
      return false;
    }

    return true;
  }
}

// -- FUNCTIONS --
export const initCells = (levelBoard: Board) => {
  const tempCells: Array<Cell> = [];

  for (let column = 0; column < MAP.cellsByLine; column++) {
    for (let row = 0; row < MAP.cellsByLine; row++) {
      tempCells.push(
        new Cell(
          tempCells.length,
          row * (MAP.width / MAP.cellsByLine),
          column * (MAP.width / MAP.cellsByLine),
          MAP.width / MAP.cellsByLine,
          MAP.width / MAP.cellsByLine
        )
      );
    }
  }

  return assignCellsElement(tempCells, levelBoard);
};

const assignCellsElement = (cells: Array<Cell>, levelBoard: Board) => {
  const tempCells = [];
  for (let i = 0; i < levelBoard.join().split(",").length; i++) {
    const c = cells[i];
    c.element = parseInt(levelBoard.join().split(",")[i]);
    tempCells.push(c);
  }
  return tempCells;
};

export const getAllfreeCells = (cells: Array<Cell>) => {
  const freeCells: Array<Cell> = [];

  cells.forEach(cell => {
    if (cell.isFree) {
      return cell;
    }
  });

  return freeCells;
};

// TODO: FIND A CORRECTION:
export const getCellsId = (config: { width: number; cellsByLine: number }) => {
  // Destructuring parameters:
  const { width, cellsByLine } = config;
  const cellsId = [];

  for (let column = 0; column < cellsByLine; column++) {
    for (let row = 0; row < cellsByLine; row++) {
      cellsId.push(
        new Cell(
          cellsId.length,
          row * (width / cellsByLine),
          column * (width / cellsByLine),
          width / cellsByLine,
          width / cellsByLine
        )
      );
    }
  }
};

const getLeftCell = (currentCellId: number) => {
  if (currentCellId % MAP.cellsByLine !== 0) {
    // There is left neighbourg
    return currentCellId - 1;
  }
};

const getRightCell = (currentCellId: number) => {
  if (currentCellId === MAP.cellsByLine - 1) {
    return;
  } else if (currentCellId < MAP.cellsByLine - 1) {
    return currentCellId + 1;
  } else if (currentCellId - ((MAP.cellsByLine - 1) % MAP.cellsByLine) === 0) {
    return;
  } else {
    return currentCellId + 1;
  }

  /*
    if (currentCellId >= MAP.cellsByLine * 2 - 1) {
      if ((currentCellId - MAP.cellsByLine - 1) % MAP.cellsByLine === 0) {
        // There is right neighbourg
        return currentCellId + 1;
      }
    } else if (currentCellId !== MAP.cellsByLine - 1) {
      // There is right neighbourg
      return currentCellId + 1;
    }
  */
};

const getUpCell = (currentCellId: number) => {
  if (currentCellId >= MAP.cellsByLine) {
    // There is up neighbourg
    return currentCellId - MAP.cellsByLine;
  }
};

const getDownCell = (currentCellId: number) => {
  if (currentCellId < MAP.cellsByLine * MAP.cellsByLine - MAP.cellsByLine) {
    // There is down neighbourg
    return currentCellId + MAP.cellsByLine;
  }
};

export const getNeighboursCellIds = (cellId: number) => {
  const neighboursCellIds: Array<number> = [];
  // checkLeft
  const leftCell = getLeftCell(cellId);
  if (leftCell) {
    neighboursCellIds.push(leftCell);
  }
  // checkRight
  const rightCell = getRightCell(cellId);
  if (rightCell) {
    neighboursCellIds.push(rightCell);
  }
  // checkUp
  const upCell = getUpCell(cellId);
  if (upCell) {
    neighboursCellIds.push(upCell);
  }
  // checkDown
  const downCell = getDownCell(cellId);
  if (downCell) {
    neighboursCellIds.push(downCell);
  }

  return neighboursCellIds;
};

/**
 * TODO: get path with multiple case (See algo a* = aStar)
 * @param cellId
 * @param direction
 */
export const getPathToDirectionFromCellId = (
  cells: Array<Cell>,
  cellId: number,
  direction: Direction
) => {
  // Check if cells are init:
  if (cells.length === 0) {
    return;
  }

  let target: number | undefined = undefined;

  // Get cellId if exist (or undefined if not):
  if (direction === "UP") target = getUpCell(cellId);
  if (direction === "DOWN") target = getDownCell(cellId);
  if (direction === "LEFT") target = getLeftCell(cellId);
  if (direction === "RIGHT") target = getRightCell(cellId);

  // If target does not exist, return:
  if (!target) return;

  // If target is not walkable, return:
  if (cells[target].element !== 0) return;

  // Target exist and is walkable:
  return target;
};

export const getCellIdFromCoords = (x: number, y: number) => {
  const width = 600;
  const nbCells = 15;
  let id = 0;

  const cols = Math.trunc(x / (width / nbCells));
  const lines = Math.trunc(y / (width / nbCells));

  id = cols + 15 * lines;

  return id;
};

// -- MAKE --

// Create Cells
export var cells: Array<Cell> = initCells(board1);
// Assign Elements (TODO: get with getter ? on instanciation ?):
//assignCellsElement();
