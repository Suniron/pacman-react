export const GAME_SPEED = 10;

export const MAP = {
  height: 600,
  width: 600,
  cellsByLine: 15,
  colors: {
    cells: {
      walkable: "white",
      wall: "grey"
    }
  },
  get cellSize() {
    return this.width / this.cellsByLine;
  }
};

export const HEROE = {
  STARTING_CELL: 202
};

export const ENNEMIES = [
  {
    NAME: "Ghost#1",
    STARTING_CELL: 112
  }
];
