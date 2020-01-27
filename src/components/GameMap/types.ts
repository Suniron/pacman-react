import { Direction } from "pacman/entities/types";

export interface ButtonsProps {
  onClickHandler: (direction: Direction) => void; // TODO: Optimise
}
