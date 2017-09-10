import * as Action from "../action";

export const defaults = {
  textInputOpen: false,
}

export function reduceHome(state = defaults, action) {
  switch (action.type) {
    case Action.OPEN_TEXT_INPUT:
      return {
        ...state,
        textInputOpen: true,
      };
    case Action.CLOSE_TEXT_INPUT:
      return {
        ...state,
        textInputOpen: false,
      };
    case Action.SEND_INPUT:
      return {
        ...state,
        textInputOpen: false,
      };
    default:
      return state;
  }
}