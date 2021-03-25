import React from "react";
import ReactDOM from "react-dom";
import App from "./routes";
import { createGlobalStyle } from "styled-components";
import "semantic-ui-css/semantic.min.css";

const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
  body{
    margin: 0;
    padding: 0;
    color: #333;
    font-family: 'Roboto', sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Global />
  </React.StrictMode>,
  document.getElementById("root")
);
