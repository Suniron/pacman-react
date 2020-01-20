import React, { useRef, useEffect } from "react";
import { useOvermind } from "store";
import { drawGrid } from "./grid";

const GameMap: React.FC = ({}) => {
  // -- HOOKS --
  const { state, actions } = useOvermind();
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Use only variable on table as 2nd arg and hooks
    // Formerly ComponentDidMount:
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    const onClick = () => {
      console.log("clicked");
    };
    canvas.current?.addEventListener("click", onClick);
    console.log("vasy fait la grille poto ;)");

    drawGrid(ctx, state.appSize.width, 15);

    // Formerly ComponentWillUnmount (cleaning):
    return () => {
      canvas.current?.removeEventListener("click", onClick);
      console.log("remove");
    };
  }, [state.appSize.width]);

  // -- FUNCTIONS --
  const onGameMapClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvas.current) {
      return;
    }
    console.log(
      "x:" +
        (e.clientX - canvas.current.offsetLeft) +
        ", y:" +
        (e.clientY - canvas.current.offsetTop)
    );
  };

  // -- RENDER --
  return (
    <>
      <button onClick={actions.setActionTest}>click test</button>
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
