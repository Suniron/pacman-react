import { gameBoard } from "./gameBoard";
import { Directions } from "game/entities";
import { MAP } from "game/settings";

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

export var cells: Array<Cell> = [];

export const getCellsId = (config: {
  ctx: CanvasRenderingContext2D;
  width: number;
  cellsByLine: number;
}) => {
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

export const assignCellsElement = () => {
  for (let i = 0; i < gameBoard.join().split(",").length; i++) {
    cells[i].element = parseInt(gameBoard.join().split(",")[i]);
  }
};

export const getCellNeighbours = (cellId: number) => {
  const neighboursCellIds: Array<number> = [];
  // checkLeft
  if (cellId % MAP.cellsByLine !== 0) {
    // There is left neighbourg
  }
  // checkRight
  if (cellId % (MAP.cellsByLine - 1) !== 0) {
    // There is right neighbourg
  }

  // checkUp
  // checkDown
  console.log(15 % MAP.cellsByLine);
  // +1, -1 si pas au bord G/D, +15 -15 si pas au bord H/b

  return neighboursCellIds;
};
