import * as Action from "../action";

export const defaults = {
  spokenText: '',
  speechRecogRunning: false,
  speechDetected: false,
  speechReceived: false,
}

export function reduceSpeechInput(state = defaults, action) {
  switch (action.type) {
    case Action.START_LISTENING:
      return {
        ...defaults,
        speechRecogRunning: true,
      };
    case Action.STOP_LISTENING:
      return {
        ...state,
        speechRecogRunning: false,
      };
    case Action.SPEECH_INPUT_START:
      return {
        ...state,
        speechDetected: true,
      };
    case Action.SPEECH_INPUT_END:
      return {
        ...state,
        speechDetected: false,
      };
    case Action.INTERIM_SPEECH_INPUT_RESULT:
      return {
        ...state,
        spokenText: action.text,
        speechReceived: false,
      };
    case Action.FINAL_SPEECH_INPUT_RESULT:
      return {
        ...state,
        spokenText: action.text,
        speechReceived: true,
      };
    case Action.RECEIVE_SPEECH:
      return {
        ...state,
        spokenText: defaults.spokenText,
        speechReceived: defaults.speechReceived,
      }
    default:
      return state;
  }
}