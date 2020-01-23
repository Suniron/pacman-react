import Entite from "game/entities/entite";
import pacman_img from "assets/images/pacman.png";
export class Heroe extends Entite {
  constructor(name: string, cellId: number) {
    super(name, cellId, true);
    this.skins = { default: pacman_img };
  }

  handleColision() {
    this.loseOneHP();
  }
}
