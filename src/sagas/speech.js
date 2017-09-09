import { call, put, take, race, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  speakResponse as speakResponseAction, notifyWordSpoken, speakResponseComplete, NOTIFY_WORD_SPOKEN, SPEAK_RESPONSE_COMPLETE,
  speechInputStart, speechInputEnd, interimSpeechInputResult, finalSpeechInputResult, receiveSpeech, START_LISTENING, STOP_LISTENING, FINAL_SPEECH_INPUT_RESULT,
  closeMouth, sendInput, stopListening
} from "../action";
import SpeechApi from "../api/speech";

export function* speakResponse(action) {
  console.log("Debug: speakResponse saga called with: " + action.text);
  const utter = yield call(SpeechApi.textToSpeech, action.text);
  const utterChannel = yield call(createTextToSpeechChannel, utter);

  yield put(closeMouth());
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

export function* speechInput() {
  while (true) {
    yield take(START_LISTENING);
    yield race([
      fork(recognizeSpeech),
      take(STOP_LISTENING)
    ]);
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
        case FINAL_SPEECH_INPUT_RESULT:
          console.log("Speech input received");
          yield put(receiveSpeech(action.text));
          yield put(sendInput(action.text));
          break;
        case STOP_LISTENING:
          breakOut = true;
          break;
      }
      if (breakOut) break;
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
        emit(finalSpeechInputResult(transcriptParts.join(" ")));
      } else {
        emit(interimSpeechInputResult(transcriptParts.join("/")));
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

    const onEnd = (event) => {
      console.log("onend");
      emit(stopListening());
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