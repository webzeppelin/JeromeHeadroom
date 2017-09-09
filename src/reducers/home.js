// import Action from "../action";
import { OPEN_TEXT_INPUT, CLOSE_TEXT_INPUT, SEND_INPUT } from "../action";

export const defaults = {
  textInputOpen: false,
}

export function reduceHome(state = defaults, action) {
  switch (action.type) {
    case OPEN_TEXT_INPUT:
      return {
        ...state,
        textInputOpen: true,
      };
    case CLOSE_TEXT_INPUT:
      return {
        ...state,
        textInputOpen: false,
      };
    case SEND_INPUT:
      return {
        ...state,
        textInputOpen: false,
      };
    default:
      return state;
  }
}