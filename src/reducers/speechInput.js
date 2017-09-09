import { START_LISTENING, STOP_LISTENING, SPEECH_INPUT_START,
  SPEECH_INPUT_END, INTERIM_SPEECH_INPUT_RESULT,
  FINAL_SPEECH_INPUT_RESULT, RECEIVE_SPEECH } from "../action";

export const defaults = {
  spokenText: '',
  speechRecogRunning: false,
  speechDetected: false,
  speechReceived: false,
}

export function reduceSpeechInput(state = defaults, action) {
  switch (action.type) {
    case START_LISTENING:
      return {
        ...defaults,
        speechRecogRunning: true,
      };
    case STOP_LISTENING:
      return {
        ...state,
        speechRecogRunning: false,
      };
    case SPEECH_INPUT_START:
      return {
        ...state,
        speechDetected: true,
      };
    case SPEECH_INPUT_END:
      return {
        ...state,
        speechDetected: false,
      };
    case INTERIM_SPEECH_INPUT_RESULT:
      return {
        ...state,
        spokenText: action.text,
        speechReceived: false,
      };
    case FINAL_SPEECH_INPUT_RESULT:
      return {
        ...state,
        spokenText: action.text,
        speechReceived: true,
      };
    case RECEIVE_SPEECH:
      return {
        ...state,
        spokenText: defaults.spokenText,
        speechReceived: defaults.speechReceived,
      }
    default:
      return state;
  }
}