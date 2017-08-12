import { REQUEST_SPEECH, SPEECH_INPUT_START, SPEECH_INPUT_END, INTERIM_SPEECH_INPUT_RESULT, FINAL_SPEECH_INPUT_RESULT } from "../action";

export const defaultSpeechInputState = {
  spokenText: '',
  finished: false,
  started: false,
  listening: false,
}

export function reduceSpeechInput(state = defaultSpeechInputState, action) {
  switch (action.type) {
    case REQUEST_SPEECH:
      return {
        ...defaultSpeechInputState,
        started: true,
      };
    case SPEECH_INPUT_START:
      return {
        ...state,
        listening: true,
      };
    case SPEECH_INPUT_END:
      return {
        ...state,
        listening: false,
      };
    case INTERIM_SPEECH_INPUT_RESULT:
      return {
        ...state,
        spokenText: action.text,
        finished: false,
      };
    case FINAL_SPEECH_INPUT_RESULT:
      return {
        ...state,
        spokenText: action.text,
        finished: true,
      };
    default:
      return state;
  }
}