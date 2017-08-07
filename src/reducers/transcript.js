import { SEND_INPUT, RECEIVE_RESPONSE } from "../action";

export const defaultTranscriptState = {
  entries: [],
}

export function reduceTranscript(state = defaultTranscriptState, action) {
  switch (action.type) {
    case SEND_INPUT:
      return {
        entries: appendToConversation(state.entries, "User", action.text),
      };
    case RECEIVE_RESPONSE:
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