import Entite from "game/entities/entite";
//import pacman_img from "assets/images/pacman.png";
import pacman_closed_img from "assets/images/pacman/pacman_closed_mouth.png";
import pacman_half_img from "assets/images/pacman/pacman_half_opened_mouth.png";
import pacman_full_img from "assets/images/pacman/pacman_full_opened_mouth.png";

export class Heroe extends Entite {
  constructor(name: string, cellId: number) {
    super(name, cellId, true);
    this.skins = {
      current: pacman_closed_img,
      onMove: [pacman_half_img, pacman_full_img],
      nextOnMoveIndex: 0
    };
  }

  handleColision() {
    this.loseOneHP();
  }
}
