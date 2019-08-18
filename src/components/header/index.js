import styled, { css } from 'styled-components';
import React from 'react';

import { colors } from '../../helper';

const Custom = styled.header`
  width:100%;
  height:61px;
  margin:0;
  padding:0;
  background:${colors.header.pasive};
  ul{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    height:100%;
    width:100%;
    margin:0;
    padding:0;
    list-style:none;
  }
  ul{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    height:100%;
    width:100%;
    margin:0;
    padding:0;
    list-style:none;
  
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
  text-decoration:none;
  color:${colors.text.secondary};
  background-color:transparent;
  font-size:1.3rem;
  cursor:pointer;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrency: true,
    }
  }
  componentDidMount = () => {
    this.props.onChanged(this.state.isCurrency);
  }
  handleMenuChange = (status) => {
    this.setState(state => ({ isCurrency: status }), () => {
      this.props.onChanged(this.state.isCurrency);
    });
  }
  render() {
    return (
      <Custom>
        <ul>
          <li onClick={() => this.handleMenuChange(true)} className={this.state.isCurrency && 'menu-active'}>
            <MenuItem>Currencies</MenuItem>
          </li>
          <li onClick={() => this.handleMenuChange(false)} className={!this.state.isCurrency && 'menu-active'}>
            <MenuItem>Crypto Currencies</MenuItem>
          </li>
        </ul>
      </Custom>
    )
  }
}

export default Header;