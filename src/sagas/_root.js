import { takeLatest } from "redux-saga";
import { race, call, put, fork, take } from "redux-saga/effects";
import { SEND_INPUT, REQUEST_SPEECH } from "../action"
import { sendInput, requestSpeech } from "./Home";
// root saga generators
export function* sagas() {
  yield [
    fork(takeLatest, SEND_INPUT, sendInput),
    fork(takeLatest, REQUEST_SPEECH, requestSpeech),
  ];
}
