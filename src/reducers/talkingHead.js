import { SPEAK_RESPONSE, NOTIFY_WORD_SPOKEN, SPEAK_RESPONSE_COMPLETE, ANIMATE_HEAD_BACKGROUND } from "../action";

export const defaultTalkingHeadState = {
  speakingText: '',
  currentWordIndex: -1,
  currentCharIndex: -1,
  mouthOpen: false,
  isSpeaking: false,
  timeBase: (new Date).getTime(),
  phi: Math.PI/4,
  theta: Math.PI/4,
  psi: Math.PI/4,
}

const phiPeriod = 180000;
const thetaPeriod = 120000;
const psiPeriod = 60000; 

export function reduceTalkingHead(state = defaultTalkingHeadState, action) {
  switch (action.type) {
    case SPEAK_RESPONSE:
      return {
        ...state,
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
      return {
        ...state,
        speakingText: defaultTalkingHeadState.speakingText,
        currentWordIndex: defaultTalkingHeadState.currentWordIndex,
        mouthOpen: defaultTalkingHeadState.mouthOpen,
        isSpeaking: defaultTalkingHeadState.isSpeaking,
      };
    case ANIMATE_HEAD_BACKGROUND:
      let cubeOrientation = calculateCubeOrientation(state.timeBase, action.time);
      return {
        ...state,
        phi: cubeOrientation[0],
        theta: cubeOrientation[1],
        psi: cubeOrientation[2],
      }
    default:
      return state;
  }
}

function calculateCubeOrientation(timeBase, timeMillis) {
  let duration = timeMillis-timeBase;
  return [
    Math.PI*Math.sin((duration/phiPeriod)*2*Math.PI),
    Math.PI*Math.sin((duration/thetaPeriod)*2*Math.PI),
    Math.PI*Math.sin((duration/psiPeriod)*2*Math.PI)];
}
