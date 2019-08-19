/*global chrome*/
import React from 'react';
import { routes } from '../../helper';
import { Currencies, Coins, Settings, Contact } from '../../pages'


class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  onRouteChanged = (route) => {
    switch (route) {
      case routes.CONTACTS:
        return <Contact />;
      case routes.SETTINGS:
        return <Settings />;
      case routes.CURRENCY:
        return <Currencies />;
      case routes.COIN:
        return <Coins />;
      default:
        break;
    }
  }
  render() {
    return (
      <React.Fragment>
        {
          this.onRouteChanged(this.props.route)
        }
      </React.Fragment>
    )
  }
}

export default AppRouter;