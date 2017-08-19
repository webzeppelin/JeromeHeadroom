export const SEND_INPUT = "SEND_INPUT";
export const SET_INPUT = "SET_INPUT";
export const RECEIVE_RESPONSE = "RECEIVE_RESPONSE";
export const REQUEST_SPEECH = "REQUEST_SPEECH";
export const RECEIVE_SPEECH = "RECEIVE_SPEECH";
export const SPEAK_RESPONSE = "SPEAK_RESPONSE";
export const NOTIFY_WORD_SPOKEN = "NOTIFY_WORD_SPOKEN";
export const SPEAK_RESPONSE_COMPLETE = "SPEAK_RESPONSE_COMPLETE";
export const SPEECH_INPUT_START = "SPEECH_INPUT_START";
export const SPEECH_INPUT_END = "SPEECH_INPUT_END";
export const FINAL_SPEECH_INPUT_RESULT = "FINAL_SPEECH_INPUT_RESULT";
export const INTERIM_SPEECH_INPUT_RESULT = "INTERIM_SPEECH_INPUT_RESULT";
export const START_HEAD_BACKGROUND_ANIMATION = "START_HEAD_BACKGROUND_ANIMATION";
export const ANIMATE_HEAD_BACKGROUND = "ANIMATE_HEAD_BACKGROUND";
export const STOP_HEAD_BACKGROUND_ANIMATION = "STOP_HEAD_BACKGROUND_ANIMATION";

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

export function speakResponse(response) {
    return {
        type: SPEAK_RESPONSE,
        text: response,
    }
}

export function notifyWordSpoken(charIndex) {
    return {
        type: NOTIFY_WORD_SPOKEN,
        charIndex: charIndex,
    }
}

export function speakResponseComplete() {
    return {
        type: SPEAK_RESPONSE_COMPLETE,
    }
}

export function speechInputStart() {
    return {
        type: SPEECH_INPUT_START,
    }
}

export function speechInputEnd() {
    return {
        type: SPEECH_INPUT_END,
    }
}

export function finalSpeechInputResult(speech) {
    return {
        type: FINAL_SPEECH_INPUT_RESULT,
        text: speech,
    }
}

export function interimSpeechInputResult(speech) {
    return {
        type: INTERIM_SPEECH_INPUT_RESULT,
        text: speech,
    }
}

export function startHeadBackgroundAnimation() {
    return {
        type: START_HEAD_BACKGROUND_ANIMATION,
    }
}

export function animateHeadBackground(timeMillis) {
    return {
        type: ANIMATE_HEAD_BACKGROUND,
        time: timeMillis,
    }
}

export function stopHeadBackgroundAnimation() {
    return {
        type: STOP_HEAD_BACKGROUND_ANIMATION,
    }
}