import * as Action from "../action";

export function* logAction(action) {
  console.log("logAction: "+action.type);
}

export function* handleFailure(action) {
  yield put(Action.speakResponse(action.error));
  yield put(Action.receiveErrorResponse(action.error));
}