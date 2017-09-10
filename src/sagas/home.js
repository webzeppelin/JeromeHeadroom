import { call, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import * as Action from "../action";
import AiApi from "../api/ai";
import SpeechApi from "../api/speech";

export const getAiState = (state) => state.ai

export function* sendInput(action) {
    console.log("sendInput saga called: "+action.text);
    let aiState = yield select(getAiState);
    const response = yield call(AiApi.sayToJerome, aiState.sessionId, action.text);
    yield put(Action.receiveResponse(response.result.fulfillment.speech));
}

// export function* requestSpeech(action) {
//     console.log("requestSpeech saga called");
//     // TODO:  wire in the speech-to-text browser feature that Jerome and Rick used
//     yield put(receiveSpeech("This would come from speech-to-text"));
// }
