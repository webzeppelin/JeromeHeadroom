export const RandomJeromeSayings = [
  "Once I went a whole week without showering just to prove that I could do it.",
  "I came here to fly drones and kick ass and I just crashed my last drone.",
  "Oh, look! Let's go ride jetskis!",
  "It's filled with organic sugar so it's really healthy.",
  "Meat or cheese, or meat and cheese?"
]

export default class SpeechApi {

  static textToSpeech(text) {
    console.log("Debug: textToSpeech in API called")
    return new Promise(resolve => {
      let synth = window.speechSynthesis;
      let utter = SpeechApi.createTextToSpeechUtterance(text);
      synth.speak(utter);
      resolve(utter);
    });
  }

  static speechToText() {
    console.log("Debug: speechToText in API called")
    return new Promise(resolve => {
      let recog = SpeechApi.createSpeechRecognition();
      // recog.onresult = onResult;
      // recog.onspeechstart = onSpeechStart;
      // recog.onspeechend = onSpeechEnd;
      // recog.start();
      resolve(recog);
    });
  }

  static getRandomSaying() {
    let index = Math.floor(Math.random()*RandomJeromeSayings.length);
    return RandomJeromeSayings[index];
  }

  static createTextToSpeechUtterance(text) {
    let utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.pitch = 1;
    utter.rate = 1;
    return utter;
  }

  static createSpeechRecognition() {
    let recog = new webkitSpeechRecognition();
    recog.continuous = true;
    recog.interimResults = true;
    return recog;
  }
}