import Entite from "game/entities/entite";

export class Heroe extends Entite {
  constructor(name: string, cellId: number) {
    super(name, cellId, true);
  }

  handleColision() {
    this.loseOneHP();
  }
}
