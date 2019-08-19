/*global chrome*/
import React from 'react';
import Styles from './Style';
import { Header, AppRouter } from './components';
import { ResetCss, routes } from './helper';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: routes.CURRENCY,
      response: null
    };
  }

  handleRouteChange = (status) => {
    this.setState({ route: status });
  }

  render() {
    return (
      <div className="App">
        <ResetCss />
        <Styles />
        <Header onChanged={this.handleRouteChange} />
        <AppRouter route={this.state.route} />
      </div>
    )
  }
}

export default App;
