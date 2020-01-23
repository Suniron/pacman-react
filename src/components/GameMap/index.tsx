import React, { useRef, useEffect, useState } from "react";
import draw from "game/map/draw";
import { getCellIdFromCoords, initCells } from "game/map/cells";
import { GAME_SPEED, MAP, HEROE } from "game/settings";
//import { heroe } from "game/entities";
import { Heroe } from "game/entities/heroe";
import { initEnemies } from "game/entities/enemy";
import { Direction } from "game/entities/types";

/**
 * Call the callback with a direction in UPPERCASE
 * @param callback On keydown callback
 */
const useKeyboardArrows = (callback: (dir: Direction) => any) => {
  const handleOnKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      callback("UP");
    } else if (e.key === "ArrowDown") {
      callback("DOWN");
    } else if (e.key === "ArrowLeft") {
      callback("LEFT");
    } else if (e.key === "ArrowRight") {
      callback("RIGHT");
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleOnKeydown);
    // Cleaning:
    return () => {
      window.removeEventListener("keydown", handleOnKeydown);
    };
  });
};

const GameMap: React.FC = () => {
  // -- HOOKS --
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    // Use only variable on table as 2nd arg and hooks
    console.log("It's freshly draw :-)"); // To debug
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      return;
    }

    // Draw:
    // TODO: make a useInterval hooks
    const timer = setInterval(
      () => draw(ctx, cells, heroe, enemies),
      GAME_SPEED
    );

    // Cleaning:
    return () => {
      console.log("cleaning...");
      clearInterval(timer);
    };
  });
  const [cells] = useState(initCells());
  const [heroe] = useState(new Heroe(HEROE.NAME, HEROE.STARTING_CELL));
  useKeyboardArrows(dir => heroe.move(dir));
  const [enemies] = useState(initEnemies());

  // -- FUNCTIONS --
  const handleCanvasClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;

    const clickedCell = cells[getCellIdFromCoords(x, y)];
    console.log(clickedCell); // To debug
  };

  // -- RENDER --
  return (
    <>
      <canvas
        height={MAP.height}
        width={MAP.width}
        onClick={handleCanvasClick}
        ref={canvasRef}
      ></canvas>
    </>
  );
};

export default GameMap;
