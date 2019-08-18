
/*global chrome*/
import React, { useState, useEffect } from 'react';
import Styles from './Style';
import { Header, Body } from './components';
import { ResetCss } from './helper';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrency: false,
      response: null
    };
    this.initializeData();
  }

  initializeData = () => {
    chrome.storage.local.get(['currencies', 'cryptoCurrencies'], (data) => {
      console.log('intialData', data);
      this.setState({ response: data });
    });
    chrome.storage.onChanged.addListener((data) => {
      console.log('data changed', data);
      this.setState({ response: { currencies: data.currencies.newValue, cryptoCurrencies: data.cryptoCurrencies.newValue } });
    });
  }

  handleMenuChange = (status) => {
    this.setState({ isCurrency: status });
  }

  render() {
    return (
      <div className="App">
        <ResetCss />
        <Styles />
        <Header onChanged={this.handleMenuChange} />
        <Body
          currency={this.state.response && this.state.response.currencies}
          cryptoCurrency={this.state.response && this.state.response.cryptoCurrencies}
          isCurrency={this.state.isCurrency}
        />
      </div>
    )
  }
}

export default App;
