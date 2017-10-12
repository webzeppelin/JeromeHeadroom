import { race, call, put, fork, take } from "redux-saga/effects";
import { takeLatest } from "redux-saga";

import * as Action from "../action";

const FRAME_DELAY = 100;
const MOUTH_OPEN_TIME = 250;

export default function* talkingHeadSaga() {
  yield takeLatest(Action.START_HEAD_BACKGROUND_ANIMATION, startHeadBackgroundAnimation);
  yield takeLatest(Action.CLOSE_MOUTH, autoCloseMouth);
  yield fork(animateHeadBackground);
}

export function* startHeadBackgroundAnimation() {
    yield put(Action.animateHeadBackground((new Date).getTime()));
}

// export function* stopHeadBackgroundAnimation() {
//     yield put(Action.stopHeadBackgroundAnimation());
// }

export function* animateHeadBackground() {
  console.log("Debug: animateHeadBackground()");
  while (true) {
    yield take(Action.ANIMATE_HEAD_BACKGROUND);
    yield race([
      fork(nextHeadBackgroundFrame),
      take(Action.STOP_HEAD_BACKGROUND_ANIMATION)
    ]);
  }
}

function* nextHeadBackgroundFrame() {
  yield call(delay, FRAME_DELAY);
  yield put(Action.animateHeadBackground((new Date).getTime()));
}

export function* autoCloseMouth() {
  yield call(delay, MOUTH_OPEN_TIME);
  yield put(Action.closeMouth());
}

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  });
  return promise;
}


