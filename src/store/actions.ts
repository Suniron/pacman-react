import { Action } from "overmind";
import Game from "pacman/game/game";

export const setGame: Action<Game> = ({ state }, game: Game) => {
  state.game = game;
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
