import { call, put, select } from "redux-saga/effects";
import { takeLatest } from "redux-saga";
import { delay } from "redux-saga";
import { handleFailure } from "./common";
import * as Action from "../action";
import AiApi from "../api/ai";
import SpeechApi from "../api/speech";

export default function* homeSaga() {
  yield takeLatest(Action.SEND_INPUT, sendInput);
  yield takeLatest(Action.SEND_INPUT_FAILED, handleFailure);
}

export const getAiState = (state) => state.ai

export function* sendInput(action) {
  console.log("sendInput saga called: " + action.text);
  let aiState = yield select(getAiState);
  try {
    const response = yield call(AiApi.sayToJerome, aiState.sessionId, action.text);
    yield put(Action.receiveResponse(response.result.fulfillment.speech));
  } catch (error) {
    yield put(Action.sendInputFailed("I can't connect to my brain. Where did my brain go!?"))
    console.error(error);
  }
}

// export function* requestSpeech(action) {
//     console.log("requestSpeech saga called");
//     // TODO:  wire in the speech-to-text browser feature that Jerome and Rick used
//     yield put(receiveSpeech("This would come from speech-to-text"));
// }
