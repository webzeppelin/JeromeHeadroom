import { call, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { receiveResponse, receiveSpeech } from "../action";

export function* sendInput(action) {
    console.log("sendInput saga called: "+action.text);
    // TODO:  call the API.AI agent to get a response
    yield delay(1000);
    yield put(receiveResponse(action.text));
}

// export function* requestSpeech(action) {
//     console.log("requestSpeech saga called");
//     // TODO:  wire in the speech-to-text browser feature that Jerome and Rick used
//     yield put(receiveSpeech("This would come from speech-to-text"));
// }
