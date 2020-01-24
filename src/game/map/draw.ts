import { Cell, cells } from "./cells";
import { MAP } from "game/settings";
import wall_img from "assets/images/wall.png";
import { Enemy } from "game/entities/enemy";
import { Heroe } from "game/entities/heroe";

// TODO: convert to a class

// -- VARIABLES --
const wallImg = new Image();
wallImg.src = wall_img;

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

const drawCellIds = (ctx: CanvasRenderingContext2D, cells: Array<Cell>) => {
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

const colisionDetect = (heroe: Heroe, enemies: Array<Enemy>) => {
  // Check if colision beetween Heroe and Ennemies:
  let isColision = false;
  enemies.forEach(enemy => {
    if (heroe.cellId === enemy.cellId) {
      isColision = true;
    }
  });

  return isColision;
};

const drawMap = (ctx: CanvasRenderingContext2D, cells: Array<Cell>) => {
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

const drawEntites = (
  ctx: CanvasRenderingContext2D,
  entities: Array<Heroe | Enemy>
) => {
  // Ennemies:
  entities.forEach(entitie => {
    if (!entitie.isAlive) {
      return;
    }

    const img = new Image();
    img.src = entitie.skins.current;
    ctx.drawImage(img, entitie.x, entitie.y, entitie.width, entitie.height);
  });
};

const drawInterface = (ctx: CanvasRenderingContext2D, heroe: Heroe) => {
  // Draw skull:
  if (heroe.hp === 0) {
    ctx.font = (cells[0].width - cells[0].width / 4).toString() + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "💀",
      (cells[0].x + cells[0].width) / 2,
      (cells[0].y + cells[0].height) / 2
    );

    return;
  }
  // Draw hearth:
  for (let i = 0; i < heroe.hp; i++) {
    // Set size to 75% of the cell:
    ctx.font = (cells[i].width - cells[i].width / 4).toString() + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "💓",
      (cells[i].x + cells[i].width) / 2,
      (cells[i].y + cells[i].height) / 2
    );
  }
};

const draw = (
  cells: Array<Cell>,
  heroe: Heroe,
  enemies: Array<Enemy>,
  ctx: CanvasRenderingContext2D | null | undefined,
  debug?: boolean
) => {
  if (!ctx) {
    return;
  }

  drawMap(ctx, cells);
  // drawMisc // Like game bonus
  drawEntites(ctx, [...enemies, heroe]);
  drawInterface(ctx, heroe);

  if (debug) {
    drawGrid(ctx); // Show grid
    drawCellIds(ctx, cells); // Show Cells number
  }

  // Check if colision:
  if (colisionDetect(heroe, enemies)) {
    heroe.handleColision();
  }

  // Reinit ctx settings:
  ctx.restore();
};

// TODO: To an object
export default draw;
