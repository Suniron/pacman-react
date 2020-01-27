import { initLevels, Level } from "./levels";
import { Heroe } from "../entities/heroe";
import { initCells, Cell } from "../map/cells";

class Game {
  score = 0;
  currentLevelNb = 1;
  isPause = false;
  cells: Array<Cell>;
  //bonuses: Array<Bonus>;

  heroe = new Heroe("Pacman", 202); // TODO: groupe in entities with enemiesIndex  levels = new Levels(this.cells);
  levels: Array<Level> = initLevels();
  constructor() {
    this.cells = initCells(this.currentLevel.board);
    this.reset();
    this.start();
  }
  /**
   * Set Game instance to initial state
   */
  reset = () => {
    this.cells = initCells(this.currentLevel.board);
    this.score = 0;
    this.currentLevelNb = 1;
    this.isPause = false;
    //this.bonuses = initBonuses(this.cells);
  };

  /**
   * Start/resume the game
   */
  start = () => {
    this.isPause = false;
  };

  /**
   * Pause/freeze the game
   */
  pause = () => {
    this.isPause = true;
  };

  // -- GETTERS --
  get currentLevel() {
    return this.levels[0];
  }
  get enemies() {
    return this.currentLevel.enemies;
  }
  /**
   * Return an array of entities (heroe + enemies)
   */
  get entities() {
    return [...this.enemies, this.heroe];
  }
  get currentLevelIndex() {
    return this.currentLevelNb - 1;
  }
}

export default Game;
