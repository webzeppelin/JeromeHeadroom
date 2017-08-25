const AiApiConfig = {
  baseUrl: "https://api.api.ai/v1/query?v=20150910",
  lang: "en",
  timezone: "America/Chicago",
  auth: "Bearer 2fb5229ebb394024ac77fac61c74ec8d"
};

function buildQueryRequestUrl(query, sessionId) {
  //let sessionId = sessionId
  return AiApiConfig.baseUrl +
    "&query=" + encodeURIComponent(query) +
    "&sessionId=" + encodeURIComponent(sessionId) +
    "&lang=" + encodeURIComponent(AiApiConfig.lang) +
    "&timezone=" + encodeURIComponent(AiApiConfig.timezone);
}
// curl 'https://api.api.ai/v1/query?v=20150910&query=Cat%3F&lang=en&sessionId=6eb06de0-b32f-42c9-bec3-c889ccc05869&timezone=America/Chicago' -H 'Authorization:Bearer 2fb5229ebb394024ac77fac61c74ec8d'
export default class AiApi {

  static sayToJerome(sessionId, text) {
    console.log("Debug: sayToJerome in ai API called")
    return new Promise(resolve => {
      fetch(buildQueryRequestUrl(text, sessionId), { method: "get", headers: { "Authorization": AiApiConfig.auth }})
        .then(function (data) {
          resolve(data.json());
        }
        )
    });
  }
}