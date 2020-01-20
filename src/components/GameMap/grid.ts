import { Cell } from "./cells";

/**
 * Make a grid and return cells ids
 * @param ctx - CanvasRenderingContext2D
 * @param width - Canvas width in number of pixels
 * @param cellsByLine - Number of cells in a line
 */
export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  cellsByLine: number
) => {
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

  // -- GET CELLS IDS --
  const cells = [];

  /*
  // Method 1: make Cell objects
  for (let column = 0; column < cellsByLine; column++) {
    for (let row = 0; row < cellsByLine; row++) {
      const rect = ctx.fillRect(
        row * (width / cellsByLine),
        column * (width / cellsByLine),
        width / cellsByLine,
        width / cellsByLine
      );

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
  */

  // Method 2: make Cell objects
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

  // To debug:

  // For each cells:
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
