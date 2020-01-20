export interface appSize {
  height: number;
  width: number;
}

export interface State {
  appSize: appSize;
  canvas: HTMLCanvasElement;
  //ctx?: CanvasRenderingContext2D;
}
