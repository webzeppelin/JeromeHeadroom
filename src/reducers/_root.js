import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
// import { reducer as formReducer } from "redux-form";
import { reduceUserInputForm } from "./userInputForm";
import { reduceRequest } from "./request";
import { reduceResponse } from "./response";
import { reduceTranscript } from "./transcript";
import { reduceTest } from "./test";
import { reduceTalkingHead } from "./talkingHead";
import { reduceSpeechInput } from "./speechInput";
import { reduceAi } from "./ai.js";
import { reduceHome } from "./home.js";

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  // form: formReducer,
  home: reduceHome,
  userInputForm: reduceUserInputForm,
  speechInput: reduceSpeechInput,
  request: reduceRequest,
  response: reduceResponse,
  transcript: reduceTranscript,
  talkingHead: reduceTalkingHead,
  ai: reduceAi,
  test: reduceTest,
});


