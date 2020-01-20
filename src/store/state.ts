import { State } from "./types";

export const state: State = {
  appSize: { height: 600, width: 600 },
  canvas: document.getElementById("canvas") as HTMLCanvasElement
  /*get ctx() {
    const can = document.getElementById("canvas") as HTMLCanvasElement;
    if (can) {
      return can.getContext("2d");
    }
    return null;
  }
  */
};
