import React from "react";
import ReactDOM from "react-dom";
import "./app/styles/global.css";
import "./app/styles/utilities.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
