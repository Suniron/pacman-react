import { gameBoard } from "./gameBoard";
import { MAP } from "game/settings";
import { Direction } from "game/entities";

export class Cell {
  id: number = -1;
  x: number = -1;
  y: number = -1;
  width: number = -1;
  height: number = -1;

  /**
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
}

// -- FUNCTIONS --
export const initCells = () => {
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

  return tempCells;
};

export const getCellsId = (config: { width: number; cellsByLine: number }) => {
  // Destructuring parameters:
  const { width, cellsByLine } = config;

  for (let column = 0; column < cellsByLine; column++) {
    for (let row = 0; row < cellsByLine; row++) {
      cells.push(
        new Cell(
          cells.length,
          row * (width / cellsByLine),
          column * (width / cellsByLine),
          width / cellsByLine,
          width / cellsByLine
        )
      );
    }
  }
};

const assignCellsElement = () => {
  for (let i = 0; i < gameBoard.join().split(",").length; i++) {
    cells[i].element = parseInt(gameBoard.join().split(",")[i]);
  }
};

const getLeftCell = (currentCellId: number) => {
  if (currentCellId % MAP.cellsByLine !== 0) {
    // There is left neighbourg
    return currentCellId - 1;
  }
};

const getRightCell = (currentCellId: number) => {
  if (currentCellId >= MAP.cellsByLine * 2 - 1) {
    if ((currentCellId - MAP.cellsByLine - 1) % MAP.cellsByLine === 0) {
      // There is right neighbourg
      return currentCellId + 1;
    }
  } else if (currentCellId !== MAP.cellsByLine - 1) {
    // There is right neighbourg
    return currentCellId + 1;
  }
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
  cellId: number,
  direction: Direction
) => {
  // Check if cells are init:
  if (cells.length === 0) {
    return;
  }

  let target: number | undefined = undefined;

  if (direction === "UP") target = getUpCell(cellId);
  if (direction === "DOWN") target = getDownCell(cellId);
  if (direction === "LEFT") target = getLeftCell(cellId);
  if (direction === "RIGHT") target = getRightCell(cellId);

  return target;
};

// -- MAKE --

// Create Cells
export var cells: Array<Cell> = initCells();
// Assign Elements (TODO: get with getter ? on instanciation ?):
assignCellsElement();
