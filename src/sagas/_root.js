import { takeLatest } from "redux-saga";
import { race, call, put, fork, take } from "redux-saga/effects";
import { SEND_INPUT, REQUEST_SPEECH, SPEAK_RESPONSE, RECEIVE_RESPONSE, NOTIFY_WORD_SPOKEN,
  SPEAK_RESPONSE_COMPLETE, START_HEAD_BACKGROUND_ANIMATION, STOP_HEAD_BACKGROUND_ANIMATION, ANIMATE_HEAD_BACKGROUND, CLOSE_MOUTH } from "../action"
import { sendInput } from "./home";
import { speakResponse, receiveResponse, requestSpeech } from "./speech";
import { startHeadBackgroundAnimation, stopHeadBackgroundAnimation, animateHeadBackground, autoCloseMouth } from "./talkingHead";
// root saga generators
export function* sagas() {
  yield [
    fork(takeLatest, SEND_INPUT, sendInput),
    fork(takeLatest, REQUEST_SPEECH, requestSpeech),
    fork(takeLatest, SPEAK_RESPONSE, speakResponse),
    fork(takeLatest, RECEIVE_RESPONSE, receiveResponse),
    fork(takeLatest, START_HEAD_BACKGROUND_ANIMATION, startHeadBackgroundAnimation),
    fork(takeLatest, STOP_HEAD_BACKGROUND_ANIMATION, stopHeadBackgroundAnimation),
    fork(takeLatest, CLOSE_MOUTH, autoCloseMouth),
    animateHeadBackground(),
    // fork(takeLatest, NOTIFY_WORD_SPOKEN, logAction),
    // fork(takeLatest, SPEAK_RESPONSE_COMPLETE, logAction),
  ];
}

export function* logAction(action) {
  console.log("logAction: "+action.type);
}