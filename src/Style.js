import styled, { createGlobalStyle } from 'styled-components';
import { colors } from './helper';

const Styles = createGlobalStyle`
  html,body{
    overflow:hidden;
    height:600px;
    width: 450px;
    min-height:600px;
    max-height:450px;
    margin:0;
    padding:0;
  }
  .App {
    text-align: center;
    background-color: ${colors.background.secondary};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 2vmin);
    color: ${colors.white};
  }

  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }
  p{
    color:${colors.text.primary};
  }
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

`;

export default Styles;