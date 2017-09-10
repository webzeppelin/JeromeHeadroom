import { takeLatest } from "redux-saga";
import { race, call, put, fork, take } from "redux-saga/effects";
import * as Action from "../action";
import { sendInput } from "./home";
import { speakResponse, receiveResponse, speechInput } from "./speech";
import { startHeadBackgroundAnimation, stopHeadBackgroundAnimation, animateHeadBackground, autoCloseMouth } from "./talkingHead";
// root saga generators
export function* sagas() {
  yield [
    fork(takeLatest, Action.SEND_INPUT, sendInput),
    fork(takeLatest, Action.SPEAK_RESPONSE, speakResponse),
    fork(takeLatest, Action.RECEIVE_RESPONSE, receiveResponse),
    fork(takeLatest, Action.START_HEAD_BACKGROUND_ANIMATION, startHeadBackgroundAnimation),
    fork(takeLatest, Action.STOP_HEAD_BACKGROUND_ANIMATION, stopHeadBackgroundAnimation),
    fork(takeLatest, Action.CLOSE_MOUTH, autoCloseMouth),
    speechInput(),
    animateHeadBackground(),
    // fork(takeLatest, NOTIFY_WORD_SPOKEN, logAction),
    // fork(takeLatest, SPEAK_RESPONSE_COMPLETE, logAction),
  ];
}

export function* logAction(action) {
  console.log("logAction: "+action.type);
}