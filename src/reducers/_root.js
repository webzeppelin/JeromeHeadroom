import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { reduceUserInputForm } from "./UserInputForm";
import { reduceTest } from "./Test";


// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  // your reducer here
  userInputForm: reduceUserInputForm,
  test: reduceTest,
});


