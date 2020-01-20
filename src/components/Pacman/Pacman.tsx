import React from "react";
import { useOvermind } from "store";
import GameMap from "components/GameMap";

export const Pacman = () => {
  // -- HOOKS --
  const { state } = useOvermind();

  // -- RENDER --
  return (
    <div>
      <GameMap />
    </div>
  );
};
