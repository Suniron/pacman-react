export const GAME_SPEED = 10;

export const MAP = {
  height:
    window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight,
  width:
    window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight,
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
  NAME: "PACMAN",
  STARTING_CELL: 202
};

export const ENEMIES = [
  {
    NAME: "Ghost#1",
    STARTING_CELL: 112
  }
];
