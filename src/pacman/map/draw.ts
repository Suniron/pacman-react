import { Cell } from "./cells";
import { MAP } from "pacman/settings";
import wall_img from "assets/images/wall.png";
import { Enemy } from "pacman/entities/enemy";
import { Heroe } from "pacman/entities/heroe";
import Game from "pacman/game/game";

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

const drawInterface = (ctx: CanvasRenderingContext2D, game: Game) => {
  // Draw skull:
  if (game.heroe.hp === 0) {
    ctx.font =
      (game.cells[0].width - game.cells[0].width / 4).toString() + "px Arial";
    //ctx.textAlign = "center";
    //ctx.textBaseline = "middle";
    ctx.fillText(
      "💀",
      game.cells[0].x + game.cells[0].width / 2,
      game.cells[0].y + game.cells[0].height / 2
    );

    return;
  }
  // Draw hearth:
  for (let i = 0; i < game.heroe.hp; i++) {
    // Set size to 75% of the cell:
    ctx.font =
      (game.cells[i].width - game.cells[i].width / 4).toString() + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "❤️",
      game.cells[i].x + (game.cells[0].x + game.cells[0].width) / 2,
      game.cells[i].y + (game.cells[0].x + game.cells[0].height) / 2
    );
  }
};

const draw = (
  ctx: CanvasRenderingContext2D | null | undefined,
  game: Game,
  debug?: boolean
) => {
  if (!ctx) {
    return;
  }

  drawMap(ctx, game.cells);
  // drawMisc // Like game bonus
  drawEntites(ctx, [...game.enemies, game.heroe]);
  drawInterface(ctx, game);

  // /!\: Debug use high memory
  if (debug) {
    drawGrid(ctx); // Show grid
    drawCellIds(ctx, game.cells); // Show Cells number
  }

  // Check if colision:
  if (colisionDetect(game.heroe, game.enemies)) {
    game.heroe.handleColision();
  }

  // Reinit ctx settings:
  ctx.restore();
};

// TODO: To an object
export default draw;
