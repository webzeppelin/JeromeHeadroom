import { takeLatest } from "redux-saga";
import { race, call, put, fork, take } from "redux-saga/effects";
import { SEND_INPUT, REQUEST_SPEECH, SPEAK_RESPONSE, RECEIVE_RESPONSE, NOTIFY_WORD_SPOKEN, SPEAK_RESPONSE_COMPLETE } from "../action"
import { sendInput } from "./home";
import { speakResponse, receiveResponse, requestSpeech } from "./speech";
// root saga generators
export function* sagas() {
  yield [
    fork(takeLatest, SEND_INPUT, sendInput),
    fork(takeLatest, REQUEST_SPEECH, requestSpeech),
    fork(takeLatest, SPEAK_RESPONSE, speakResponse),
    fork(takeLatest, RECEIVE_RESPONSE, receiveResponse),
    // fork(takeLatest, NOTIFY_WORD_SPOKEN, logAction),
    // fork(takeLatest, SPEAK_RESPONSE_COMPLETE, logAction),
  ];
}

export function* logAction(action) {
  console.log("logAction: "+action.type);
}