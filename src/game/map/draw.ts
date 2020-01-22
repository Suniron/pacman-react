import { cells } from "./cells";
import { heroe, ennemies } from "game/entities";
import { MAP } from "game/settings";

// -- VARIABLES --

/**
 * Design the map.
 * Each number represent an element:
 *  0 -> walkable
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
const drawGrid = (ctx: CanvasRenderingContext2D) => {
  const { cellsByLine, width } = MAP;
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

const colisionDetect = () => {
  // Check if colision beetween Heroe and Ennemies:
  let isColision = false;
  ennemies.forEach(enemy => {
    if (heroe.cellId === enemy.cellId) {
      isColision = true;
    }
  });

  return isColision;
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

const drawEntites = (ctx: CanvasRenderingContext2D) => {
  // Ennemies:
  ennemies.forEach(enemy => {
    if (!enemy.isAlive) {
      return;
    }
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
  if (heroe.isAlive) {
    // Heroe:
    ctx.fillStyle = heroe.color;
    ctx.fillRect(heroe.x, heroe.y, heroe.width, heroe.height);
  }
};

const draw = (ctx: CanvasRenderingContext2D, debug?: boolean) => {
  drawMap(ctx);
  // drawMisc // Like game bonus
  drawEntites(ctx);

  if (debug) {
    drawGrid(ctx); // Show grid
    drawCellIds(ctx); // Show Cells number
  }

  // Check if colision:
  if (colisionDetect()) {
    heroe.handleColision();
  }
};

export default draw;
