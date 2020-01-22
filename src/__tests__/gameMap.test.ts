import {
  getNeighboursCellIds,
  getPathToDirectionFromCellId,
  getCellIdFromCoords
} from "game/map/cells";

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
  describe("Check if cell does not exist", () => {
    test("Output from cell 0 to UP should be falsy", () => {
      expect(getPathToDirectionFromCellId(0, "UP")).toBeFalsy();
    });

    test("Output from cell 0 to LEFT should be falsy", () => {
      expect(getPathToDirectionFromCellId(0, "LEFT")).toBeFalsy();
    });
  });
  describe("Check if cell exist and walkable", () => {
    test("Output from cell 1 to DOWN should be 16", () => {
      expect(getPathToDirectionFromCellId(1, "DOWN")).toBe(16);
    });

    test("Output from cell 17 to RIGHT should be 18", () => {
      expect(getPathToDirectionFromCellId(17, "RIGHT")).toBe(18);
    });
    test("Output from cell 77 to RIGHT should be 78", () => {
      expect(getPathToDirectionFromCellId(77, "RIGHT")).toBe(78);
    });
  });
  describe("Check if cell exist but not walkable", () => {
    test("Output from cell 151 to LEFT should be falsy", () => {
      expect(getPathToDirectionFromCellId(151, "LEFT")).toBeFalsy();
    });
  });
});
