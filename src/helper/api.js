 export default {
  url: "https://www.investing.com/currencies/streaming-forex-rates-majors",
  urlCrypto: "https://www.investing.com/crypto/currencies",
  proxy: "https://no-cors-es.herokuapp.com/",//"https://cors-anywhere.herokuapp.com/",
  options: {
    mode: "cors",
    method: "get"
  },
  settings: {
    isLoading: true,
    time15: 10000,
    time20: 10000,
    audio: {
      muted: false,
      vol: 1,
      text: "turn off"
    }
  },
};