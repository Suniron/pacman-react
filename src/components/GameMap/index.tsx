import React, { useRef, useEffect, useState } from "react";
import draw from "game/map/draw";
import { cells, getCellIdFromCoords } from "game/map/cells";
import { GAME_SPEED, MAP } from "game/settings";
//import { heroe } from "game/entities";
import { Heroe } from "game/entities/heroe";

const GameMap: React.FC = () => {
  // -- HOOKS --
  const canvas = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    // Use only variable on table as 2nd arg and hooks
    // Formerly ComponentDidMount:
    console.log("It's freshly draw :-)"); // To debug
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) {
      return;
    }

    // --> KEYBOARD LISTENERS :
    window.addEventListener("keydown", onKeydown);

    // draw:
    setInterval(() => draw(ctx), GAME_SPEED);

    // Formerly ComponentWillUnmount (cleaning):
    return () => {
      console.log("cleaning...");
      window.removeEventListener("keydown", onKeydown);
    };
  });

  const [heroe, setHeroe] = useState(new Heroe("Pacman", 165));

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
