export class Cell {
  id: number = -1;
  x: number = -1;
  y: number = -1;
  width: number = -1;
  height: number = -2;

  constructor(id: number, x: number, y: number, width: number, height: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
