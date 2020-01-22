import { cells } from "./cells";
import { heroe, ennemies } from "game/entities";
import { MAP } from "game/settings";
import wall_img from "assets/images/wall.png";
import pacman_img from "assets/images/pacman.png";
import ghost_green_img from "assets/images/ghost_green.png";

// -- VARIABLES --
const wallImg = new Image();
wallImg.src = wall_img;

const pacmanImg = new Image();
pacmanImg.src = pacman_img;

const ghostGreenImg = new Image();
ghostGreenImg.src = ghost_green_img;

// -- FUNCTIONS --
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
    switch (cell.element) {
      case 0:
        // set color
        ctx.fillStyle = MAP.colors.cells.walkable;
        // draw rectangle:
        ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
        break;
      case 1:
        ctx.drawImage(wallImg, cell.x, cell.y, cell.width, cell.height);
        break;
      default:
        return;
    }
  });
};

const drawEntites = (ctx: CanvasRenderingContext2D) => {
  // Ennemies:
  ennemies.forEach(enemy => {
    if (!enemy.isAlive) {
      return;
    }
    ctx.drawImage(ghostGreenImg, enemy.x, enemy.y, enemy.width, enemy.height);
  });
  if (heroe.isAlive) {
    // Heroe:
    ctx.drawImage(pacmanImg, heroe.x, heroe.y, heroe.width, heroe.height);
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

// TODO: To an object
export default draw;
