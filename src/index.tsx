import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "overmind-react";
import { createOvermind } from "overmind";
import Pacman from "./components/Pacman";
import { config } from "store";

const overmind = createOvermind(config);

ReactDOM.render(
  <Provider value={overmind}>
    <Pacman />
  </Provider>,
  document.getElementById("canvas")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
