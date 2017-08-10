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

  static createTextToSpeechUtterance(text) {
    let utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.pitch = 1;
    utter.rate = 1;
    return utter;
  }
}