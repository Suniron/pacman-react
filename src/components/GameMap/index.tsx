import React, { useRef, useEffect } from "react";
import draw from "game/map/draw";
import { cells, getCellIdFromCoords } from "game/map/cells";
import { GAME_SPEED, MAP } from "game/settings";
import { heroe } from "game/entities";

const GameMap: React.FC = () => {
  // -- HOOKS --
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Use only variable on table as 2nd arg and hooks
    // Formerly ComponentDidMount:
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) {
      return;
    }

    // --> KEYBOARD LISTENERS :
    window.addEventListener("keydown", onKeydown);
    /*
    const onClick = () => {
      console.log("cexport const getCellIdFromCoords = (x: number, y: number) => {
  const width = 600;
  const nbCells = 15;
  let id = 0;

  const cols = Math.trunc(x / (width / nbCells));
  const lines = Math.trunc(y / (width / nbCells));

  id = cols + 15 * lines;

  return id;
};licked");
    };
    canvas.current?.addEventListener("click", onClick);
    */
    console.log("It's freshly draw :-)");
    // Init draw:
    draw(ctx);
    // Re-draw:
    setInterval(() => draw(ctx), GAME_SPEED);

    // Formerly ComponentWillUnmount (cleaning):
    return () => {
      //canvas.current?.removeEventListener("click", onClick);
      console.log("cleaning...");
    };
  }, [canvas]);

  // -- FUNCTIONS --
  /**
   * Handle keyboard press on Window
   * @param e - Keyboard event when it is pressed
   */
  const onKeydown = (e: KeyboardEvent) => {
    // TODO: check if space is pressed to pause / resume the game
    if (e.key === "ArrowUp") {
      heroe.move("UP");
    }
    if (e.key === "ArrowDown") {
      heroe.move("DOWN");
    }
    if (e.key === "ArrowLeft") {
      heroe.move("LEFT");
    }
    if (e.key === "ArrowRight") {
      heroe.move("RIGHT");
    }
  };
  const onGameMapClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvas.current) {
      return;
    }
    const x = e.clientX - canvas.current.offsetLeft;
    const y = e.clientY - canvas.current.offsetTop;

    const clickedCell = cells[getCellIdFromCoords(x, y)];
    console.log(clickedCell);
  };

  // -- RENDER --
  return (
    <>
      <canvas
        height={MAP.height}
        width={MAP.width}
        onClick={onGameMapClick}
        ref={canvas}
      ></canvas>
    </>
  );
};

export default GameMap;
