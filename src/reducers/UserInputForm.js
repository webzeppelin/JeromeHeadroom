import { SET_INPUT, RECEIVE_RESPONSE, RECEIVE_SPEECH } from "../action";

export const defaultUserInputFormState = {
  inputText: '',
  waitingForSpeech: false,
}

export function reduceUserInputForm(state = defaultUserInputFormState, action) {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        inputText: action.text,
      };
    case RECEIVE_RESPONSE:
      return {
        ...state,
        inputText: defaultUserInputFormState.inputText,
      };
    case RECEIVE_SPEECH:
      return {
        ...state,
        inputText: action.text,
        waitingForSpeech: false,
      };
    default:
      return state;
  }
}
