/*global chrome*/
import React from 'react';
import { Table } from '../../components';

const cryptoColumns = [
  {
    name: "Name",
    text: "Name"
  },
  {
    name: "Price(USD)",
    text: "Price(USD)"
  }
];

class Coins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: []
    }
    this.initializeData();
  }

  initializeData = () => {
    chrome.storage.local.get(['cryptoCurrencies'], (data) => {

      this.setState({ response: data });

    });
    chrome.storage.onChanged.addListener((data) => {

      this.setState({ response: { cryptoCurrencies: data.cryptoCurrencies.newValue } });

    });
  }

  render() {
    return (
      <Table data={this.state.response && this.state.response.cryptoCurrencies} columns={cryptoColumns} />
    )
  }
}

export default Coins;