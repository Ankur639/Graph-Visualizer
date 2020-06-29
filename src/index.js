import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./Reducers/store";
import ReactDom from "react-dom";
import { connect, Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDom.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
