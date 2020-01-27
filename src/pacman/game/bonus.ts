import { Cell } from "pacman/map/cells";
import { BonusType } from "./types";
import { shuffle } from "pacman/utils/random";

export class Bonus {
  cellId: Cell;

  bonusType: BonusType;
  constructor(cellId: Cell, bonusType: BonusType) {
    this.cellId = cellId;
    this.bonusType = bonusType;
  }

  get points() {
    return this.bonusType === "SIMPLE" ? 100 : 300;
  }
}

export class SimpleBonus extends Bonus {
  constructor(cellId: Cell) {
    super(cellId, "SIMPLE");
  }
}

export class BigBonus extends Bonus {
  constructor(cellId: Cell) {
    super(cellId, "BIG");
  }
}

/**
 * Return bonuses array
 * @param cells Free cells to put bonus on
 * @param nbSimpleBonuses Number of simple bonuses
 * @param nbBigBonuses Number of big bonuses
 */
export const initBonus = (
  cells: Array<Cell>,
  nbSimpleBonuses: number,
  nbBigBonuses: number
) => {
  const bonuses = [];
  // Check if simple+big > cells.length
  if (cells.length < nbBigBonuses + nbSimpleBonuses) {
    return [];
    //throw new Error("Empty cells must be more or equal than bonuses");
  }

  // get shufflized array:
  const shufflizedArray = shuffle(cells);

  // Assign simple::
  for (let i = 0; i < nbSimpleBonuses; i++) {
    bonuses.push(new SimpleBonus(shufflizedArray.pop()));
  }

  // Assign bigs:
  for (let i = 0; i < nbBigBonuses; i++) {
    bonuses.push(new BigBonus(shufflizedArray.pop()));
  }

  return bonuses;
};
