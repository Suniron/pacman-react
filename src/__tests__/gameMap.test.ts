import {
  getNeighboursCellIds,
  getPathToDirectionFromCellId,
  getCellIdFromCoords
} from "pacman/map/cells";
import Game from "pacman/game/game";
import { Bonus, initBonus } from "pacman/game/bonus";

describe("getCellIdFromCoords()", () => {
  test("x = 10 and y = 10 should be cellID = 0", () => {
    expect(getCellIdFromCoords(10, 10)).toBe(0);
  });
  test("x = 55 and y = 15 should be cellID = 1", () => {
    expect(getCellIdFromCoords(55, 15)).toBe(1);
  });
  test("x = 590 and y = 590 should be cellID = 224", () => {
    expect(getCellIdFromCoords(590, 590)).toBe(224);
  });
});

describe("getNeighboursCellIds()", () => {
  test("Output should be an array", () => {
    expect(typeof getNeighboursCellIds(200)).toBe(typeof []);
  });
  test("Output of 16 should be [1, 15, 17, 31]", () => {
    expect(getNeighboursCellIds(16).sort()).toStrictEqual(
      [1, 15, 17, 31].sort()
    );
  });
  test("Output of 0 should be [1, 15]", () => {
    expect(getNeighboursCellIds(0).sort()).toStrictEqual([1, 15].sort());
  });
  test("Output of 14 should be [13, 29]", () => {
    expect(getNeighboursCellIds(14).sort()).toStrictEqual([13, 29].sort());
  });
  test("Output of 17 should be [2,16,18, 32]", () => {
    expect(getNeighboursCellIds(17).sort()).toStrictEqual(
      [2, 16, 18, 32].sort()
    );
  });
});

describe("getPathToDirectionFromCellId()", () => {
  const game = new Game();
  describe("Check if cell does not exist", () => {
    test("Output from cell 0 to UP should be falsy", () => {
      expect(getPathToDirectionFromCellId(game.cells, 0, "UP")).toBeFalsy();
    });

    test("Output from cell 0 to LEFT should be falsy", () => {
      expect(getPathToDirectionFromCellId(game.cells, 0, "LEFT")).toBeFalsy();
    });
  });
  describe("Check if cell exist and walkable", () => {
    test("Output from cell 1 to DOWN should be 16", () => {
      expect(getPathToDirectionFromCellId(game.cells, 1, "DOWN")).toBe(16);
    });

    test("Output from cell 17 to RIGHT should be 18", () => {
      expect(getPathToDirectionFromCellId(game.cells, 17, "RIGHT")).toBe(18);
    });
    test("Output from cell 77 to RIGHT should be 78", () => {
      expect(getPathToDirectionFromCellId(game.cells, 77, "RIGHT")).toBe(78);
    });
  });
  describe("Check if cell exist but not walkable", () => {
    test("Output from cell 151 to LEFT should be falsy", () => {
      expect(getPathToDirectionFromCellId(game.cells, 151, "LEFT")).toBeFalsy();
    });
  });
});

describe("Bonus", () => {
  const game = new Game();
  describe("Class Bonus", () => {
    const bonus = new Bonus(game.cells[19], "SIMPLE");
  });
  describe("initBonus()", () => {
    test("Output length of 2 small + 1 big = 3", () => {
      expect(initBonus(game.cells, 2, 1).length).toBe(3);
    });
    test("Output length of 2 small + 2 big = 4", () => {
      expect(initBonus(game.cells, 2, 2).length).toBe(4);
    });
    test("Output length of 2 small + 2 big = 4", () => {
      expect(initBonus(game.cells, 2, 2).length).toBe(4);
    });
    test("Output length of 1 small + 0 big = 1", () => {
      expect(initBonus(game.cells, 1, 0).length).toBe(1);
    });
    test("Output length of 0 small + 1 big = 1", () => {
      expect(initBonus(game.cells, 0, 1).length).toBe(1);
    });
    test("Should throw an errow if not enough empty cells", () => {
      expect(initBonus([game.cells[25]], 1, 1).length).toBe(0);
    });
    // Test with more bonus than empty cells
  });
});
