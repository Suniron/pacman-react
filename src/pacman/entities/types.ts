export type Direction = "LEFT" | "RIGHT" | "UP" | "DOWN";
export type AutoMoveState = "ON" | "OFF";

interface animations {
  left: Array<string>;
  right: Array<string>;
  up: Array<string>;
  down: Array<string>;
}

export interface Skins {
  current: string;
  default?: string;
  animations?: animations;
  nextAnimationIndex: number;
}
