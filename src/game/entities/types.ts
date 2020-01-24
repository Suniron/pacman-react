export type Direction = "LEFT" | "RIGHT" | "UP" | "DOWN";
export type AutoMoveState = "ON" | "OFF";

export interface Skins {
  current: string;
  onMove: Array<string>;
  nextOnMoveIndex: number;
}
