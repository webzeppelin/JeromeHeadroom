import { SET_INPUT, RECEIVE_RESPONSE, RECEIVE_SPEECH, INTERIM_SPEECH_INPUT_RESULT } from "../action";

export const defaultUserInputFormState = {
  inputText: '',
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
    case INTERIM_SPEECH_INPUT_RESULT:
      return {
        ...state,
        inputText: action.text,
      };
    case RECEIVE_SPEECH:
      return {
        ...state,
        inputText: action.text,
      };
    default:
      return state;
  }
}
