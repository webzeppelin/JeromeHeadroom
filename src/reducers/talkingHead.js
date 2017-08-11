import { SPEAK_RESPONSE, NOTIFY_WORD_SPOKEN, SPEAK_RESPONSE_COMPLETE } from "../action";

export const defaultTalkingHeadState = {
  speakingText: '',
  currentWordIndex: -1,
  currentCharIndex: -1,
  mouthOpen: false,
  isSpeaking: false,
}

export function reduceTalkingHead(state = defaultTalkingHeadState, action) {
  switch (action.type) {
    case SPEAK_RESPONSE:
      return {
        speakingText: action.text,
        currentWordIndex: -1,
        mouthOpen: true,
        isSpeaking: true,
      };
    case NOTIFY_WORD_SPOKEN:
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
        currentCharIndex: action.charIndex,
      };
    case SPEAK_RESPONSE_COMPLETE:
      return defaultTalkingHeadState;
    default:
      return state;
  }
}
