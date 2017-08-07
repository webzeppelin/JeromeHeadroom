import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
// import { reducer as formReducer } from "redux-form";
import { reduceUserInputForm } from "./userInputForm";
import { reduceResponse } from "./response";
import { reduceTranscript } from "./transcript"
import { reduceTest } from "./test";


// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  // form: formReducer,
  userInputForm: reduceUserInputForm,
  response: reduceResponse,
  transcript: reduceTranscript,
  test: reduceTest,
});


