import Entite from "game/entities/entite";
import { Cell } from "game/map/cells";
import pacman_default_img from "assets/images/pacman/pacman_default.png";
import pacman_left1 from "assets/images/pacman/pacman_left1.png";
import pacman_left2 from "assets/images/pacman/pacman_left2.png";
import pacman_right1 from "assets/images/pacman/pacman_right1.png";
import pacman_right2 from "assets/images/pacman/pacman_right2.png";
import pacman_up1 from "assets/images/pacman/pacman_up1.png";
import pacman_up2 from "assets/images/pacman/pacman_up2.png";
import pacman_down1 from "assets/images/pacman/pacman_down1.png";
import pacman_down2 from "assets/images/pacman/pacman_down2.png";

export class Heroe extends Entite {
  constructor(name: string, cells: Array<Cell>, cellId: number) {
    super(name, cells, cellId, true);
    this.skins = {
      default: pacman_default_img,
      current: pacman_default_img,
      animations: {
        left: [pacman_left1, pacman_left2],
        right: [pacman_right1, pacman_right2],
        up: [pacman_up1, pacman_up2],
        down: [pacman_down1, pacman_down2]
      },
      nextAnimationIndex: 0
    };
  }

  handleColision() {
    this.loseOneHP();
  }
}
