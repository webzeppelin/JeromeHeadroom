import * as Action from "../action";

export const defaults = {
  inputText: '',
}

export function reduceUserInputForm(state = defaults, action) {
  switch (action.type) {
    case Action.SET_INPUT:
      return {
        ...state,
        inputText: action.text,
      };
    case Action.RECEIVE_RESPONSE:
      return {
        ...state,
        inputText: defaults.inputText,
      };
    case Action.INTERIM_SPEECH_INPUT_RESULT:
      return {
        ...state,
        inputText: action.text,
      };
    case Action.RECEIVE_SPEECH:
      return {
        ...state,
        inputText: action.text,
      };
    default:
      return state;
  }
}
