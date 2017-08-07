export const SEND_INPUT = "SEND_INPUT";
export const SET_INPUT = "SET_INPUT";
export const RECEIVE_RESPONSE = "RECEIVE_RESPONSE";
export const REQUEST_SPEECH = "REQUEST_SPEECH";
export const RECEIVE_SPEECH = "RECEIVE_SPEECH";

export function sendInput(input) {
    return {
        type: SEND_INPUT,
        text: input,
    };
}

export function setInput(input) {
    return {
        type: SET_INPUT,
        text: input,
    };
}

export function receiveResponse(response) {
    return {
        type: RECEIVE_RESPONSE,
        text: response,
    };
}

export function requestSpeech() {
    return {
        type: REQUEST_SPEECH,
    }
}

export function receiveSpeech(speech) {
    return {
        type: RECEIVE_SPEECH,
        text: speech,
    };
}