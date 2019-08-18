/*global chrome*/
import { api, currencyStatus } from '../src/helper';
import { default as $ } from 'cheerio';

let prevData = {
  currencies: null,
  cryptoCurrencies: null
}

const getCurrencies = async () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(api.url, api.options);
    const data = await response.text();
    const html = $.load(data);
    const table = html('table[id=cr1]').removeAttr('img');
    const parsedData = await convertToJson(table[0]);

    return resolve(parsedData);
  });
}

const getCryptoCurrencies = async () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(api.urlCrypto, api.options);
    const data = await response.text();
    const html = $.load(data);
    const table = html('.allCryptoTlb').removeAttr('img');
    const parsedData = await convertToJsonForCryto(table[0]);
    return resolve(parsedData);
  });
}

const startGettingData = async () => {
  const currencies = await getCurrencies();
  const cryptoCurrencies = await getCryptoCurrencies();

  if (!prevData.currencies && !prevData.cryptoCurrencies) {
    prevData = {
      currencies: currencies,
      cryptoCurrencies: cryptoCurrencies
    }
  }

  const newData = await compareCurrencyData({
    currencies: currencies,
    cryptoCurrencies: cryptoCurrencies
  });

  sendData(newData);

  callEveryGivenSecond(15);

}

function convertToJson(table) {
  return new Promise((resolve, reject) => {
    let _rows = [];
    let headers = $(table).find("th");
    $(table)
      .find("tbody tr")
      .each(function (index) {
        let $cells = $(this).find("td");
        _rows[index] = {};
        $cells.each(function (cellIndex) {
          let key = $(headers[cellIndex]).text();
          let val = $(this).text();
          let date =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          if (key && val) {
            switch (key) {
              case "Ask":
                key = "Selling";
                break;
              case "Bid":
                key = "Buying";
                break;
              case "Pair":
                key = "Name";
                break;
              case "Chg.":
                key = "Change";
                break;
              case "Chg. %":
                key = "ChangePercent";
                break;
              case "Time":
                key = "Date";
                val = date;
                break;
              default:
                break;
            }
            _rows[index][key] = val;
          }
        });
      });
    return resolve(_rows);
  })
}

function convertToJsonForCryto(table) {
  return new Promise((resolve, reject) => {
    let _rows = [];
    let headers = $(table).find("th");
    $(table)
      .find("tbody tr")
      .each(function (index) {
        let $cells = $(this).find("td");
        _rows[index] = {};
        $cells.each(function (cellIndex) {
          let key = $(headers[cellIndex]).text();
          let val = $(this).text();
          let date =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          if (key && val) {
            switch (key) {
              case "Name ":
                key = "Name";
                break;
              case "Symbol ":
                key = key.split(" ");
                break;
              case "Price (USD)":
                key = "Price(USD)";
                break;
              case " Market Cap":
                key = "MarketCap";
                break;
              case "Vol (24H)":
                key = "Vol24";
                break;
              case "Total Vol":
                key = "TotalVol";
                break;
              case "Chg (24H)":
                key = "Chg24";
                break;
              case "Chg (7D)":
                key = "Chg7D";
                break;
              default:
                break;
            }
            _rows[index][key] = val;
          }
        });
      });
    return resolve(_rows);
  })
}

const sendData = (data) => {
  chrome.storage.local.set(data, function () {
    console.log('sent', data);
  });
}

const compareCurrencyData = (newData) => {
  return new Promise((resolve) => {
    let updatedData = {
      currencies: [],
      cryptoCurrencies: []
    };
    prevData.currencies.map((oldVal, i) => {
      const newVal = newData.currencies[i];
      if (newVal.Buying > oldVal.Buying) {
        newVal.status = currencyStatus.INCREASED;
      }
      else if (newVal.Buying === oldVal.Buying) {
        newVal.status = currencyStatus.EQUAL;
      }
      else {
        newVal.status = currencyStatus.DECREASED;
      }
      updatedData.currencies.push(newVal);
    })
    prevData.cryptoCurrencies.map((oldVal, i) => {
      const newVal = newData.cryptoCurrencies[i];
      if (newVal['Price(USD)'] > oldVal['Price(USD)']) {
        newVal.status = currencyStatus.INCREASED;
      }
      else if (newVal['Price(USD)'] === oldVal['Price(USD)']) {
        newVal.status = currencyStatus.EQUAL;
      }
      else {
        newVal.status = currencyStatus.DECREASED;
      }
      updatedData.cryptoCurrencies.push(newVal);

    })
    prevData = newData;
    resolve(updatedData);
  });
}

const callEveryGivenSecond = (second) => {
  setTimeout(() => {
    startGettingData();
  }, second * 1000);
}

startGettingData();