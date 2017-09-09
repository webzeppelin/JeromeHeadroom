// import Action from "../action";
import { SEND_INPUT, INTERIM_SPEECH_INPUT_RESULT } from "../action";

export const defaults = {
  requestText: '',
  requestTextFinal: false,
}

export function reduceRequest(state = defaults, action) {
  switch (action.type) {
    case SEND_INPUT:
      return {
        requestText: action.text,
        requestTextFinal: true,
      };
    case INTERIM_SPEECH_INPUT_RESULT:
      return {
        requestText: action.text,
        requestTextFinal: false,
      }
    default:
      return state;
  }
}