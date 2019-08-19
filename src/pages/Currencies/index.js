/*global chrome*/
import React from 'react';
import { Table } from '../../components'

const columns = [
  {
    name: "Name",
    text: "Name"
  },
  {
    name: "Buying",
    text: "Buying"
  },
  {
    name: "Selling",
    text: "Selling"
  }
];

class Currencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: []
    }
    this.initializeData();
  }

  initializeData = () => {
    chrome.storage.local.get(['currencies'], (data) => {

      this.setState({ response: data });

    });
    chrome.storage.onChanged.addListener((data) => {

      this.setState({ response: { currencies: data.currencies.newValue } });

    });
  }

  render() {
    return (
      <Table data={this.state.response && this.state.response.currencies} columns={columns} />
    )
  }
}

export default Currencies;