/*global chrome*/
import React, { useState, useEffect } from 'react';
import Table from '../table';

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
const cryptoColumns = [
  {
    name: "Name",
    text: "Name"
  },
  {
    name: "PriceAsUSD",
    text: "PriceAsUSD"
  }
];

class Body extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    console.log('body-mount', this.props);
  }
  componentDidUpdate = () => {
    console.log('body-updated', this.props);
  }
  render() {
    return (
      <React.Fragment>
        {
          !this.props.isCurrency ?
            <Table data={this.props.cryptoCurrency && this.props.cryptoCurrency} columns={cryptoColumns} />
            :
            <Table data={this.props.currency && this.props.currency} columns={columns} />
        }
      </React.Fragment>
    )
  }
}

export default Body;