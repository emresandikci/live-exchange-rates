import styled, { css } from 'styled-components';
import React from 'react';
import { colors, routes } from '../../helper';
import { CoinDollar } from 'styled-icons/icomoon/';
import { Bitcoin } from 'styled-icons/fa-brands/';
import { Settings, ContactMail } from 'styled-icons/material/'

const Custom = styled.header`
  display:flex;
  flex-direction:column;
  width:100%;
  height:130px;
  margin:0;
  padding:0;
  background:${colors.header.pasive};
  ul{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    height:70px;
    width:100%;
    margin:0;
    padding:0;
    list-style:none;
  }
  ul:first-child{
    height:60px;
    width:100%;
  }
  li{
    align-items: center;
    justify-content: center;
    display: flex;
    width:100%;
    height:100%;
    margin:0;
    padding:0;
    cursor:pointer;
    :hover{
      background-color:${colors.header.active};
      a{
        color:${colors.white.primary};
      }
    }
    ${props => props.isCryptoMenuActive && css`
      background-color:${colors.header.active};
        a{
          color:${colors.white.primary};
        }
    `}
  }
  .menu-active{
    background-color:${colors.header.active};
        a{
          color:${colors.white.primary};
        }
  }
`;

const MenuItem = styled.a`
  display:flex;
  flex-direction:column;
  text-decoration:none;
  color:${colors.text.secondary};
  background-color:transparent;
  font-size:1.2rem;
  cursor:pointer;
  span{
    padding:.2rem;
    font-size:1rem;
    text-align:center;
  }
  svg{
    margin:0 auto;
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: routes.CURRENCY,
    }
  }
  componentDidMount = () => {
    this.props.onChanged(this.state.route);
  }
  handleMenuChange = (status) => {
    this.setState(() => ({ route: status }), () => {
      this.props.onChanged(this.state.route);
    });
  }

  render() {
    return (
      <Custom>
        <ul>
          <li onClick={() => this.handleMenuChange(routes.SETTINGS)} className={this.state.route === routes.SETTINGS && 'menu-active'}>
            <MenuItem>
              <Settings size={28} />
              <span>Settings</span>
            </MenuItem>
          </li>
          <li onClick={() => this.handleMenuChange(routes.CONTACTS)} className={this.state.route === routes.CONTACTS && 'menu-active'}>
            <MenuItem>
              <ContactMail size={28} />
              <span>Contact</span>
            </MenuItem>
          </li>
        </ul>
        <ul>
          <li onClick={() => this.handleMenuChange(routes.CURRENCY)} className={this.state.route === routes.CURRENCY && 'menu-active'}>
            <MenuItem>
              <CoinDollar size={28} />
              <span>Currencies</span>
            </MenuItem>
          </li>
          <li onClick={() => this.handleMenuChange(routes.COIN)} className={this.state.route === routes.COIN && 'menu-active'}>
            <MenuItem>
              <Bitcoin size={28} />
              <span>Coins</span>
            </MenuItem>
          </li>
        </ul>
      </Custom>
    )
  }
}

export default Header;