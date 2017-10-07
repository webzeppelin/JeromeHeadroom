import * as Action from "../action";

export const defaults = {
  responseText: 'I am Jerome Headroom. Press the Talk button and start talking to me.',
  isError: false,
  waitingForResponse: false,
}

export function reduceResponse(state = defaults, action) {
  switch (action.type) {
    case Action.SEND_INPUT:
      return {
        ...state,
        waitingForResponse: true,
      };
    case Action.RECEIVE_RESPONSE:
      return {
        responseText: action.text,
        isError: false,
        waitingForResponse: false,
      };
    case Action.RECEIVE_ERROR_RESPONSE:
      return {
        responseText: action.text,
        isError: true,
        waitingForResponse: false,
      };
    default:
      return state;
  }
}