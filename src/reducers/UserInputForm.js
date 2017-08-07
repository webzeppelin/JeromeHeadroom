import { SET_INPUT, SEND_INPUT, RECEIVE_RESPONSE, RECEIVE_SPEECH } from "../action";

export const defaultUserInputFormState = {
  inputText: '',
  waitingForSpeech: false,
  waitingForResponse: false,
}

export function reduceUserInputForm(state = defaultUserInputFormState, action) {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        inputText: action.text,
      };
    case SEND_INPUT:
      return {
        ...state,
        waitingForResponse: true,
      };
    case RECEIVE_RESPONSE:
      return {
        ...state,
        inputText: defaultUserInputFormState.inputText,
        waitingForResponse: false,
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
