import React, { useRef, useEffect, useState, useCallback } from "react";
import draw from "game/map/draw";
import { getCellIdFromCoords, initCells } from "game/map/cells";
import { GAME_SPEED, MAP, HEROE } from "game/settings";
//import { heroe } from "game/entities";
import { Heroe } from "game/entities/heroe";
import { initEnemies } from "game/entities/enemy";
import { Direction } from "game/entities/types";

/**
 * Call the callback with a direction in UPPERCASE like:
 *
 *  `"UP", "DOWN", "LEFT", "RIGHT"`
 * @param callback On keydown callback
 */
const useKeyboardArrows = (callback: (dir: Direction) => any) => {
  const handleOnKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        callback("UP");
      } else if (e.key === "ArrowDown") {
        callback("DOWN");
      } else if (e.key === "ArrowLeft") {
        callback("LEFT");
      } else if (e.key === "ArrowRight") {
        callback("RIGHT");
      }
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleOnKeydown);
    // Cleaning:
    return () => {
      window.removeEventListener("keydown", handleOnKeydown);
    };
  }, [handleOnKeydown]);
};

const useInterval = (callback: () => any, ms: number) => {
  useEffect(() => {
    const timer = setInterval(callback, ms);
    // Cleaning:
    return () => {
      clearInterval(timer);
    };
  }, [callback, ms]);
};

const GameMap: React.FC = () => {
  // -- HOOKS --
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cells] = useState(initCells());
  const [heroe] = useState(new Heroe(HEROE.NAME, HEROE.STARTING_CELL));
  const [enemies] = useState(initEnemies());
  useInterval(
    () => draw(cells, heroe, enemies, canvasRef.current?.getContext("2d")),
    GAME_SPEED
  );
  useKeyboardArrows(dir => heroe.move(dir));

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
