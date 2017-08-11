import { call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { speakResponse as speakResponseAction, notifyWordSpoken, speakResponseComplete, NOTIFY_WORD_SPOKEN, SPEAK_RESPONSE_COMPLETE } from "../action";
import SpeechApi from "../api/speech";

export function* speakResponse(action) {
  console.log("Debug: speakResponse saga called with: "+action.text);
  const utter = yield call(SpeechApi.textToSpeech, action.text);
  const utterChannel = yield call(createTextToSpeechChannel, utter);

  try {
    while (true) {
      const action = yield take(utterChannel);
      yield put(action);
      if (action.type === SPEAK_RESPONSE_COMPLETE) { break; }
    }
  } finally {
    utterChannel.close();
  }
}

export function* receiveResponse(action) {
  console.log("Debug: receiveResponse saga called with: "+action.text);
  yield put(speakResponseAction(action.text));
}

function createTextToSpeechChannel(utter) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const onBoundaryHandler = (event) => {
      if (event.name === "word") {
        emit(notifyWordSpoken(event.charIndex));
      }
      
    }

    const onEndHandler = (event) => {
      emit(speakResponseComplete());
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