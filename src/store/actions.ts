import { Action } from "overmind";
import { appSize } from "./types";

export const setSize: Action<appSize> = ({ state }, appSize) => {
  state.appSize = appSize;
};

export const setCanvasContext: Action = ({ state }) => {
  //state.ctx = state.canvas.getContext("2d") as CanvasRenderingContext2D;
};

/** 

    EXEMPLES

export const setCurrentQuiz: Action<null | Quiz> = (
  { state },
  currentQuiz: null | Quiz
) => {
  state.currentQuiz = currentQuiz;
};

export const setAchievedQuestion: Action<boolean> = (
  { state },
  isAchieved: boolean
) => {
  if (state.currentQuiz) {
  }
};

export const noArgAction: Action = (context, value) => {é
  value // this becomes "void"
}

export const argAction: Action<string> = (context, value) => {
  value // this becomes "string"
}

export const noArgWithReturnTypeAction: Action<void, string> = (context, value) => {
  value // this becomes "void"

  return 'foo'
}

export const argWithReturnTypeAction: Action<string, string> = (context, value) => {
  value // this becomes "string"

  return value + '!!!'
}&
 */
