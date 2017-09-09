import { SEND_INPUT, RECEIVE_RESPONSE } from "../action";

export const defaultResponseState = {
  responseText: 'I am Jerome Headroom. Press the Talk button and start talking to me.',
  waitingForResponse: false,
}

export function reduceResponse(state = defaultResponseState, action) {
  switch (action.type) {
    case SEND_INPUT:
      return {
        ...state,
        waitingForResponse: true,
      };
    case RECEIVE_RESPONSE:
      return {
        responseText: action.text,
        waitingForResponse: false,
      };
    default:
      return state;
  }
}