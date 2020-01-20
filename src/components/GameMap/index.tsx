import React from "react";
import { useOvermind } from "store";

const GameMap = () => {
  // -- HOOKS --
  const { state } = useOvermind();

  // -- FUNCTIONS --
  const onGameMapClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    console.log(
      "x:" +
        (e.clientX - state.canvas.offsetLeft) +
        ", y:" +
        (e.clientY - state.canvas.offsetTop)
    );
  };

  const draw = () => {
    //const ctx = ref.
    return null;
  };

  // -- RENDER --
  return (
    <>
      <canvas
        height={state.appSize.height}
        width={state.appSize.width}
        onClick={onGameMapClick}
      >
        {draw()}
      </canvas>
    </>
  );
};

export default GameMap;
