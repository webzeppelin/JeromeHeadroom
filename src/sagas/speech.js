import { call, put, take, race, fork, cancelled } from "redux-saga/effects";
import { takeLatest } from "redux-saga";
import { eventChannel } from "redux-saga";
import { handleFailure } from "./common";
import * as Action from "../action";
import SpeechApi from "../api/speech";

export default function* speechSaga() {
  yield takeLatest(Action.SPEAK_RESPONSE, speakResponse);
  yield takeLatest(Action.RECEIVE_RESPONSE, receiveResponse);
  // yield takeLatest(Action.SPEAK_RESPONSE_FAILED, handleFailure);
  yield takeLatest(Action.SPEECH_INPUT_FAILED, handleFailure);
  yield fork(speechInput);
}

export function* speakResponse(action) {
  console.log("Debug: speakResponse saga called with: " + action.text);
  try {
    const utter = yield call(SpeechApi.textToSpeech, action.text);
    const utterChannel = yield call(createTextToSpeechChannel, utter);

    yield put(Action.closeMouth());
    try {
      while (true) {
        const action = yield take(utterChannel);
        yield put(action);
        if (action.type === Action.SPEAK_RESPONSE_COMPLETE) { break; }
      }
    } finally {
      utterChannel.close();
    }
  } catch (error) {
    yield put(Action.speakResponseFailed("I'm trying to talk to you but my mouth isn't working."))
    console.error(error);
  }
}

export function* receiveResponse(action) {
  console.log("Debug: receiveResponse saga called with: " + action.text);
  yield put(Action.speakResponse(action.text));
}

export function* speechInput() {
  try {
    while (true) {
      yield take(Action.START_LISTENING);
      yield race([
        call(recognizeSpeech),
        take(Action.STOP_LISTENING)
      ]);
    }
  } catch (error) {
    yield put(Action.speakInputFailed("I can't make sense of your babble because my ears are not working."))
    console.error(error);
  }
}

function* recognizeSpeech(action) {
  const recog = yield call(SpeechApi.speechToText);
  const recogChannel = yield call(createSpeechToTextChannel, recog);
  recog.start();

  try {
    while (true) {
      const action = yield take(recogChannel);
      yield put(action);
      let breakOut = false;
      switch (action.type) {
        case Action.FINAL_SPEECH_INPUT_RESULT:
          console.log("Speech input received");
          yield put(Action.receiveSpeech(action.text));
          yield put(Action.sendInput(action.text));
          break;
        case Action.STOP_LISTENING:
          breakOut = true;
          break;
      }
      if (breakOut) {
        console.log("Breaking out of speech recog");
        break;
      }
    }
  } finally {
    recogChannel.close();
  }
}

function createTextToSpeechChannel(utter) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const onBoundaryHandler = (event) => {
      if (event.name === "word") {
        emit(Action.notifyWordSpoken(event.charIndex));
      }

    }

    const onEndHandler = (event) => {
      emit(Action.speakResponseComplete());
    }

    // setup the subscription
    utter.onboundary = onBoundaryHandler;
    utter.onend = onEndHandler;

    const unsubscribe = () => {
      // do nothing or the thing below
      // window.speechSynthesis.cancel();
    }

    return unsubscribe
  });
}

function createSpeechToTextChannel(recog) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const onResult = (event) => {
      // console.log(event);

      let finalFound = false;
      let transcriptParts = [];
      for (let i=event.results.length-1; i>-1; i--) {
        
        if (finalFound) break;
        
        let result = event.results[i];
        if (result.isFinal) {
          // we found a final result
          if (transcriptParts.length > 0) {
            // we are into the backlog of the conversation
            break;
          } else {
            // this is the one and only result we are going to take
            finalFound = true;
          }
        }
        transcriptParts.unshift(result[0].transcript);
      }
      if (finalFound) {
        emit(Action.finalSpeechInputResult(transcriptParts.join(" ")));
      } else {
        emit(Action.interimSpeechInputResult(transcriptParts.join("/")));
      }
    }

    const onSpeechStart = (event) => {
      console.log("onspeechstart");
      emit(Action.speechInputStart());
    }

    const onSpeechEnd = (event) => {
      console.log("onspeechend");
      emit(Action.speechInputEnd());
    }

    const onEnd = (event) => {
      console.log("onend");
      emit(Action.stopListening());
    }

    const onStart = (event) => {
      console.log("onstart");
    }

    // setup the subscription
    recog.onresult = onResult;
    recog.onspeechstart = onSpeechStart;
    recog.onspeechend = onSpeechEnd;
    recog.onstart = onStart;
    recog.onend = onEnd;

    const unsubscribe = () => {
      // do nothing or the thing below
      // window.speechSynthesis.cancel();
    }

    return unsubscribe
  });
}