import { Direction } from "game/entities/types";

export interface ButtonsProps {
  onClickHandler: (direction: Direction) => void; // TODO: Optimise
}
