import { race, call, put, fork, take } from "redux-saga/effects";
import { START_HEAD_BACKGROUND_ANIMATION, STOP_HEAD_BACKGROUND_ANIMATION, ANIMATE_HEAD_BACKGROUND,
    animateHeadBackground as animateHeadBackgroundAction, stopHeadBackgroundAnimation as stopHeadBackgroundAnimationAction } from "../action"

const FRAME_DELAY = 50;

export function* startHeadBackgroundAnimation() {
    yield put(animateHeadBackgroundAction((new Date).getTime()));
}

export function* stopHeadBackgroundAnimation() {
    yield put(stopHeadBackgroundAnimationAction());
}

export function* animateHeadBackground() {
  console.log("Debug: animateHeadBackground()");
  while (true) {
    yield take(ANIMATE_HEAD_BACKGROUND);
    yield race([
      fork(nextHeadBackgroundFrame),
      take(STOP_HEAD_BACKGROUND_ANIMATION)
    ]);
  }
}

function* nextHeadBackgroundFrame() {
  yield call(delay, FRAME_DELAY);
  yield put(animateHeadBackgroundAction((new Date).getTime()));
}

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  });
  return promise;
}


