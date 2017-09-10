import * as Action from "../action";

export const defaults = {
  entries: [],
}

export function reduceTranscript(state = defaults, action) {
  switch (action.type) {
    case Action.SEND_INPUT:
      return {
        entries: appendToConversation(state.entries, "You", action.text),
      };
    case Action.RECEIVE_RESPONSE:
      return {
        entries: appendToConversation(state.entries, "Jerome", action.text),
      };
    default:
      return state;
  }
}

function appendToConversation(entries, speaker, text) {
    let ret = entries.slice(0);
    ret.push(
        {
            speaker: speaker,
            text: text,
        }
    );
    return ret;
}