import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
  }



  input, button {
    font-family: inherit;
    border: none; 
  }

  input {
    outline: none;
  }  

  button {
    cursor: pointer;
  }

  ul,li {
    list-style: none;
  }
  
  a {
    text-decoration: none;
    color: #000;
  }
`;

export default GlobalStyle;
