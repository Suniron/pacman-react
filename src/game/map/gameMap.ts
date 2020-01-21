import { cells, getCellsId, assignCellsElement } from "./cells";
import { heroe } from "game/entities";

// -- VARIABLES --

/**
 * Design the map.
 * Each number represent an element:
 *  0 -> path
 *  1 -> wall
 */

const colors = {
  walkable: "white",
  wall: "grey"
};

// -- FUNCTIONS --

/**
 * Make a grid
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const drawGrid = (config: {
  ctx: CanvasRenderingContext2D;
  width: number;
  cellsByLine: number;
}) => {
  const { cellsByLine, width, ctx } = config;
  // -- DRAW GRID --
  // Horizontal lines
  for (
    let i = 0 / cellsByLine;
    i < width + width / cellsByLine;
    i += width / cellsByLine
  ) {
    ctx.moveTo(0, i); // Starting point
    ctx.lineTo(width, i); // End point
    ctx.stroke(); // Make the line visible
  }
  // Vertical lines
  for (
    let i = 0 / cellsByLine;
    i < width + width / cellsByLine;
    i += width / cellsByLine
  ) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, width);
    ctx.stroke();
  }
};

const drawCellIds = (ctx: CanvasRenderingContext2D) => {
  cells.forEach(cell => {
    ctx.font = "12px serif";
    ctx.textAlign = "center";
    ctx.fillText(
      cell.id.toString(),
      cell.x + cell.width / 2,
      cell.y + cell.height / 2
    );
  });
};

const drawMap = (ctx: CanvasRenderingContext2D) => {
  cells.forEach(cell => {
    // Skip unkown elements:
    if (cell.element === -1) {
      return;
    }

    // Set fill color:
    cell.element === 0
      ? (ctx.fillStyle = colors.walkable)
      : (ctx.fillStyle = colors.wall);

    // draw rectangle:
    ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
  });
};

const drawEntites = (config: {
  ctx: CanvasRenderingContext2D;
  width: number;
  cellsByLine: number;
}) => {
  // Pacman:
  config.ctx.fillStyle = heroe.color;
  config.ctx.fillRect(heroe.x, heroe.y, heroe.width, heroe.height);
  console.log(heroe);
  // Monsters: TODO
};

export const draw = (config: {
  ctx: CanvasRenderingContext2D;
  width: number;
  cellsByLine: number;
}) => {
  //drawGrid(config); // to debug
  getCellsId(config);
  drawCellIds(config.ctx); // to debug
  assignCellsElement();
  //drawMap(config.ctx);
  // drawMisc // Like game bonus

  drawEntites(config);
  // collision detect
};

export const reDraw = () => {
  //console.log("redraw ", heroe);
  // checkCollision()
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
