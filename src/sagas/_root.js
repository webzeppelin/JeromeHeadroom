import { takeLatest } from "redux-saga";
import { race, call, put, fork, take, spawn } from "redux-saga/effects";
import { delay } from 'redux-saga'
import * as Action from "../action";

import homeSaga from "./home";
import speechSaga from "./speech";
import talkingHeadSaga from "./talkingHead";

const makeRestartable = (saga) => {
  return function* () {
    yield spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          console.error("Unexpected root saga termination.", saga);
        } catch (e) {
          console.error("Saga error, the saga will be restarted", e);
        }
        yield delay(3000);
      }
    })
  };
};

const rootSagas = [
  homeSaga,
  speechSaga,
  talkingHeadSaga,
].map(makeRestartable);

export function* sagas() {
  yield rootSagas.map(saga => call(saga));
}

