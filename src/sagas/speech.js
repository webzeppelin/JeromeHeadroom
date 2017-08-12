import { call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  speakResponse as speakResponseAction, notifyWordSpoken, speakResponseComplete, NOTIFY_WORD_SPOKEN, SPEAK_RESPONSE_COMPLETE,
  speechInputStart, speechInputEnd, interimSpeechInputResult, finalSpeechInputResult, receiveSpeech, FINAL_SPEECH_INPUT_RESULT
} from "../action";
import SpeechApi from "../api/speech";

export function* speakResponse(action) {
  console.log("Debug: speakResponse saga called with: " + action.text);
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
  console.log("Debug: receiveResponse saga called with: " + action.text);
  yield put(speakResponseAction(action.text));
}

export function* requestSpeech(action) {
  console.log("Debug: requestSpeech saga called");
  const recog = yield call(SpeechApi.speechToText);
  const recogChannel = yield call(createSpeechToTextChannel, recog);
  recog.start();

  let finalTranscript = "";
  try {
    while (true) {
      const action = yield take(recogChannel);
      yield put(action);
      if (action.type === FINAL_SPEECH_INPUT_RESULT) {
        finalTranscript = action.text;
        break;
      }
    }
  } finally {
    recogChannel.close();
  }

  yield put(receiveSpeech(finalTranscript));
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

function createSpeechToTextChannel(recog) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const onResult = (event) => {
      // console.log("onresult");

      let isFinal = event.results.length > 0;
      let transcriptParts = [];
      for (let i=0; i<event.results.length; i++) {
        let result = event.results[i];
        transcriptParts.push(result[0].transcript);
        if (!result.isFinal) {
          isFinal = false;
        }
      }
      let text = transcriptParts.join("/");
      if (isFinal) {
        emit(finalSpeechInputResult(text));
      } else {
        emit(interimSpeechInputResult(text));
      }
    }

    const onSpeechStart = (event) => {
      console.log("onspeechstart");
      emit(speechInputStart());
    }

    const onSpeechEnd = (event) => {
      console.log("onspeechend");
      emit(speechInputEnd());
    }

    // setup the subscription
    recog.onresult = onResult;
    recog.onspeechstart = onSpeechStart;
    recog.onspeechend = onSpeechEnd;

    const unsubscribe = () => {
      // do nothing or the thing below
      // window.speechSynthesis.cancel();
    }

    return unsubscribe
  });
}