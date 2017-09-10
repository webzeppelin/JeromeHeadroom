import * as Action from "../action";

export const defaults = {
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

export function reduceTalkingHead(state = defaults, action) {
  switch (action.type) {
    case Action.SPEAK_RESPONSE:
      return {
        ...state,
        speakingText: action.text,
        currentWordIndex: -1,
        mouthOpen: true,
        isSpeaking: true,
      };
    case Action.NOTIFY_WORD_SPOKEN:
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
        currentCharIndex: action.charIndex,
        mouthOpen: true,
      };
    case Action.SPEAK_RESPONSE_COMPLETE:
      return {
        ...state,
        speakingText: defaults.speakingText,
        currentWordIndex: defaults.currentWordIndex,
        mouthOpen: defaults.mouthOpen,
        isSpeaking: defaults.isSpeaking,
      };
    case Action.ANIMATE_HEAD_BACKGROUND:
      let cubeOrientation = calculateCubeOrientation(state.timeBase, action.time);
      return {
        ...state,
        phi: cubeOrientation[0],
        theta: cubeOrientation[1],
        psi: cubeOrientation[2],
      }
    case Action.CLOSE_MOUTH:
      return {
        ...state,
        mouthOpen: false,
      };
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
