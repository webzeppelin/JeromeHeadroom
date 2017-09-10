import * as Action from "../action";

export const defaults = {
  requestText: '',
  requestTextFinal: false,
}

export function reduceRequest(state = defaults, action) {
  switch (action.type) {
    case Action.SEND_INPUT:
      return {
        requestText: action.text,
        requestTextFinal: true,
      };
    case Action.INTERIM_SPEECH_INPUT_RESULT:
      return {
        requestText: action.text,
        requestTextFinal: false,
      }
    default:
      return state;
  }
}