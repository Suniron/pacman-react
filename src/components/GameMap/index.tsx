import React, { useRef, useEffect } from "react";
import { useOvermind } from "store";
import { draw, getCellIdFromCoords, reDraw } from "../../game/map/gameMap";
import { cells } from "game/map/cells";
import { GAME_SPEED } from "game/settings";
import { heroe } from "game/entities";

const GameMap: React.FC = () => {
  // -- HOOKS --
  const { state } = useOvermind();
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
      console.log("clicked");
    };
    canvas.current?.addEventListener("click", onClick);
    */
    console.log("C'est fraichement draw :-)");
    // Init draw:
    draw({ ctx: ctx, width: state.appSize.width, cellsByLine: 15 });
    // Re-draw:
    setInterval(() => reDraw(), GAME_SPEED);

    // Formerly ComponentWillUnmount (cleaning):
    return () => {
      //canvas.current?.removeEventListener("click", onClick);
      console.log("remove");
    };
  }, [state.appSize.width, canvas]);

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
        height={state.appSize.height}
        width={state.appSize.width}
        onClick={onGameMapClick}
        ref={canvas}
      ></canvas>
    </>
  );
};

export default GameMap;
