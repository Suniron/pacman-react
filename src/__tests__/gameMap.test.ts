import { getCellIdFromCoords } from "game/map/gameMap";
import { getCellNeighbours } from "game/map/cells";

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

describe("getCellNeighbours()", () => {
  test("Output should be an array", () => {
    expect(typeof getCellNeighbours(200)).toBe(typeof []);
  });
  test("Output of 16 should be [1, 15, 17, 31]", () => {
    expect(getCellNeighbours(16).sort()).toBe([1, 15, 17, 31].sort());
  });
});
