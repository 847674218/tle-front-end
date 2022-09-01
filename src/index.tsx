// 已整理（新）
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-jss";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n";
import "./index.scss";
import { theme } from "./theme";
import { store } from "./store";
import { Routes } from "./routes";
import { ConnectedNotificatioQueue } from "./components/notification-queue";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <ConnectedNotificatioQueue />
        <Routes />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();